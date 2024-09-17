import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  openLoginModal,
  openRegisterModal,
}) {
  const currentUser = useContext(CurrentUserContext); // Get current user data from context

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Helper function to generate the placeholder avatar based on the first letter of the user's name
  const generatePlaceholderAvatar = (name) => {
    const firstLetter = name ? name.charAt(0).toUpperCase() : "?"; // Default to "?" if no name
    return <div className="header__avatar-placeholder">{firstLetter}</div>;
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {!isLoggedIn ? (
        <div className="header__auth-buttons">
          <button onClick={openLoginModal} className="header__login-btn">
            Log in
          </button>
          <button onClick={openRegisterModal} className="header__register-btn">
            Sign Up
          </button>
        </div>
      ) : (
        <div className="header__logged-in-container">
          <button className="header__add-clothes-btn" onClick={handleAddClick}>
            + Add Clothes
          </button>

          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">
                {currentUser?.name || "User"}{" "}
                {/* Fallback to "User" if name is not available */}
              </p>

              {currentUser?.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="User Avatar"
                />
              ) : (
                generatePlaceholderAvatar(currentUser?.name) // Placeholder with first letter of user's name
              )}
            </div>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
