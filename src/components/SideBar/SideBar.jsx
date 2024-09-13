// Importing the CSS file for styling the `SideBar` component.
import "./SideBar.css";

// Importing the user's avatar image to be displayed in the sidebar.
import avatar from "../../assets/avatar.png";

// Defining the `SideBar` component, which renders the sidebar section of the page.
// This component displays the user's avatar and username.
function SideBar() {
  return (
    <div className="sidebar">
      {/* Displaying the user's avatar image */}
      <img src={avatar} alt="Default avatar" className="sidebar__avatar" />

      {/* Displaying the user's name */}
      <p className="sidebar__username">Terrance Tegegne</p>
    </div>
  );
}

// Exporting the `SideBar` component so it can be used in other parts of the application.
export default SideBar;
