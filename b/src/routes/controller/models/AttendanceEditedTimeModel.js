import mongoose from "mongoose";

const collectionName = "AttendanceEditedTime";

const { Schema } = mongoose;
const schema = new Schema({
  No: { type: String, unique: true },
  DevNo: { type: String },
  UserId: { type: String },
  Name: { type: String },
  Mode: { type: String },
  DateTime: { type: String },
});

const AttendanceEditedTime = mongoose.model(collectionName, schema);

export default AttendanceEditedTime;
