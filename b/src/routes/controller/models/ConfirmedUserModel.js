import mongoose from "mongoose";

import { UserModel } from "./schemaModel/schemaModel.js";

const collectionName = "ConfirmedUser";

const { Schema } = mongoose;
const userSchema = new Schema({
  ...UserModel(),
  attendanceId: {
    type: String,
  },
});

const ConfirmedUserModel = mongoose.model(collectionName, userSchema);

export default ConfirmedUserModel;
