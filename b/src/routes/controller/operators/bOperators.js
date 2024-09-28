import bcrypt from "bcryptjs";

import { deleteImage, url } from "../../../utils/bHelpers.js";
import { imageLocation } from "../../../utils/multer.js";

function bErrorHandler(req, res, error, mess, rule) {
  console.log(error, `${error.message} fx=${mess}, rule=${rule}`);
  deleteImage(req.file?.path, mess, rule);
  return res.status(500).send(`${error.message} fx=${mess}, rule=${rule}`);
}

function bDataNotFound(req, res, mess, rule) {
  deleteImage(req.file?.path, mess, rule);
  return res
    .status(404)
    .send(`${mess} data not found, fx=${mess}, rule=${rule}`);
}

function bDataIsFound(data, res, mess, rule) {
  return res.status(200).send({ data, "fx=": mess, "rule=": rule });
}

function conflict409(res, duplicate, mess, rule) {
  return res
    .status(409)
    .send(`Duplicate Item exist: "${duplicate}", fx=: ${mess}, rule=: ${rule}`);
}

function duplicatedEmail(req, res, mess, rule, duplicate) {
  deleteImage(req.file?.path, mess, rule);
  return conflict409(res, duplicate, mess, rule);
}

function delPrevImg(location, user, mess, rule) {
  const imageUrl = user.image.substring(user.image.lastIndexOf("/") + 1);
  deleteImage(imageLocation(location) + "/" + imageUrl, mess, rule);
}

///////////////////////////////

export async function getter(req, res, rule, model, mess) {
  try {
    const { id } = req.params;

    if (rule === "simple/findAll") {
      const data = await model.find();
      return bDataIsFound(data, res, mess, rule);
    }

    if (rule === "simple/findOne") {
      const data = await model.findById(id);
      return bDataIsFound(data, res, mess, rule);
    }

    if (rule === "findArray") {
      const data = await model.find({ UserId: { $in: id } });
      return bDataIsFound(data, res, mess, rule);
    }
  } catch (error) {
    return bErrorHandler(req, res, error, mess, rule);
  }
}

