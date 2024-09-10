import {
  CalendarDateRangeIcon,
  CalendarIcon,
  PaperClipIcon,
} from "@heroicons/react/24/solid";
import { useGlobal } from "./context/globalhook";
import Card from "../reusable/components/card";
import { capitalizeFirstLetterEachWord } from "../reusable/utils/helpers";
import Linker from "../reusable/components/Linker";

export default function AttendancePage() {
  const { confirmedUsersGet } = useGlobal();
  console.log(confirmedUsersGet);
  return (
    <>
      <div className="sticky top-0 z-10 flex bg-slate-950 text-center">
        <h1 className="flex h-16 w-full items-center justify-center text-center text-2xl font-bold tracking-wider">
          User Attendance and Benefits
        </h1>
      </div>
      <div className="flex flex-col gap-6 [&>*:nth-child(even)]:bg-slate-500/10">
        {confirmedUsersGet && confirmedUsersGet.length === 0 && (
          <h1 className="text-center text-xl font-bold">Empty List...</h1>
        )}
        {confirmedUsersGet &&
          confirmedUsersGet
            .slice()
            .reverse()
            .map((data, i) => (
              <Card
                key={i}
                to={`/homepage/confirmedUserPage/confirmedUserForm/${data._id}`}
                imgSrc={data.image}
                title={`${capitalizeFirstLetterEachWord(data.firstName)} ${capitalizeFirstLetterEachWord(data.middleName)} ${capitalizeFirstLetterEachWord(data.lastName)}`}
                mainDescription={data.position}
                description={`${data.attendanceId ? `Attendance Id: ${data.attendanceId}` : "No attendance Id"} ${data.wage ? `| Daily Wage: ${data.wage}` : ``} ${data.dailySSSAllocation ? `| Daily SSS Allocation: ${data.dailySSSAllocation}` : ``} ${data.monthlyPhilHealth ? `| Monthly Phil-Health Allocation: ${data.monthlyPhilHealth}` : ``} ${data.monthlyPagIbig ? `| Monthly Pag-Ibig Allocation: ${data.monthlyPagIbig}` : ``}`}
                link={true}
                iconWithDetails={[
                  {
                    icon: <CalendarDateRangeIcon />,
                    iconDetails: `View Attendance`,
                  },
                  {
                    icon: <CalendarIcon />,
                    iconDetails: `View Schedule`,
                  },
                  {
                    icon: <PaperClipIcon />,
                    iconDetails: `View Payroll`,
                  },
                ]}
              ></Card>
            ))}
      </div>
    </>
  );
}
