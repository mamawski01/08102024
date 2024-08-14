import { Outlet } from "react-router-dom";

import MainHeader from "./MainHeader";
import MainSidebar from "./MainSidebar";
import Main from "./Main";
import MainSection from "./MainSection";

export default function AppLayout() {
  return (
    <>
      <MainHeader></MainHeader>
      <MainSection>
        <MainSidebar></MainSidebar>
        <Main>
          <Outlet></Outlet>
        </Main>
      </MainSection>
    </>
  );
}
