import { useState } from "react";
import "../scss/register.scss";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const [usernameBorder, setUsernameBorder] = useState({ border: "none" });
  const [emailBorder, setEmailBorder] = useState({ border: "none" });
  const [passwordBorder, setPasswordBorder] = useState({ border: "none" });
  const [passwordConfirmBorder, setPasswordConfirmBorder] = useState({
    border: "none",
  });

  const red = "#f34949";

  const { login } = useLogin();

  async function handleRegister(e: any) {
    e.preventDefault();
    setUsernameBorder({ border: "none" });
    setEmailBorder({ border: "none" });
    setPasswordBorder({ border: "none" });
    setPasswordConfirmBorder({ border: "none" });
    if (!username || !email || !password || !passwordConfirm) {
      setError("form fields cannot be left empty");
      if (!username) setUsernameBorder({ border: `solid ${red}` });
      if (!email) setEmailBorder({ border: `solid ${red}` });
      if (!password) setPasswordBorder({ border: `solid ${red}` });
      if (!passwordConfirm)
        setPasswordConfirmBorder({ border: `solid ${red}` });
      return;
    }

    if (!validateEmail(email)) {
      setError("invalid email");
      setEmailBorder({ border: `solid ${red}` });
      return;
    }

    if (password.length < 6) {
      setError("passwords must be at least 6 characters long");
      setPasswordBorder({ border: `solid ${red}` });
      return;
    }

    if (password !== passwordConfirm) {
      setError("passwords must match");
      setPasswordBorder({ border: `solid ${red}` });
      setPasswordConfirmBorder({ border: `solid ${red}` });
      return;
    }
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json.message.split(" "));
      if (json.message.split(" ")[0] === "Username")
        setUsernameBorder({ border: `solid ${red}` });
      if (json.message.split(" ")[0] === "Email")
        setEmailBorder({ border: `solid ${red}` });
      setError(json.message);
    }
    if (response.ok) {
      await login(email, password);
    }
  }

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <main className="register">
      <form className="form">
        <h1 className="form__title">Register</h1>
        <div className="form__field">
          <label className="form__label" htmlFor="username">
            username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            className="form__input"
            style={usernameBorder}
          />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="email">
            email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="form__input"
            style={emailBorder}
          />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="password">
            password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="form__input"
            style={passwordBorder}
          />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="passwordConfirm">
            confirm password
          </label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            id="passwordConfirm"
            className="form__input"
            style={passwordConfirmBorder}
          />
        </div>
        <button className="form__btn" onClick={handleRegister}>
          Register
        </button>
        <Link to="/login">
          <div className="form__footer">
            <p>Already have an account?</p>
            {error && <div className="form__error">{error}</div>}
          </div>
        </Link>
      </form>
    </main>
  );
}

export default Register;
