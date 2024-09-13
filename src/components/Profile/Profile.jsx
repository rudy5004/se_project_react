// Importing the CSS file for styling the `Profile` component.
import "./Profile.css";

// Importing the user's avatar image to be used in the profile.
import avatar from "../../assets/avatar.png";

// Importing the `SideBar` component, which displays a sidebar in the profile.
import SideBar from "../SideBar/SideBar";

// Importing the `ClothesSection` component, which renders the section showing the user's clothing items.
import ClothesSection from "../ClothesSection/ClothesSection";

// Defining the `Profile` component, which renders the user's profile page.
// Props:
// - `onCardClick`: A function to handle the event when a clothing item card is clicked.
// - `clothingItems`: An array of clothing items to be displayed in the profile.
// - `handleAddClick`: A function to handle the event when the "Add new" button is clicked.
function Profile({ onCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="profile">
      {/* Sidebar section for user navigation and additional options */}
      <section className="profile__sidebar">
        <SideBar />
      </section>

      {/* Section displaying the user's clothing items using the `ClothesSection` component */}
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick} // Handling click event for adding new clothing items.
        />
      </section>
    </div>
  );
}

// Exporting the `Profile` component so it can be used in other parts of the application.
export default Profile;
