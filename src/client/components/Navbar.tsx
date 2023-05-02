import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import user from "../assets/account.svg";
import "../scss/navbar.scss";

function Navbar() {
  return (
    <main className="navbar">
      <Link to="/">
        <img src={logo} className="navbar__logo" />
      </Link>
      <img src={user} className="navbar__user" />
    </main>
  );
}

export default Navbar;
