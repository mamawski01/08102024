import { Outlet } from "react-router-dom";
import Main from "./Main";
import MainHeader from "./MainHeader";
import MainSection from "./MainSection";
import MainSideBar from "./MainSideBar";

export default function AppLayout() {
  return (
    <>
      <MainHeader></MainHeader>
      <MainSection>
        <MainSideBar></MainSideBar>
        <Main>
          <Outlet></Outlet>
        </Main>
      </MainSection>
    </>
  );
}
