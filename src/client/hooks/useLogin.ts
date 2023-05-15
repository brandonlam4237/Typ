import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useLogin = () => {
  const [error, setError] = useState("");
  const { dispatch } = useUserContext();
  const [emailBorder, setEmailBorder] = useState({ border: "none" });
  const [passwordBorder, setPasswordBorder] = useState({ border: "none" });
  const red = "#f34949";

  const login = async (email: string, password: string) => {
    setError("");

    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      if (json.message.split(" ")[1] === "Email") {
        setEmailBorder({ border: `solid ${red}` });
        setError("email does not match any existing account");
      }
      if (json.message.split(" ")[1] === "Password") {
        setPasswordBorder({ border: `solid ${red}` });
        setError("inccorect password");
      }
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("typ_user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return {
    login,
    error,
    setError,
    emailBorder,
    setEmailBorder,
    passwordBorder,
    setPasswordBorder,
  };
};
