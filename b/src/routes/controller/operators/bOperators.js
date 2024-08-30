import bcrypt from "bcryptjs";

import {
  deleteImage,
  passwordEncrypt,
  prevImgAndDelImg,
  url,
} from "../../../utils/bHelpers.js";

function bErrorHandler(req, res, error, mess, rule) {
  console.log(error, `${error.message} fx=${mess}, rule=${rule}`);
  setTimeout(() => {
    deleteImage(req.file?.path, mess, rule);
  }, 1000);
  return res.status(500).send(`${error.message} fx=${mess}, rule=${rule}`);
}

function bDataNotFound(res, mess, rule) {
  return res
    .status(404)
    .send(`${mess} data not found, fx=${mess}, rule=${rule}`);
}

function bDataIsFound(data, res, mess, rule) {
  return res.status(200).send({ data, "fx=": mess, "rule=": rule });
}

function duplicatedEmail(req, res, mess, rule, email) {
  setTimeout(() => {
    deleteImage(req.file?.path, mess, rule);
  }, 1000);
  return res
    .status(409)
    .send(`Email already exists "${email}", fx=: ${mess}, rule=: ${rule}`);
}

///////////////////////////////

export async function getter(req, res, rule, model, mess) {
  try {
    const { id } = req.params;

    if (rule === "simple/findAll") {
      const data = await model.find();
      if (!data || data.length === 0) return bDataNotFound(res, mess, rule);
      return bDataIsFound(data, res, mess, rule);
    }

    if (rule === "simple/findOne") {
      const data = await model.findById(id);
      if (!data) return bDataNotFound(res, mess, rule);
      return bDataIsFound(data, res, mess, rule);
    }
  } catch (error) {
    return bErrorHandler(req, res, error, mess, rule);
  }
}

export async function poster(req, res, rule, model, mess) {
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
          req.file?.filename && url("registryUserImages/") + req.file.filename,
      });
      return bDataIsFound(data, res, mess, rule);
    }
  } catch (error) {
    return bErrorHandler(req, res, error, mess, rule);
  }
}

export async function patcher(req, res, rule, model, mess) {
  try {
    const { id } = req.params;

    if (rule === "simple") {
      const data = await model.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!data) return bDataNotFound(res, mess, rule);
      return bDataIsFound(data, res, mess, rule);
    }

    if (rule === "bPatchRegistryUser") {
      const { password } = req.body;

      //encrypt password
      const encryptedPassword = await passwordEncrypt(password);
      //encrypt password

      //userPrevImg
      const { nonExistingUser, nonExistingUserMess, deletedImg } =
        await prevImgAndDelImg(req, model, id, mess, rule);
      if (nonExistingUser) {
        return res.status(406).send(`${nonExistingUserMess}, ${deletedImg}`);
      }
      //userPrevImg

      const data = await model.findByIdAndUpdate(
        id,
        {
          ...req.body,
          password: encryptedPassword,
          repeatPassword: encryptedPassword,
          image:
            req.file?.filename &&
            url("registryUserImages/") + req.file.filename,
        },
        { new: true }
      );

      return bDataIsFound(data, res, mess, rule);
    }
  } catch (error) {
    return bErrorHandler(req, res, error, mess, rule);
  }
}

export async function deleter(req, res, rule, model, mess) {
  try {
    const { id } = req.params;

    if (rule === "bDeleteRegistryUser") {
      //userPrevImg
      const { nonExistingUser, nonExistingUserMess, deletedImg } =
        await prevImgAndDelImg(req, model, id, mess, rule);
      if (nonExistingUser) {
        return res.status(406).send(`${nonExistingUserMess}, ${deletedImg}`);
      }
      //userPrevImg

      const data = await model.findByIdAndDelete(id);
      if (!data) return bDataNotFound(res, mess, rule);
      return bDataIsFound(data, res, mess, rule);
    }
  } catch (error) {
    return bErrorHandler(req, res, error, mess, rule);
  }
}
