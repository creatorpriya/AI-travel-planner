import { Link, useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";

function Navbar() {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  return (

    <nav className="navbar">

      <div className="logo">
        ✈ AI Travel Planner
      </div>

      <div className="nav-links" >
        <DarkMode />

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/create-trip">
          Create Trip
        </Link>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>

  );
}

export default Navbar;