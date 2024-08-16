import { Bars3Icon } from "@heroicons/react/24/solid";

import Logo from "../reusable/components/Logo";
import Options from "../reusable/components/Options";
import Linker from "../reusable/components/Linker";

export default function MainHeader() {
  return (
    <header className="header">
      <div className="container mx-auto flex flex-nowrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <Logo text="TEC" imgSrc={"/Asset2.png"}></Logo>
        </div>
        <div className="flex gap-4">
          <Options
            text="options"
            type="button"
            icon={{ icon: <Bars3Icon></Bars3Icon> }}
            options={[
              { option: <Linker></Linker> },
              { option: <Linker></Linker> },
            ]}
          ></Options>
        </div>
      </div>
    </header>
  );
}
