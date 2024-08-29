import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./ClothesSection.css";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
