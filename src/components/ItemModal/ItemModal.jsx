import React, { useState, useEffect, useContext } from "react";
import "./ItemModal.css";
import closeIconWhite from "../../assets/closeiconwhite.png";
import CurrentUserContext from "../../contexts/CurrentUserContext"; // Import CurrentUserContext

function ItemModal({ isOpen, closeActiveModal, cardData, handleDelete }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUser = useContext(CurrentUserContext); // Subscribe to CurrentUserContext

  useEffect(() => {
    if (isOpen) {
      console.log("Modal opened with cardData:", cardData);
    }
  }, [cardData, isOpen]);

  // Check if the current user is the owner of the card
  const isOwn = cardData.owner === currentUser?._id;

  // Create a class for the delete button based on ownership
  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

  const handleDeleteItem = () => {
    setIsSubmitting(true);
    handleDelete(cardData)
      .then(() => {
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        {isOwn && ( // Conditionally render the delete button if the user owns the item
          <button
            onClick={handleDeleteItem}
            type="button"
            className={itemDeleteButtonClassName}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Deleting..." : "Delete"}
          </button>
        )}

        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close modal__close_type_image"
        >
          <img
            src={closeIconWhite}
            alt="Close Icon"
            className="modal__close-image"
          />
        </button>

        <img
          src={cardData.imageUrl}
          alt={cardData.name}
          className="modal__image"
        />

        <div className="modal__footer">
          <h2 className="modal__caption">{cardData.name}</h2>
          <p className="modal__weather">Weather: {cardData.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
