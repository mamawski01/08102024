import { useDataGetter, useGetter } from "../reusable/hooks/useGetter";
import { getRegistryUsers } from "../api/registryUsers";
import Card from "../reusable/components/card";

export default function HomePage() {
  useGetter(getRegistryUsers);
  const apiData = useDataGetter("b2fGetRegistryUsers");
  console.log(apiData);

  return (
    <div className="flex flex-col gap-6 [&>*:nth-child(even)]:bg-slate-500/10">
      {apiData
        .slice()
        .reverse()
        .map((data, i) => (
          <Card key={i} data={data}></Card>
        ))}
    </div>
  );
}

("b2fGetRegistryUsers");
