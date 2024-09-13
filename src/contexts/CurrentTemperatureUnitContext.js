// Importing the `React` library to use React features such as creating contexts.
import React from "react";

// Creating a context for managing the current temperature unit (e.g., Fahrenheit or Celsius).
// The default value for the context includes:
// - `currentTemperatureUnit`: A string to store the current unit (default is an empty string).
// - `handleToggleSwitchChange`: A function to handle changes when toggling between temperature units (default is an empty function).
const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "",
  handleToggleSwitchChange: () => {},
});

// Exporting the `CurrentTemperatureUnitContext` so it can be used by other components
// to access and modify the current temperature unit across the app.
export default CurrentTemperatureUnitContext;
