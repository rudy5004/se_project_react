// Importing `React` and `useState` to manage component state and handle form submission status.
import React, { useState } from "react";

// Importing the CSS file for styling the `ItemModal` component.
import "./ItemModal.css";

// Importing the close icon image, which is used in the modal to allow the user to close it.
import closeIconWhite from "../../assets/closeiconwhite.png";

// Defining the `ItemModal` component, which renders a modal displaying detailed information about a selected clothing item.
// Props:
// - `activeModal`: A string indicating which modal is currently open.
// - `closeActiveModal`: A function to close the modal.
// - `cardData`: An object representing the selected clothing item (name, imageUrl, etc.).
// - `handleDelete`: A function to handle the deletion of the selected clothing item.
function ItemModal({ activeModal, closeActiveModal, cardData, handleDelete }) {
  // State to manage the submission status when deleting an item.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle the deletion of the selected card (clothing item).
  // It sets the submission state to true while the deletion is in progress and reverts after completion.
  const handleDeleteItem = () => {
    setIsSubmitting(true);
    handleDelete(cardData)
      .then(() => {
        closeActiveModal(); // Close the modal after successful deletion.
      })
      .catch((error) => {
        console.error("Error submitting form:", error); // Handle any error that occurs during deletion.
      })
      .finally(() => {
        setIsSubmitting(false); // Revert the submission state once the process is completed.
      });
  };

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        {/* Button to delete the current item */}
        <button
          onClick={handleDeleteItem}
          type="button"
          className="modal__delete"
          disabled={isSubmitting} // Disable the button while the deletion is in progress.
        >
          {isSubmitting ? "Deleting..." : "Delete"}{" "}
          {/* Show appropriate text based on submission status */}
        </button>

        {/* Button to close the modal */}
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

        {/* Displaying the image of the selected clothing item */}
        <img
          src={cardData.imageUrl}
          alt="cardData link"
          className="modal__image"
        />

        {/* Footer section of the modal containing the name and weather type of the item */}
        <div className="modal__footer">
          <h2 className="modal__caption">{cardData.name}</h2>
          <p className="modal__weather">Weather: {cardData.weather}</p>
        </div>
      </div>
    </div>
  );
}

// Exporting the `ItemModal` component so it can be used in other parts of the application.
export default ItemModal;
