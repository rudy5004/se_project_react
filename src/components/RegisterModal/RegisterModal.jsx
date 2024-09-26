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
  const [avatar, setAvatar] = useState(""); // State for the optional avatar field
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

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value); // Update avatar state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    onRegister({ name, email, password, avatar }) // Pass the avatar field to the onRegister function
      .then(() => {
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(""); // Reset the avatar field
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
      <label htmlFor="registerModalName" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="registerModalName"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="registerEmail" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="registerEmail"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="registerPassword" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="registerPassword"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
      <label htmlFor="avatarOptional" className="modal__label">
        Avatar
        <input
          type="text"
          className="modal__input"
          id="avatarOptional"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
