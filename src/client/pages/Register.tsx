import { useState } from "react";
import "../scss/register.scss";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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
        <button className="form__btn">register</button>
        <p className="form__footer">Already have an account?</p>
      </form>
    </main>
  );
}

export default Register;
