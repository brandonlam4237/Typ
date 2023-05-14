import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import user_icon from "../assets/account.svg";
import "../scss/navbar.scss";
import { useUserContext } from "../hooks/useUserContext";

function Navbar() {
  const { user } = useUserContext();

  return (
    <main className="navbar">
      <Link to="/">
        <img src={logo} className="navbar__logo" />
      </Link>
      <div className="navbar__account">
        {user && <p>{user.user.username}</p>}
        <Link to="/register">
          <img src={user_icon} className="navbar__user" />
        </Link>
      </div>
    </main>
  );
}

export default Navbar;
