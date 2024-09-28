import mongoose from "mongoose";

const collectionName = "AttendanceSetting";

const { Schema } = mongoose;
const schema = new Schema({
  brkDuration: { type: String, default: "60 mins" },
  overtimeStarts: { type: String, default: "30 mins" },
  regularRate: { type: String, default: "1" },
  holidayRate: { type: String, default: "1.3" },
  overtimeRate: { type: String, default: "1.25" },
});

const AttendanceSetting = mongoose.model(collectionName, schema);

export default AttendanceSetting;
