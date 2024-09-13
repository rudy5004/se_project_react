// Importing the CSS file for styling the `ModalWithForm` component.
import "./ModalWithForm.css";

// Importing the close icon image, which is used to close the modal when clicked.
import closeIcon from "../../assets/closeicon.svg";

// Defining the `ModalWithForm` component, which renders a modal with a form inside it.
// Props:
// - `children`: The content inside the form, passed as child components.
// - `buttonText`: The text displayed on the form's submit button.
// - `title`: The title of the modal.
// - `isOpen`: A boolean that determines if the modal is open or closed.
// - `closeActiveModal`: A function to close the modal.
// - `onSubmit`: A function that handles form submission.
function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  closeActiveModal,
  onSubmit,
}) {
  return (
    // Conditionally applying the "modal_opened" class to open or close the modal.
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        {/* Displaying the modal title */}
        <h2 className="modal__title">{title}</h2>

        {/* Button to close the modal */}
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

        {/* The form inside the modal, which executes `onSubmit` when submitted */}
        <form onSubmit={onSubmit} className="modal__form">
          {/* Rendering the children components inside the form */}
          {children}

          {/* Submit button with dynamic text based on `buttonText` prop */}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

// Exporting the `ModalWithForm` component so it can be used in other parts of the application.
export default ModalWithForm;
