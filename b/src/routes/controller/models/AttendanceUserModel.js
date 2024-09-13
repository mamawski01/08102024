import mongoose from "mongoose";

const collectionName = "AttendanceUser";

const { Schema } = mongoose;
const schema = new Schema({
  No: { type: String, unique: true },
  DevNo: { type: String },
  UserId: { type: String },
  Name: { type: String },
  Mode: { type: String },
  DateTime: { type: String },
});

const AttendanceUserModel = mongoose.model(collectionName, schema);

export default AttendanceUserModel;
