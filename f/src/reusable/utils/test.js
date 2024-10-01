import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const scheduledTime = dayjs("2024-09-02 09:17:00");
const actualTime = dayjs("2024-09-02 18:05:00");

const result = dayjs.duration(actualTime.diff(scheduledTime, "m"), "m");

console.log(result.format("H:mm"));

console.log(dayjs.duration({ minutes: 1 }).format("ss"));
