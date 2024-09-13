import mongoose from "mongoose";

const collectionName = "AttendanceUserDefSchedule";

const { Schema } = mongoose;

const defaultTime = {
  timeIn: { type: String, default: "09:00 am" },
  timeOut: { type: String, default: "06:00 pm" },
  notes: { type: String, default: "regular duty" },
};

const schema = new Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  attendanceId: { type: String },
  defaultDuty: { type: String, default: "true" },
  days: {
    monday: { ...defaultTime, day: { type: String, default: "monday" } },
    tuesday: { ...defaultTime, day: { type: String, default: "tuesday" } },
    wednesday: { ...defaultTime, day: { type: String, default: "wednesday" } },
    thursday: { ...defaultTime, day: { type: String, default: "thursday" } },
    friday: { ...defaultTime, day: { type: String, default: "friday" } },
    saturday: { ...defaultTime, day: { type: String, default: "saturday" } },
    sunday: { ...defaultTime, day: { type: String, default: "sunday" } },
  },
});

const AttendanceUserDefScheduleModel = mongoose.model(collectionName, schema);

export default AttendanceUserDefScheduleModel;
