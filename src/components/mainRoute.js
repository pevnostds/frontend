import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import {
  NavbarComponent,
  PasienComponent,
  PasienEdit,
  Login,
  Register,
  Dashboard,
  PasienTambah,
  RekamMedisComponent,
  LaporanComponent,
  RiwayatComponent,
  FooterComponent,
} from "../components";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./privateRoute";
import { NotFound } from "./notfound";
import { RoleRoute } from "./roleRoute";

export const MainRoute = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/Login", "/Register","/register"];

  return (
    <div className="app-container">
      {!hideNavbarRoutes.includes(location.pathname) && <NavbarComponent />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Notfound" element={<NotFound />} />
          <Route element={<PrivateRoute />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route
              path="/Rekam-Medis"
              element={
                <RoleRoute role="admin">
                  <RekamMedisComponent />
                </RoleRoute>
              }
            />
            <Route
              path="/Data/Pasien"
              element={
                <RoleRoute role="admin">
                  <PasienComponent />
                </RoleRoute>
              }
            />
            <Route
              path="/Laporan"
              element={
                <RoleRoute role="admin">
                  <LaporanComponent />
                </RoleRoute>
              }
            />
            <Route
              path="/Edit/Pasien/:id"
              element={
                <RoleRoute role="admin">
                  <PasienEdit />
                </RoleRoute>
              }
            />
            <Route
              path="/Daftar/Pasien"
              element={
                <RoleRoute role="user">
                  <PasienTambah />
                </RoleRoute>
              }
            />
            <Route
              path="/Riwayat"
              element={
                <RoleRoute role="user">
                  <RiwayatComponent />
                </RoleRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <br />
      {!hideNavbarRoutes.includes(location.pathname) && <FooterComponent />}
    </div>
  );
};
