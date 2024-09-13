import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ onAddItem, isOpen, closeActiveModal }) => {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle form submission.
  // It prevents the default form behavior, starts the submission process, and resets the form after success.
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set the submission status to true.

    onAddItem(name, link, weather)
      .then(() => {
        setName(""); // Resets the name input field.
        setLink(""); // Resets the link input field.
        setWeather(""); // Resets the weather radio buttons.
        closeActiveModal(); // Closes the modal after successful submission.
      })
      .catch((error) => {
        console.error("Error submitting form:", error); // Handles form submission errors.
      })
      .finally(() => {
        setIsSubmitting(false); // Resets the submission status.
      });
  };

  // Rendering the modal with the form, passing relevant props like title, button text, and form submission handler.
  return (
    <ModalWithForm
      buttonText={isSubmitting ? "Submitting..." : "Add garment"} // Changes the button text based on the submission status.
      title="New garment"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onAddItem={onAddItem}
      onSubmit={handleSubmit} // Handle form submission.
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange} // Updates the name as the user types.
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
          onChange={handleUrlChange} // Updates the link as the user types.
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
            onChange={handleWeatherChange} // Updates the weather when "Hot" is selected.
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
            onChange={handleWeatherChange} // Updates the weather when "Warm" is selected.
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
            onChange={handleWeatherChange} // Updates the weather when "Cold" is selected.
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
