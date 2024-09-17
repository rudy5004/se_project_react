import "./ModalWithForm.css";
import closeIcon from "../../assets/closeicon.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  closeActiveModal,
  onSubmit,
  showSecondaryButton,
  onSecondaryAction,
  secondaryButtonText,
  showThirdButton,
  onThirdAction,
  thirdButtonText,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img
            src={closeIcon}
            alt="Close Icon"
            className="modal__close-image"
          />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__button-group">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {showSecondaryButton && (
              <button
                type="button"
                className="modal__secondary-button"
                onClick={onSecondaryAction}
              >
                {secondaryButtonText}
              </button>
            )}
            {showThirdButton && (
              <button
                type="button"
                className="modal__third-button"
                onClick={onThirdAction}
              >
                {thirdButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
