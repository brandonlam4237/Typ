import React, { useState } from "react";
import SettingsBar from "../components/SettingsBar";
import "../scss/home.scss";
import reset from "../assets/reset.svg";

function Home() {
  const text: string =
    "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur";
  const textArr: string[] = text.split(" ");

  return (
    <main className="home">
      <SettingsBar />
      <div className="game">
        <div className="game__timer">53</div>
        <div className="game__words">
          {textArr.map((word) => {
            return <div>{word}</div>;
          })}
        </div>
        <div className="game__cursor"></div>
        <div className="game__reset-container">
          <img className="game__reset" src={reset} />
        </div>
      </div>
    </main>
  );
}

export default Home;
