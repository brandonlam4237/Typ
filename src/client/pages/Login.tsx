import { useState } from "react";
import { Link } from "react-router-dom";
import "../scss/login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <button className="form__btn">Login</button>
        <Link to="/register">
          <p className="form__footer">Create new account</p>
        </Link>
      </form>
    </main>
  );
}

export default Login;
