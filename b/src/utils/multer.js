import multer from "multer";
import path from "path";
import dayjs from "dayjs";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

export function imageLocation(location = "") {
  return "../n/uploads/" + location;
}

export function imageName(imgName = "") {
  return dayjs(Date.now()).format("YYYY-MM-DD-hh-mm-ssa-SSS") + imgName;
}

export const upload = (imgLocation, imgName) => {
  return multer({
    limits: 50000,
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, imageLocation(imgLocation));
      },
      filename: function (req, file, cb) {
        cb(null, imageName(imgName) + path.extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      const isValid = !!MIME_TYPE_MAP[file.mimetype];
      let error = isValid ? null : new Error("Invalid mime type!");
      cb(error, isValid);
    },
  });
};
