import {
  CalendarDateRangeIcon,
  ClockIcon,
  PaperClipIcon,
  SparklesIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { useGlobal } from "./context/globalhook";
import Card from "../reusable/components/card";
import { capitalizeFirstLetterEachWord } from "../reusable/utils/helpers";
import TittleH1 from "../reusable/components/TittleH1";
import Linker from "../reusable/components/Linker";
import Btn from "../reusable/components/Btn";
import { deleteAttendanceUsers } from "../api/attendanceUsers";

export default function AttendanceAndBenefitsPage() {
  const { confirmedUsersGets, attendanceUsersGets } = useGlobal();
  return (
    <>
      <div className="sticky top-0 z-10 bg-slate-950">
        <TittleH1 disableSticky={true}>User Attendance and Benefits</TittleH1>
        <div className="flex justify-evenly">
          <Linker
            text="attendanceUpload"
            icon={<UserPlusIcon />}
            to="attendanceUploadForm"
          ></Linker>
          <Btn
            text="attendanceClear"
            icon={<SparklesIcon />}
            onClick={() =>
              deleteAttendanceUsers(
                "f2bDeleteAttendanceUsers",
                attendanceUsersGets,
              )
            }
            color="yellow"
          ></Btn>
          <Linker
            text="createSchedule"
            icon={<ClockIcon color="red" />}
            to="attendanceScheduleCreation"
          ></Linker>
        </div>
      </div>
      <div className="flex flex-col gap-6 [&>*:nth-child(even)]:bg-slate-500/10">
        {confirmedUsersGets && confirmedUsersGets.length === 0 && (
          <h1 className="text-center text-xl font-bold">Empty List...</h1>
        )}
        {confirmedUsersGets &&
          confirmedUsersGets
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
                    iconDetails: `Attendance & Schedule`,
                    linkTo: `attendanceAndSchedulePage/${data._id}`,
                  },
                  {
                    icon: <PaperClipIcon />,
                    iconDetails: `View Payroll`,
                    linkTo: "/",
                  },
                ]}
              ></Card>
            ))}
      </div>
    </>
  );
}
