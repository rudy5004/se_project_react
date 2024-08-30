import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ onAddItem, isOpen, onClose }) => {
  // State hooks for managing input values
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [link, setLink] = useState("");
  const handleUrlChange = (e) => {
    setLink(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  // State hook for managing submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    // The following block should be inside the handleSubmit function
    onAddItem(name, link, weather)
      .then(() => {
        setName(""); // Reset name field
        setLink(""); // Reset link field
        setWeather(""); // Reset weather selection
        onClose(); // Close the modal only after a successful response
      })
      .catch((error) => {
        console.error("Error submitting form:", error); // Handle submission error
      })
      .finally(() => {
        setIsSubmitting(false); // Revert button text after the process is completed
      });
  };

  // Render the modal with form
  return (
    <ModalWithForm
      buttonText={isSubmitting ? "Submitting..." : "Add garment"}
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onAddItem={onAddItem}
      onSubmit={handleSubmit} // Pass handleSubmit function to the form
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={link}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            className="modal__radio modal__radio_type_radio"
            onChange={handleWeatherChange}
          />
          Hot
        </label>
        <label
          htmlFor="warm"
          className="modal__label modal__label_type_radio"
          name="weather"
        >
          <input
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            className="modal__radio modal__radio_type_radio"
            onChange={handleWeatherChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            className="modal__radio modal__radio_type_radio"
            onChange={handleWeatherChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
