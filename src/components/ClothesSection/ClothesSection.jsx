// Importing the default clothing items from the constants file.
// This provides a default list of clothing items to be used if necessary.
import { defaultClothingItems } from "../../utils/constants.js";

// Importing the `ItemCard` component, which renders individual clothing items as cards.
import ItemCard from "../ItemCard/ItemCard.jsx";

// Importing the CSS file for styling the ClothesSection component.
import "./ClothesSection.css";

// Defining the `ClothesSection` component, which renders the section that displays clothing items.
// Props:
// - `onCardClick`: A function to handle when a card (clothing item) is clicked.
// - `clothingItems`: An array of clothing items to be displayed.
// - `handleAddClick`: A function to handle when the "Add new" button is clicked.
function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="clothes-section">
      {/* Header section with the "Your items" label and "Add new" button */}
      <div className="clothes-section__items-button">
        <p className="clothes-section__item">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__button"
        >
          + Add new {/* Button to trigger adding a new item */}
        </button>
      </div>

      {/* Rendering the list of clothing item cards */}
      <ul className="cards__list clothes-section__cards-list">
        {clothingItems.map((item) => {
          return (
            // Rendering each item using the `ItemCard` component.
            // Each item is passed as a prop to `ItemCard`, and the card's key is set to the item's unique ID.
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
