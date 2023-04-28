import "./App.css";

import { useEffect, useState } from "react";

import reactLogo from "./assets/react.svg";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/hello")
      .then((res) => res.text())
      .then((message) => setMessage(message));
  }, []);

  return <p>{message}</p>;
}

export default App;
