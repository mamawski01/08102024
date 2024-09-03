import dayjs from "dayjs";

import { useDataGetter, useGetter } from "../reusable/hooks/useGetter";
import { getRegistryUsers } from "../api/registryUsers";
import Card from "../reusable/components/card";
import {
  calculateAge,
  capitalizeFirstLetterEachWord,
} from "../reusable/utils/helpers";
import { HomeModernIcon, PhoneIcon } from "@heroicons/react/24/solid";

export default function HomePage() {
  useGetter(getRegistryUsers);
  const apiData = useDataGetter("b2fGetRegistryUsers");
  console.log(apiData);

  return (
    <div className="flex flex-col gap-6 [&>*:nth-child(even)]:bg-slate-500/10">
      {apiData &&
        apiData
          .slice()
          .reverse()
          .map((data, i) => (
            <Card
              key={i}
              title={`${capitalizeFirstLetterEachWord(data.firstName)} ${capitalizeFirstLetterEachWord(data.middleName)} ${capitalizeFirstLetterEachWord(data.lastName)}`}
              mainDescription={data.position}
              description={`Birthday ${dayjs(data.birthdate).format("MMM DD, YYYY")}, Age ${calculateAge(data.birthdate)}`}
              iconWithDetails={[
                {
                  icon: <HomeModernIcon />,
                  iconDetails: `${data.street && `${data.street} St.,`} ${data.purok && `Prk. ${data.purok}`} ${data.brgy.toLowerCase().includes("brgy") ? data.brgy : `Brgy. ${data.brgy}`}, ${data.city.toLowerCase().includes("city") ? data.city : `${data.city} City`}, ${data.province}, ${data.country}`,
                },
                {
                  icon: <PhoneIcon />,
                  iconDetails: `${data.contactNumber1} ${data.contactNumber2} ${data.contactNumber3}`,
                },
                {
                  icon: <HomeModernIcon />,
                  iconDetails: `${data.street && `${data.street} St.,`} ${data.purok && `Prk. ${data.purok}`} ${data.brgy.toLowerCase().includes("brgy") ? data.brgy : `Brgy. ${data.brgy}`}, ${data.city.toLowerCase().includes("city") ? data.city : `${data.city} City`}, ${data.province}, ${data.country}`,
                },
              ]}
            ></Card>
          ))}
    </div>
  );
}
