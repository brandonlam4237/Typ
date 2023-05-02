import React from "react";
import SettingsBar from "../components/SettingsBar";
import "../scss/home.scss";

function Home() {
  return (
    <main className="home">
      <SettingsBar />
      <div>home page</div>
    </main>
  );
}

export default Home;
