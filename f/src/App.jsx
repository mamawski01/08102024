import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import GlobalProvider from "./pages/context/GlobalContext";

import HomePage from "./pages/HomePage";
import AppLayout from "./layout/AppLayout";
import RegistryUserForm from "./pages/RegistryUserForm";
import RegistryUserPage from "./pages/RegistryUserPage";
import ConfirmedUserPage from "./pages/ConfirmedUserPage";
import ConfirmedUserForm from "./pages/ConfirmedUserForm";
import AttendanceAndBenefitsPage from "./pages/AttendanceAndBenefitsPage";
import AttendanceAndSchedulePage from "./pages/AttendanceAndSchedulePage";
import AttendanceUploadForm from "./pages/AttendanceUploadForm";
import AttendanceScheduleCreation from "./pages/AttendanceScheduleCreation";
import AttendanceDefaultScheduleForm from "./pages/AttendanceDefaultScheduleForm";

export default function App() {
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout></AppLayout>}>
              <Route
                index
                element={<Navigate replace to="homepage"></Navigate>}
              ></Route>
              <Route path="homepage" element={<HomePage></HomePage>}></Route>
              <Route
                path="homepage/registryUserPage"
                element={<RegistryUserPage></RegistryUserPage>}
              ></Route>
              <Route
                path="homepage/registryUserPage/registryUserForm"
                element={<RegistryUserForm></RegistryUserForm>}
              ></Route>
              <Route
                path="homepage/registryUserPage/registryUserForm/:id"
                element={<RegistryUserForm></RegistryUserForm>}
              ></Route>
              <Route
                path="homepage/confirmedUserPage"
                element={<ConfirmedUserPage />}
              ></Route>
              <Route
                path="homepage/confirmedUserPage/confirmedUserForm"
                element={<ConfirmedUserForm />}
              ></Route>
              <Route
                path="homepage/confirmedUserPage/confirmedUserForm/:id"
                element={<ConfirmedUserForm />}
              ></Route>
              <Route
                path="homepage/attendanceAndBenefitsPage"
                element={<AttendanceAndBenefitsPage />}
              ></Route>
              <Route
                path="homepage/attendanceAndBenefitsPage/attendanceUploadForm"
                element={<AttendanceUploadForm />}
              ></Route>
              <Route
                path="homepage/attendanceAndBenefitsPage/attendanceScheduleCreation"
                element={<AttendanceScheduleCreation />}
              ></Route>
              <Route
                path="homepage/attendanceAndBenefitsPage/attendanceScheduleCreation/attendanceDefaultScheduleForm/:id"
                element={<AttendanceDefaultScheduleForm />}
              ></Route>

              <Route
                path="homepage/attendanceAndBenefitsPage/attendanceAndSchedulePage/:id"
                element={<AttendanceAndSchedulePage />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
        gutter={12}
      ></Toaster>
    </>
  );
}
