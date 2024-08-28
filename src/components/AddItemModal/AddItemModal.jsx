import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ onAddItem, isOpen, onClose }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(name, link, weather);
  };

  ///replaced
  ///onSubmit={handleSubmit}
  ///with
  /// onAddItem={onAddItem}
  return (
    <ModalWithForm
      buttonText="Add garmet"
      title="New garmet"
      isOpen={isOpen}
      onClose={onClose}
      onAddItem={onAddItem}
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
