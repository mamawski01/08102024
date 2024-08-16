import {
  Bars3Icon,
  PaperClipIcon,
  PlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import Logo from "../reusable/components/Logo";
import Options from "../reusable/components/Options";
import NavLinker from "../reusable/components/NavLinker";

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
            position="right-0"
            icon={<Bars3Icon></Bars3Icon>}
            options={[
              {
                option: (
                  <NavLinker
                    icon={<PaperClipIcon></PaperClipIcon>}
                    text={"upload"}
                  ></NavLinker>
                ),
              },
              {
                option: (
                  <NavLinker
                    icon={<UserGroupIcon></UserGroupIcon>}
                    text={"attendance"}
                  ></NavLinker>
                ),
              },
            ]}
          ></Options>
          <NavLinker
            text="add user"
            icon={<PlusIcon></PlusIcon>}
            to={"homepage/registryUserForm"}
          ></NavLinker>
        </div>
      </div>
    </header>
  );
}
