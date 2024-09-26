import mongoose from "mongoose";

const collectionName = "AttendanceSetting";

const { Schema } = mongoose;
const schema = new Schema({
  brkTime: { type: String },
  regularRate: { type: String },
  regularHolidayRate: { type: String },
  specialHolidayRate: { type: String },
  overtimeStarts: { type: String },
});

const AttendanceSetting = mongoose.model(collectionName, schema);

export default AttendanceSetting;
