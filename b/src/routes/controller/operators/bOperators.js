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

function duplicatedEmail(req, res, mess, rule, email) {
  deleteImage(req.file?.path, mess, rule);
  return res
    .status(409)
    .send(`Email already exists "${email}", fx=: ${mess}, rule=: ${rule}`);
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
  registryModelDelete
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
      const registryModel = await registryModelDelete.findById(id);
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
        await registryModelDelete.findByIdAndDelete(id);
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
  } catch (error) {
    return bErrorHandler(req, res, error, mess, rule);
  }
}
