import { promises } from "fs";
import bcrypt from "bcryptjs";

import { imageLocation } from "./multer.js";

export async function deleteImage(path, mess, rule) {
  if (!path) return null;
  try {
    await promises.unlink(path);
    console.log("File deleted successfully.");
    return `File deleted successfully. fx=${mess}, rule=${rule}`;
  } catch (error) {
    console.log(error);
    return `${error}, fx=${mess}, rule=${rule}`;
  }
}

export function url(location = "registryUserImages") {
  return "http://localhost:8000/uploads/" + location;
}

export async function duplicateEmailAndDelImage(req, email, model, mess, rule) {
  if (!email) return { conflict: false };
  const userEmailExist = await model.exists({ email });
  if (userEmailExist) {
    return {
      conflict: true,
      confMess: "Email already exists",
      deletedImg: await deleteImage(req.file.path, mess, rule), // to delete the image if there is a problem
    };
  }
  return { conflict: false };
}

export async function passwordEncrypt(password) {
  return await bcrypt.hash(password, 10);
}

export async function prevImgAndDelImg(req, model, id, mess, rule) {
  const user = await model.findById(id);
  if (!user) {
    return {
      nonExistingUser: true,
      nonExistingUserMess: "User not found",
      deletedImg: await deleteImage(req.file.path, mess, rule), // to delete the image if there is a problem
    };
  }
  const imageUrl = user.image.substring(user.image.lastIndexOf("/") + 1);
  return {
    nonExistingUser: false,
    deletedImg: await deleteImage(imageLocation() + "/" + imageUrl, mess, rule),
  };
  // setTimeout(() => {
  //   deleteImage(imageLocation() + "/" + imageUrl, mess, rule);
  // }, 1000);
}
