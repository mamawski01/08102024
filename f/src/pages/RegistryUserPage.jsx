import dayjs from "dayjs";

import { useDataGetter, useGetter } from "../reusable/hooks/useGetter";
import { deleteRegistryUser, getRegistryUsers } from "../api/registryUsers";
import Card from "../reusable/components/card";
import {
  calculateAge,
  capitalizeFirstLetterEachWord,
} from "../reusable/utils/helpers";
import {
  BookOpenIcon,
  Cog8ToothIcon,
  HomeModernIcon,
  PhoneIcon,
  PlusCircleIcon,
  //   PlusCircleIcon,
} from "@heroicons/react/24/solid";
import Options from "../reusable/components/Options";
import Linker from "../reusable/components/Linker";
import { postConfirmedUser } from "../api/confirmedUsers";

export default function RegistryUserPage() {
  const updater1post = useDataGetter("b2fPostRegistryUser");
  const updater2patch = useDataGetter("b2fPatchRegistryUser");
  const updater3delete = useDataGetter("b2fDeleteRegistryUser");
  const updater4postOther = useDataGetter("b2fPostConfirmedUser");
  useGetter(
    getRegistryUsers,
    "f2bGetRegistryUsers",
    null,
    updater1post,
    updater2patch,
    updater3delete,
    updater4postOther,
  );
  const registryUsersGet = useDataGetter("b2fGetRegistryUsers");

  return (
    <>
      <div className="sticky top-0 z-10 flex bg-slate-950 text-center">
        <Options
          text="Options"
          position="left-0"
          icon={<Cog8ToothIcon color="orangered" />}
          options={[
            {
              option: (
                <Linker
                  text={"addRegistryUser"}
                  icon={<PlusCircleIcon color="aquamarine" />}
                  to={"registryUserForm"}
                ></Linker>
              ),
            },
          ]}
        ></Options>
        <h1 className="flex w-full items-center justify-center text-center text-2xl font-bold tracking-wider">
          Registry User
        </h1>
      </div>
      <div className="flex flex-col gap-6 [&>*:nth-child(even)]:bg-slate-500/10">
        {registryUsersGet &&
          registryUsersGet
            .slice()
            .reverse()
            .map((data, i) => (
              <Card
                key={i}
                to={`registryUserForm/${data._id}`}
                deleteOne={() =>
                  deleteRegistryUser("f2bDeleteRegistryUser", data._id)
                }
                confirmOne={() =>
                  postConfirmedUser("f2bPostConfirmedUser", data, data._id)
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
