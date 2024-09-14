import mongoose from "mongoose";

const collectionName = "AttendanceUserDefSchedule";

const { Schema } = mongoose;

const daySchema = new Schema({
  timeIn: { type: String, default: "09:00 am" },
  timeOut: { type: String, default: "06:00 pm" },
  notes: { type: String, default: "regular duty" },
  day: { type: String, default: "" },
});

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const schema = new Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  attendanceId: { type: String },
  defaultDuty: { type: String, default: "true" },
  days: {
    type: [daySchema],
    default: daysOfWeek.map((day) => ({ day })),
  },
});

const AttendanceUserDefScheduleModel = mongoose.model(collectionName, schema);

export default AttendanceUserDefScheduleModel;
