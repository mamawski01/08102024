import dayjs from "dayjs";
import {
  BookOpenIcon,
  HomeModernIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";

import {
  calculateAge,
  capitalizeFirstLetterEachWord,
} from "../reusable/utils/helpers";
import Card from "../reusable/components/card";

import { useGlobal } from "./context/globalhook";
import TittleH1 from "../reusable/components/TittleH1";

export default function ConfirmedUserPage() {
  const { confirmedUsersGets, deleteConfirmedUser } = useGlobal();

  return (
    <>
      <TittleH1>Confirmed User</TittleH1>
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
                to={`confirmedUserForm/${data._id}`}
                deleteOne={() =>
                  deleteConfirmedUser("f2bDeleteConfirmedUser", data._id)
                }
                imgSrc={data.image}
                title={`${capitalizeFirstLetterEachWord(data.firstName)} ${capitalizeFirstLetterEachWord(data.middleName)} ${capitalizeFirstLetterEachWord(data.lastName)}`}
                mainDescription={data.position}
                description={`Birthday ${dayjs(data.birthdate).format("MMM DD, YYYY")}, Age ${calculateAge(data.birthdate)} ${data.attendanceId ? `| Attendance Id: ${data.attendanceId}` : ""}`}
                iconWithDetails={[
                  {
                    icon: <HomeModernIcon />,
                    iconDetails: `${data.street && `${capitalizeFirstLetterEachWord(data.street)} St.,`} ${data.purok && `Prk. ${capitalizeFirstLetterEachWord(data.purok)}`} ${data.brgy.toLowerCase().includes("brgy") ? data.brgy : `Brgy. ${capitalizeFirstLetterEachWord(data.brgy)}`}, ${data.city.toLowerCase().includes("city") ? capitalizeFirstLetterEachWord(data.city) : `${capitalizeFirstLetterEachWord(data.city)} City`}, ${capitalizeFirstLetterEachWord(data.province)}, ${capitalizeFirstLetterEachWord(data.country)}`,
                  },
                  {
                    icon: <PhoneIcon />,
                    iconDetails: `${data.contactNumber1} | ${data.contactNumber2 && `${data.contactNumber2} |`} ${data.contactNumber3 && `${data.contactNumber3} |`} ${data.email}`,
                  },
                  {
                    icon: <BookOpenIcon />,
                    iconDetails: `${data.SSS && `SSS:${data.SSS} |`} ${data.PagIbig && `Pag-Ibig:${data.PagIbig} |`} ${data.PhilHealth && `PhilHealth:${data.PhilHealth}`}`,
                  },
                ]}
              ></Card>
            ))}
      </div>
    </>
  );
}
