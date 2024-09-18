import React, { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ openEditProfileModal, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const generatePlaceholderAvatar = (name) => {
    const firstLetter = name ? name.charAt(0).toUpperCase() : "?";
    return <div className="sidebar__avatar-placeholder">{firstLetter}</div>;
  };

  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="User avatar"
            className="sidebar__avatar"
          />
        ) : (
          generatePlaceholderAvatar(currentUser?.name)
        )}
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>
      <button onClick={openEditProfileModal} className="sidebar__edit-button">
        Change Profile Data
      </button>
      <button onClick={handleSignOut} className="sidebar__signout-button">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
