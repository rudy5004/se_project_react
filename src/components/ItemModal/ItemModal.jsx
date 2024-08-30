import React, { useState } from "react";
import "./ItemModal.css";
import closeIconWhite from "../../assets/closeiconwhite.png";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleDelete = () => {
    setIsSubmitting(true);
    onDelete(card)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Error submitting form:", error); // Handle submission error
      })
      .finally(() => {
        setIsSubmitting(false); // Revert button text after the process is completed
      });
  };

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleDelete}
          type="button"
          className="modal__delete"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_type_image"
        >
          <img
            src={closeIconWhite}
            alt="Close Icon"
            className="modal__close-image"
          />
        </button>
        <img src={card.imageUrl} alt="card link" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
