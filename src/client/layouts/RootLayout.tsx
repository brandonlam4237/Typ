import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function RootLayout() {
  return (
    <div className="root-layout">
      <main className="container">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
