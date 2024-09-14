const data = [
  {
    attendanceId: "3",
    firstName: "rhea joy",
    lastName: "guzon",
    date: "2024-09-01",
    day: "sunday",
    defaultDuty: "true",
    notes: "Day-Off",
    timeIn: "09:00 am",
    timeOut: "06:00 pm",
  },
  {
    attendanceId: "3",
    firstName: "rhea joy",
    lastName: "guzon",
    date: "2024-09-01",
    day: "sunday",
    defaultDuty: "true",
    notes: "Day-Off",
    timeIn: "09:00 am",
    timeOut: "06:00 pm",
  },
  {
    attendanceId: "3",
    firstName: "rhea joy",
    lastName: "guzon",
    date: "2024-09-02",
    day: "sunday",
    defaultDuty: "true",
    notes: "Day-Off",
    timeIn: "09:00 am",
    timeOut: "06:00 pm",
  },
];

//desire result

[
  {
    attendanceId: "3",
    firstName: "rhea joy",
    lastName: "guzon",
    date: "2024-09-02",
    day: "sunday",
    defaultDuty: "true",
    notes: "Day-Off",
    timeIn: "09:00 am",
    timeOut: "06:00 pm",
  },
];

//i am saving a multiple item in mongodb, i want to have a unique date, if there is date duplication, i don't want to save the last duplicate item

const uniqueData = data.filter(
  (item, index, self) => index === self.findIndex((t) => t.date === item.date),
);

console.log(uniqueData);
