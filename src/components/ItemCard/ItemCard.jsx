// Importing the CSS file for styling the `ItemCard` component.
import "./ItemCard.css";

// Defining the `ItemCard` component, which renders an individual clothing item as a card.
// Props:
// - `item`: An object representing a clothing item (name, imageUrl, etc.).
// - `onCardClick`: A function to handle the event when the card is clicked.
function ItemCard({ item, onCardClick }) {
  // Handling the click event on the card image.
  // When the image is clicked, it triggers the `onCardClick` function and passes the clicked item as an argument.
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      {/* Displaying the item's name as the card title */}
      <h2 className="card__name">{item.name}</h2>

      {/* Displaying the item's image and handling click events on the image */}
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

// Exporting the `ItemCard` component so it can be used in other parts of the application.
export default ItemCard;
