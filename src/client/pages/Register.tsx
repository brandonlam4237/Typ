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

  const { login } = useLogin();

  async function handleRegister(e: any) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("passwords must match");
      return;
    }
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      console.log(json.message);
      setError(json.message);
    }
    if (response.ok) {
      await login(email, password);
    }
  }

  return (
    <main className="register">
      <form className="form">
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
          />
        </div>
        <button className="form__btn" onClick={handleRegister}>
          Register
        </button>
        <Link to="/login">
          <p className="form__footer">Already have an account?</p>
        </Link>
        {error && <div className="form__error">{error}</div>}
      </form>
    </main>
  );
}

export default Register;
