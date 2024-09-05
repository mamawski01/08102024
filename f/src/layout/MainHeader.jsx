import {
  Bars3Icon,
  PaperClipIcon,
  PlusCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import Logo from "../reusable/components/Logo";
import Options from "../reusable/components/Options";
import NavLinker from "../reusable/components/NavLinker";
import LinkerDisappearing from "../reusable/components/LinkerDisappearing";

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
            position="right-0"
            icon={<Bars3Icon></Bars3Icon>}
            color="indigo"
            options={[
              {
                option: (
                  <NavLinker
                    icon={<PaperClipIcon></PaperClipIcon>}
                    text={"upload"}
                    color="indigo"
                  ></NavLinker>
                ),
              },
              {
                option: (
                  <NavLinker
                    icon={<UserGroupIcon></UserGroupIcon>}
                    text={"attendance"}
                    color="indigo"
                  ></NavLinker>
                ),
              },
            ]}
          ></Options>
          <LinkerDisappearing
            text={"Add User"}
            icon={<PlusCircleIcon />}
            to={"homepage/registryUserForm"}
          ></LinkerDisappearing>
        </div>
      </div>
    </header>
  );
}
