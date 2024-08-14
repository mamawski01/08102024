import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./reusable/layout/Applayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes element={<AppLayout></AppLayout>}></Routes>
    </BrowserRouter>
  );
}
