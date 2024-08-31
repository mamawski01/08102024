import { promises } from "fs";

import { imageLocation } from "./multer.js";

export async function deleteImage(path, mess, rule) {
  console.log(path, " deleteImage");
  if (!path || path === undefined) {
    console.log(`path in deleteImage fx is ${path}, fx=${mess}, rule=${rule}`);
    return `path in deleteImage fx is ${path}, fx=${mess}, rule=${rule}`;
  }
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await promises.unlink(path);
    console.log(`File deleted successfully. fx=${mess}, rule=${rule}`);
    return `File deleted successfully. fx=${mess}, rule=${rule}`;
  } catch (error) {
    console.log(error);
    return `${error}, fx=${mess}, rule=${rule}`;
  }
}

export function url(location = "") {
  return "http://localhost:8000/uploads/" + location;
}
