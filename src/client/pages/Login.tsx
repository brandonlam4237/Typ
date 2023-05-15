import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../scss/login.scss";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    login,
    error,
    setError,
    emailBorder,
    setEmailBorder,
    passwordBorder,
    setPasswordBorder,
  } = useLogin();
  const red = "#f34949";

  async function handleLogin(e: any) {
    e.preventDefault();
    setEmailBorder({ border: `none` });
    setPasswordBorder({ border: `none` });
    if (!email && !password) {
      setError("email and password fields cannot be empty");
      setEmailBorder({ border: `solid ${red}` });
      setPasswordBorder({ border: `solid ${red}` });
      return;
    }
    if (!email) {
      setError("email field cannot be empty");
      setEmailBorder({ border: `solid ${red}` });
      return;
    }
    if (!password) {
      setError("password field cannot be empty");
      setPasswordBorder({ border: `solid ${red}` });
      return;
    }
    await login(email, password);
  }

  return (
    <main className="login">
      <form className="form">
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
        <button
          className="form__btn"
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          Login
        </button>

        <Link to="/register">
          <div className="form__footer">
            <p>Create new account</p>
            {error && <div className="form__error">{error}</div>}
          </div>
        </Link>
      </form>
    </main>
  );
}

export default Login;
