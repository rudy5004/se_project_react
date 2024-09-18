import "./ItemCard.css";
import likeButton from "../../assets/likeButton.svg";
import unlikeButton from "../../assets/unlikeButton.svg";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({
      id: item._id,
      isLiked: item.isLiked,
    });
  };

  return (
    <li className="card">
      {/* Wrap the h2 and button in a container */}
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>

        {/* Only show the like button if the user is logged in */}
        {isLoggedIn && (
          <button className="card__like-button" onClick={handleLike}>
            <img
              src={item.isLiked ? unlikeButton : likeButton}
              alt={item.isLiked ? "Unlike button" : "Like button"}
              className="card__like-button-image"
            />
          </button>
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
