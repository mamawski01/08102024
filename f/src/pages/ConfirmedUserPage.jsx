import dayjs from "dayjs";

import { useDataGetter, useGetter } from "../reusable/hooks/useGetter";
import { deleteConfirmedUser, getConfirmedUsers } from "../api/confirmedUsers";
import Card from "../reusable/components/card";
import {
  calculateAge,
  capitalizeFirstLetterEachWord,
} from "../reusable/utils/helpers";
import {
  BookOpenIcon,
  HomeModernIcon,
  PhoneIcon,
  //   PlusCircleIcon,
} from "@heroicons/react/24/solid";

export default function ConfirmedUserPage() {
  const updater1post = useDataGetter("b2fPostConfirmedUser");
  const updater2patch = useDataGetter("b2fPatchConfirmedUser");
  const updater3delete = useDataGetter("b2fDeleteConfirmedUser");
  useGetter(
    getConfirmedUsers,
    "f2bGeConfirmedUsers",
    null,
    updater1post,
    updater2patch,
    updater3delete,
  );
  const confirmedUsersGet = useDataGetter("b2fGeConfirmedUsers");
  console.log(confirmedUsersGet);

  return (
    <>
      <div className="sticky top-0 z-10 flex bg-slate-950 text-center">
        <h1 className="flex h-16 w-full items-center justify-center text-center text-2xl font-bold tracking-wider">
          Confirmed User
        </h1>
      </div>
      <div className="flex flex-col gap-6 [&>*:nth-child(even)]:bg-slate-500/10">
        {confirmedUsersGet &&
          confirmedUsersGet
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
                description={`Birthday ${dayjs(data.birthdate).format("MMM DD, YYYY")}, Age ${calculateAge(data.birthdate)}`}
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
