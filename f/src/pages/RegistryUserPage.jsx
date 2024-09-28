import dayjs from "dayjs";

import Card from "../reusable/components/card";
import {
  calculateAge,
  capitalizeFirstLetterEachWord,
} from "../reusable/utils/helpers";
import {
  BookOpenIcon,
  HomeModernIcon,
  PhoneIcon,
  PlusCircleIcon,
  //   PlusCircleIcon,
} from "@heroicons/react/24/solid";
import Linker from "../reusable/components/Linker";
import TittleH1 from "../reusable/components/TittleH1";
import { useFetch, useGet } from "../reusable/hooks/useFetch";
import { deleter, poster } from "../api/api";

export default function RegistryUserPage() {
  const updater1post = useGet("b2fPostRegistryUser");
  const updater2patch = useGet("b2fPatchRegistryUser");
  const updater3delete = useGet("b2fDeleteRegistryUser");
  const updater4postOther = useGet("b2fPostConfirmedUser");
  useFetch(
    "simple/findAll",
    "/bGetRegistryUsers",
    "getRegistryUsers",
    "f2bGetRegistryUsers",
    null,
    updater1post,
    updater2patch,
    updater3delete,
    updater4postOther,
  );
  const registryUsersGet = useGet("b2fGetRegistryUsers");

  return (
    <>
      <TittleH1>Registry User</TittleH1>
      <div className="flex flex-col gap-6 [&>*:nth-child(even)]:bg-slate-500/10">
        {registryUsersGet && registryUsersGet.length === 0 && (
          <div>
            <h1 className="text-center text-xl font-bold">Empty List...</h1>
            <Linker
              text={"addRegistryUser"}
              icon={<PlusCircleIcon color="aquamarine" />}
              to={"registryUserForm"}
            ></Linker>
          </div>
        )}
        {registryUsersGet &&
          registryUsersGet
            .slice()
            .reverse()
            .map((data, i) => (
              <Card
                key={i}
                to={`registryUserForm/${data._id}`}
                deleteOne={() =>
                  deleter(
                    "simple/deleteOne",
                    "/bDeleteRegistryUser/",
                    "deleteRegistryUser",
                    "f2bDeleteRegistryUser",
                    data._id,
                  )
                }
                confirmOne={() =>
                  poster(
                    "special/saveOne",
                    "/bPostConfirmedUser/",
                    "postConfirmedUser",
                    "f2bPostConfirmedUser",
                    data,
                    data._id,
                  )
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
