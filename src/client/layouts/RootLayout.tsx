import React from "react";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="root-layout">
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
