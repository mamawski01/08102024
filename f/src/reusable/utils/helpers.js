import Swal from "sweetalert2";

export function swalAlert(
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  confirmButtonText = "Yes, delete it!",
) {
  const confirmDelete = Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
    customClass: {
      popup: "bg-slate-100/80 backdrop-blur-sm",
    },
  });
  return confirmDelete;
}

export function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function formatFontLabel(font = "") {
  return (
    font.charAt(0).toUpperCase() + font.slice(1).replace(/([A-Z])/g, " $1")
  );
}

export function formatFontInput(font = "") {
  return (
    font.charAt(0).toUpperCase() + font.slice(1).replace(/([A-Z])/g, " $1")
  );
}

export function capitalizeFirstLetterEachWord(str) {
  return str?.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function capitalizeFirstLetter(str) {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
}

export function onHoverBgColor(color) {
  if (color === "red") return "hover:bg-red-700";
  if (color === "blue") return "hover:bg-blue-700";
  if (color === "yellow") return "hover:bg-yellow-600";
  if (color === "green") return "hover:bg-green-600";
  return "hover:bg-gray-700";
}

export function convertToJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const content = e.target.result;
      console.log(content);
      const lines = content.split("\n");
      const newArray = lines.map((element) => element.replace("\r", ""));
      const headers = newArray.map((element) => element.split("\t"));
      const jsonData = headers.map((row) => {
        const obj = {};
        row.forEach((value, i) => {
          const key = headers[0][i];
          obj[key] = value;
        });
        return obj;
      });
      resolve(jsonData.splice(1, jsonData.length - 2));
    };

    reader.onerror = function (e) {
      reject(e);
    };

    reader.readAsText(file);
  });
}

export function getTimeDifference(startTime, endTime, breakTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  let timeDiff = end - start;

  if (breakTime) {
    const string = breakTime;
    const regex = /(\d+)hr:(\d+)min/;
    const match = string.match(regex);
    const hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const time = 60 * (60 + minutes) * 1000 * (hours ? hours : 1);

    timeDiff = end - start - time;
  }
  if (timeDiff < 0) return null;
  const hours = Math.floor(timeDiff / 3600000);
  const minutes = Math.floor((timeDiff % 3600000) / 60000);
  const seconds = Math.floor((timeDiff % 60000) / 1000);

  return {
    message: `${hours ? `${hours}h:` : ""}${minutes ? `${minutes}m:` : ""}${seconds ? `${seconds}s` : ""}`,
    value: timeDiff,
  };
}
