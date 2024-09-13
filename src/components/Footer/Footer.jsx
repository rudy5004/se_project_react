// Importing the CSS file for styling the Footer component.
import "./Footer.css";

// Defining the `Footer` component, which renders the footer section of the page.
// This component displays the developer's name and the current year.
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Displaying the developer's name */}
        <p className="footer_left-text">Developed by Clay Schurwon</p>

        {/* Displaying the current year */}
        <p className="footer_right-text">2024</p>
      </div>
    </footer>
  );
}

// Exporting the `Footer` component so it can be used in other parts of the application.
export default Footer;
