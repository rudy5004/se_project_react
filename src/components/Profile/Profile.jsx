import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  openEditProfileModal,
  handleSignOut, // Add handleSignOut as a prop
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        {/* Pass openEditProfileModal and handleSignOut to SideBar */}
        <SideBar
          openEditProfileModal={openEditProfileModal}
          handleSignOut={handleSignOut} // Pass handleSignOut to SideBar
        />
      </section>

      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
