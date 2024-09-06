import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import AppLayout from "./layout/AppLayout";
import RegistryUserForm from "./pages/RegistryUserForm";
import RegistryUserPage from "./pages/RegistryUserPage";
import ConfirmedUserPage from "./pages/ConfirmedUserPage";

export default function App() {
  return (
    <>
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
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
        gutter={12}
      ></Toaster>
    </>
  );
}
