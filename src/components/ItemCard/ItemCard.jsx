import "./ItemCard.css";

// Defining the `ItemCard` component, which renders an individual clothing item as a card.
// Props:
// - `item`: An object representing a clothing item (name, imageUrl, etc.).
// - `onCardClick`: A function to handle the event when the card is clicked.
// - `onCardLike`: A function to handle the event when the like button is clicked.
function ItemCard({ item, onCardClick, onCardLike }) {
  // Handling the click event on the card image.
  // When the image is clicked, it triggers the `onCardClick` function and passes the clicked item as an argument.
  const handleCardClick = () => {
    onCardClick(item);
  };

  // Handling the like button click event.
  // It triggers the `onCardLike` function and passes the item data (id and isLiked status).
  const handleLike = () => {
    onCardLike({
      id: item._id,
      isLiked: item.isLiked, // Assuming `isLiked` is a boolean indicating if the item is liked
    });
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

      {/* Adding a like button that toggles the like status */}
      <button className="card__like-button" onClick={handleLike}>
        {item.isLiked ? "Unlike" : "Like"}
      </button>
    </li>
  );
}

// Exporting the `ItemCard` component so it can be used in other parts of the application.
export default ItemCard;
