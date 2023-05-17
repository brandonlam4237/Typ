import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import user_icon from "../assets/account.svg";
import "../scss/navbar.scss";
import { useUserContext } from "../hooks/useUserContext";
import leaderboard_icon from "../assets/leaderboard.png";

function Navbar() {
  const { user } = useUserContext();

  return (
    <main className="navbar">
      <Link to="/">
        <img src={logo} className="navbar__logo" />
      </Link>

      <div className="navbar__options">
        <Link to="/leaderboard">
          <img src={leaderboard_icon} className="navbar__icon" />
        </Link>
        <div className="navbar__account">
          <Link to="/register">
            <img src={user_icon} className="navbar__user" />
          </Link>
          {user && <p>{user.user.username}</p>}
        </div>
      </div>
    </main>
  );
}

export default Navbar;
