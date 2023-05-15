import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useLogin = () => {
  const [error, setError] = useState("");
  const { dispatch } = useUserContext();

  const login = async (email: string, password: string) => {
    setError("");

    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("typ_user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return { login, error };
};
