import { useGetter } from "../reusable/hooks/useGetter";
import { getRegistryUsers } from "../api/registryUsers";

export default function HomePage() {
  useGetter(getRegistryUsers);

  return <div>HomePage</div>;
}
