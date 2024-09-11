import mongoose from "mongoose";

const collectionName = "AttendanceUserModel";

const { Schema } = mongoose;
const attendanceSchema = new Schema({
  No: { type: String, unique: true },
  DevNo: { type: String },
  UserId: { type: String },
  Name: { type: String },
  Mode: { type: String },
  DateTime: { type: String },
});

const AttendanceUserModel = mongoose.model(collectionName, attendanceSchema);

export default AttendanceUserModel;
