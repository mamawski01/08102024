// const result = dates.reduce((acc, date) => {
//   const timeLogsForDate = timeLogs.filter((timeLog) =>
//     timeLog.startsWith(date),
//   );
//   acc.push({ date, timeLog: timeLogsForDate });
//   return acc;
// }, []);

// console.log(result);
// console.log(result[0].timeLog);

const dates = ["2024-09-01", "2024-09-02", "2024-09-03"];
const timeLogs = [
  {
    No: "1",
    DevNo: "1",
    UserId: "1",
    Name: "KIER TIBERIO",
    Mode: "FACE",
    DateTime: "2024-09-01 14:12:29",
  },
  {
    No: "1",
    DevNo: "1",
    UserId: "1",
    Name: "KIER TIBERIO",
    Mode: "FACE",
    DateTime: "2024-09-01 14:29:08",
  },
  {
    No: "1",
    DevNo: "1",
    UserId: "1",
    Name: "KIER TIBERIO",
    Mode: "FACE",
    DateTime: "2024-09-01 14:32:08",
  },
  {
    No: "1",
    DevNo: "1",
    UserId: "1",
    Name: "KIER TIBERIO",
    Mode: "FACE",
    DateTime: "2024-09-01 14:34:08",
  },
  {
    No: "1",
    DevNo: "1",
    UserId: "1",
    Name: "KIER TIBERIO",
    Mode: "FACE",
    DateTime: "2024-09-03 08:51:02",
  },
  {
    No: "1",
    DevNo: "1",
    UserId: "1",
    Name: "KIER TIBERIO",
    Mode: "FACE",
    DateTime: "2024-09-03 18:03:26",
  },
  {
    No: "1",
    DevNo: "1",
    UserId: "1",
    Name: "KIER TIBERIO",
    Mode: "FACE",
    DateTime: "2024-09-03 08:48:56",
  },
  {
    No: "1",
    DevNo: "1",
    UserId: "1",
    Name: "KIER TIBERIO",
    Mode: "FACE",
    DateTime: "2024-09-03 18:13:50",
  },
];

const timeLogObj = dates.map((date) => {
  const timeLog = timeLogs.filter((log) => log.DateTime.startsWith(date));
  return { date, timeLog };
});

console.log(timeLogObj);

// [
//   {
//     date: "2024-09-01",
//     timeLog: [
//       {
//         No: "1",
//         DevNo: "1",
//         UserId: "1",
//         Name: "KIER TIBERIO",
//         Mode: "FACE",
//         DateTime: "2024-09-01 14:12:29",
//       },
//       {
//         No: "1",
//         DevNo: "1",
//         UserId: "1",
//         Name: "KIER TIBERIO",
//         Mode: "FACE",
//         DateTime: "2024-09-01 14:29:08",
//       },
//       {
//         No: "1",
//         DevNo: "1",
//         UserId: "1",
//         Name: "KIER TIBERIO",
//         Mode: "FACE",
//         DateTime: "2024-09-01 14:32:08",
//       },
//       {
//         No: "1",
//         DevNo: "1",
//         UserId: "1",
//         Name: "KIER TIBERIO",
//         Mode: "FACE",
//         DateTime: "2024-09-01 14:34:08",
//       },
//     ],
//   },
//   { date: "2024-09-02", timeLog: [] },
//   {
//     date: "2024-09-03",
//     timeLog: [
//       {
//         No: "1",
//         DevNo: "1",
//         UserId: "1",
//         Name: "KIER TIBERIO",
//         Mode: "FACE",
//         DateTime: "2024-09-03 08:51:02",
//       },
//       {
//         No: "1",
//         DevNo: "1",
//         UserId: "1",
//         Name: "KIER TIBERIO",
//         Mode: "FACE",
//         DateTime: "2024-09-03 18:03:26",
//       },
//       {
//         No: "1",
//         DevNo: "1",
//         UserId: "1",
//         Name: "KIER TIBERIO",
//         Mode: "FACE",
//         DateTime: "2024-09-03 08:48:56",
//       },
//       {
//         No: "1",
//         DevNo: "1",
//         UserId: "1",
//         Name: "KIER TIBERIO",
//         Mode: "FACE",
//         DateTime: "2024-09-03 18:13:50",
//       },
//     ],
//   },
// ];
