import {
  PresentationChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import Logo from "../reusable/components/Logo";
import Options from "../reusable/components/Options";
import NavLinker from "../reusable/components/NavLinker";
import { CheckmarkIcon } from "react-hot-toast";

export default function MainHeader() {
  return (
    <header className="header">
      <div className="container mx-auto flex flex-nowrap items-center justify-between gap-2">
        <div className="flex gap-2">
          <Logo text="TEC" imgSrc={"/Asset2.png"}></Logo>
        </div>
        <div className="flex gap-4">
          <Options
            text="manageStaff"
            position="right-0"
            icon={<UserGroupIcon />}
            options={[
              {
                option: (
                  <NavLinker
                    icon={<PresentationChartBarIcon></PresentationChartBarIcon>}
                    text={"attendanceAndBenefits"}
                    to="homepage/attendanceAndBenefitsPage"
                  ></NavLinker>
                ),
              },
              {
                option: (
                  <NavLinker
                    icon={<UserGroupIcon></UserGroupIcon>}
                    text={"registryUserList"}
                    to="homepage/registryUserPage"
                  ></NavLinker>
                ),
              },
              {
                option: (
                  <NavLinker
                    icon={<CheckmarkIcon></CheckmarkIcon>}
                    text={"confirmedUserList"}
                    to="homepage/confirmedUserPage"
                  ></NavLinker>
                ),
              },
            ]}
          ></Options>
        </div>
      </div>
    </header>
  );
}
