import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ onRegister, isOpen, closeActiveModal }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    onRegister({ name, email, password })
      .then(() => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error registering:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <ModalWithForm
      buttonText={isSubmitting ? "Registering..." : "Register"}
      title="Register"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
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
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <label htmlfor="confirmPassword" className="modal__label">
        Confirm Password
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
