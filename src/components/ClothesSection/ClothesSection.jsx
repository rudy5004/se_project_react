import React, { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./ClothesSection.css";
import CurrentUserContext from "../../contexts/CurrentUserContext"; // Import the context

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext); // Get current user data from context

  // Make sure currentUser exists before trying to access _id
  const userClothingItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

  return (
    <div className="clothes-section">
      <div className="clothes-section__items-button">
        <p className="clothes-section__item">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__button"
        >
          + Add new
        </button>
      </div>

      <ul className="cards__list clothes-section__cards-list">
        {userClothingItems.length > 0 ? (
          userClothingItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          ))
        ) : (
          <p className="clothes-section__no-items">No items to display.</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
