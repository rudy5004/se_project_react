import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isOpen,
  closeActiveModal,
  onRegister,
  openLoginModal,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    onRegister({ name, email, password })
      .then(() => {
        setName("");
        setEmail("");
        setPassword("");
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error registering:", error);
      })
      .finally(() => setIsSubmitting(false));
  };

  // Function to handle the third button click and open LoginModal
  const handleThirdAction = () => {
    closeActiveModal(); // Close the register modal
    openLoginModal(); // Open the login modal
  };

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      closeActiveModal={closeActiveModal}
      buttonText={isSubmitting ? "Signing Up..." : "Sign Up"}
      showThirdButton={true} // Show the third button
      thirdButtonText="or Log In" // Set the text for the third button
      onThirdAction={handleThirdAction} // Handler for the third button action
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
          required
        />
      </label>
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
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
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
