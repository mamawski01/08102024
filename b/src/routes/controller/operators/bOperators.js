import {
  deleteImage,
  duplicateEmailAndDelImage,
  passwordEncrypt,
  prevImgAndDelImg,
  url,
} from "../../../utils/bHelpers.js";

export async function getter(req, res, rule, model, mess) {
  try {
    const { id } = req.params;

    if (rule === "simple/findAll") {
      const data = await model.find();
      if (!data || data.length === 0)
        return res
          .status(404)
          .send(`${mess} data not found, fx=${mess}, rule=${rule}`);
      return res.status(200).send({ data, "fx=": mess, "rule=": rule });
    }

    if (rule === "simple/findOne") {
      const data = await model.findById(id);
      if (!data)
        return res
          .status(404)
          .send(`${mess} data not found, fx=${mess}, rule=${rule}`);
      return res.status(200).send({ data, "fx=": mess, "rule=": rule });
    }
  } catch (error) {
    console.log(error, `${error.message} fx=${mess}, rule=${rule}`);
    return res.status(500).send(`${error.message} fx=${mess}, rule=${rule}`);
  }
}

export async function poster(req, res, rule, model, mess) {
  try {
    if (rule === "simple") {
      const data = await model.create(req.body);
      return res.status(200).send({ data, "fx=": mess, "rule=": rule });
    }

    if (rule === "bPostRegistryUser") {
      const { email, password } = req.body;
      //check if email exist and delete image
      const { conflict, confMess, deletedImg } =
        await duplicateEmailAndDelImage(req, email, model, mess, rule);
      if (conflict) return res.status(409).send(`${confMess}, ${deletedImg}`);
      //check if email exist and delete image

      //encrypt password
      const encryptedPassword = await passwordEncrypt(password);
      //encrypt password

      const data = await model.create({
        ...req.body,
        password: encryptedPassword,
        repeatPassword: encryptedPassword,
        image:
          req.file?.filename && url("registryUserImages/") + req.file.filename,
      });
      return res.status(200).send({ data, "fx=": mess, "rule=": rule });
    }
  } catch (error) {
    console.log(error, `${error.message} fx=${mess}, rule=${rule}`);
    return res.status(500).send(`${error.message} fx=${mess}, rule=${rule}`);
  }
}

export async function patcher(req, res, rule, model, mess) {
  try {
    const { id } = req.params;

    if (rule === "simple") {
      const data = await model.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!data)
        return res
          .status(404)
          .send(`${mess} data not found, fx=${mess}, rule=${rule}`);
      return res.status(200).send({ data, "fx=": mess, "rule=": rule });
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

      return res.status(200).send({ data, "fx=": mess, "rule=": rule });
    }
  } catch (error) {
    setTimeout(() => {
      deleteImage(req.file?.path, mess, rule);
    }, 1000);
    console.log(error, `${error.message} fx=${mess}, rule=${rule}`);
    return res.status(500).send(`${error.message} fx=${mess}, rule=${rule}`);
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
      if (!data)
        return res
          .status(404)
          .send(`${mess} data not found, fx=${mess}, rule=${rule}`);
      return res.status(200).send({ data, "fx=": mess, "rule=": rule });
    }
  } catch (error) {
    console.log(error, `${error.message} fx=${mess}, rule=${rule}`);
    return res.status(500).send(`${error.message} fx=${mess}, rule=${rule}`);
  }
}
