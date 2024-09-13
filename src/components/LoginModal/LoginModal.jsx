import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, closeActiveModal, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    onLogin({ email, password })
      .then(() => {
        setEmail("");
        setPassword("");
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <ModalWithForm
      title="Login"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      closeActiveModal={closeActiveModal}
      buttonText={isSubmitting ? "Logging in..." : "Login"}
    >
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

export default LoginModal;