export async function poster(
  req,
  res,
  rule,
  model,
  mess,
  folderLocation,
  RegistryUserModel,
  ConfirmedUserModel
) {
  try {
    if (rule === "simple") {
      const data = await model.create(req.body);
      return bDataIsFound(data, res, mess, rule);
    }

    if (rule === "bPostRegistryUser") {
      const { email, password } = req.body;
      //check if email exist and delete image
      const userEmailExist = await model.exists({ email });
      if (userEmailExist) return duplicatedEmail(req, res, mess, rule, email);
      //check if email exist and delete image

      //encrypt password
      const encryptedPassword = await bcrypt.hash(password, 10);
      //encrypt password

      const data = await model.create({
        ...req.body,
        password: encryptedPassword,
        repeatPassword: encryptedPassword,
        image:
          req.file?.filename && url(`${folderLocation}/`) + req.file.filename,
      });
      return bDataIsFound(data, res, mess, rule);
    }

    if (rule === "bPostConfirmedUser") {
      const { id } = req.params;
      const registryModel = await RegistryUserModel.findById(id);
      if (!registryModel) {
        return bDataNotFound(req, res, mess, rule);
      } else {
        const registryModelLean = registryModel.toObject();

        //check if email exist and delete image
        const userEmailExist = await model.exists({
          email: registryModelLean.email,
        });
        if (userEmailExist)
          return duplicatedEmail(req, res, mess, rule, registryModelLean.email);
        //check if email exist and delete image

        const data = await model.create(registryModelLean);
        await RegistryUserModel.findByIdAndDelete(id);
        return bDataIsFound(data, res, mess, rule);
      }
    }

    if (rule === "bPostAttendanceUser") {
      const uniqueNo = new Set(req.body.map((item) => item.No));
      const existingNo = await model.find({
        No: { $in: Array.from(uniqueNo) },
      });

      if (existingNo.length > 0) {
        const existingNoArray = existingNo.map((item) => item.No);
        const uniqueNoArray = Array.from(uniqueNo);
        const uniqueNonExistingNo = uniqueNoArray.filter(
          (no) => !existingNoArray.includes(no)
        );
        if (uniqueNonExistingNo.length > 0) {
          const filteredBody = req.body.filter((item) =>
            uniqueNonExistingNo.includes(item.No)
          );
          const data = await model.insertMany(filteredBody);
          return bDataIsFound(data, res, mess, rule);
        } else {
          const duplication = "All (No) data already exists";
          return conflict409(res, duplication, mess, rule);
        }
      } else {
        const data = await model.insertMany(req.body);
        return bDataIsFound(data, res, mess, rule);
      }
    }
    if (rule === "bPostAttendanceUserFinalSchedule") {
      const prevData = await model.find();

      const filteredDataOfNewAndPrev = req.body.filter(
        (newItem) =>
          !prevData.some((prevItem) => prevItem.date === newItem.date)
      );
      const filteredData = filteredDataOfNewAndPrev.reduce((acc, current) => {
        if (!acc.find((item) => item.date === current.date)) {
          acc.push(current);
        }
        return acc;
      }, []);
      const data = await model.insertMany(filteredData);
      return bDataIsFound(data, res, mess, rule);
    }

    if (rule === "bPostAttendanceUserDefSchedule") {
      const { confirmedUserId } = req.params;
      const confirmedUser = await ConfirmedUserModel.findById(confirmedUserId);
      if (!confirmedUser) {
        return bDataNotFound(req, res, mess, rule);
      } else {
        const data = await model.create({
          firstName: confirmedUser.firstName,
          middleName: confirmedUser.middleName,
          lastName: confirmedUser.lastName,
          attendanceId: confirmedUser.attendanceId,
        });
        return bDataIsFound(data, res, mess, rule);
      }
    }
  } catch (error) {
    return bErrorHandler(req, res, error, mess, rule);
  }
}

export async function patcher(req, res, rule, model, mess, folderLocation) {
  try {
    const { id } = req.params;
    if (rule === "simple") {
      const data = await model.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!data) return bDataNotFound(req, res, mess, rule);
      return bDataIsFound(data, res, mess, rule);
    }

    if (rule === "bPatchRegistryUser" || rule === "bPatchConfirmedUser") {
      const { password } = req.body;

      //encrypt password
      const encryptedPassword = await bcrypt.hash(password, 10);
      //encrypt password

      //userPrevImg with req.file?.filename
      const user = await model.findById(id);
      if (!user) return bDataNotFound(req, res, mess, rule);
      req.file?.filename && delPrevImg(folderLocation, user, mess, rule);
      //userPrevImg with req.file?.filename

      const data = await model.findByIdAndUpdate(
        id,
        {
          ...req.body,
          password: encryptedPassword,
          repeatPassword: encryptedPassword,
          image: req.file?.filename
            ? url(`${folderLocation}/`) + req.file.filename
            : user.image,
        },
        { new: true }
      );
      return bDataIsFound(data, res, mess, rule);
    }
  } catch (error) {
    return bErrorHandler(req, res, error, mess, rule);
  }
}

export async function deleter(req, res, rule, model, mess, folderLocation) {
  try {
    const { id } = req.params;

    if (rule === "bDeleteRegistryUser" || rule === "bDeleteConfirmedUser") {
      //userPrevImg
      const user = await model.findById(id);
      if (!user) return bDataNotFound(req, res, mess, rule);
      delPrevImg(folderLocation, user, mess, rule);
      //userPrevImg

      const data = await model.findByIdAndDelete(id);
      return bDataIsFound(data, res, mess, rule);
    }
    if (rule === "simple/deleteMany") {
      const data = await model.deleteMany({});
      return bDataIsFound(data, res, mess, rule);
    }
  } catch (error) {
    return bErrorHandler(req, res, error, mess, rule);
  }
}
