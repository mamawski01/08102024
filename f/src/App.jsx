import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import AppLayout from "./layout/AppLayout";
import RegistryUserForm from "./pages/RegistryUserForm";

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
              path="homepage/registryUserForm"
              element={<RegistryUserForm></RegistryUserForm>}
            ></Route>
            <Route
              path="homepage/registryUserForm/:id"
              element={<RegistryUserForm></RegistryUserForm>}
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
