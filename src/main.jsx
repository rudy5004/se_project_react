// Importing the `React` library, which is the core library used to build user interfaces with components in React.
import React from "react";

// Importing `ReactDOM`, which provides methods to interact with the DOM and render React components into the DOM.
import ReactDOM from "react-dom/client";

// Importing `BrowserRouter` from `react-router-dom`, which is used to enable client-side routing in the app.
// The `BrowserRouter` component wraps the entire app and handles URL routing, allowing navigation between different components without reloading the page.
import { BrowserRouter } from "react-router-dom";

// Importing the `App` component, which is the root component of the application.
// This component contains the overall structure of the app, including routes, UI elements, and other components.
import App from "./components/App/App.jsx";

// Importing the main CSS file (`index.css`) to apply global styles to the application.
import "./index.css";

// Using `ReactDOM.createRoot` to create a root React DOM node.
// This method is part of React's concurrent rendering system, which improves performance and allows for better control over rendering.
// The `document.getElementById("root")` selects the root DOM element where the React app will be mounted.
// Wrapping the entire app inside `React.StrictMode`, a tool for highlighting potential issues in an application.
// It helps with identifying unsafe lifecycle methods, deprecated APIs, and side effects in the app.
// Wrapping the app with `BrowserRouter` to enable client-side routing.
// The `basename` attribute specifies the base URL for all routes, which in this case is "/se_project_react/".
// This ensures that the app routes correctly when deployed to a subdirectory of a website.
// Rendering the `App` component, which serves as the root component of the entire React application.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/se_project_react/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
