import mongoose from "mongoose";

const collectionName = "AttendanceUserFinalSchedule";

const { Schema } = mongoose;
const schema = new Schema({
  date: { type: String, unique: true },
  attendanceId: { type: String },
  UserId: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  timeIn: { type: String },
  timeOut: { type: String },
  notes: { type: String },
  day: { type: String },
  defaultDuty: { type: String },
});

const AttendanceUserFinalSchedule = mongoose.model(collectionName, schema);

export default AttendanceUserFinalSchedule;
