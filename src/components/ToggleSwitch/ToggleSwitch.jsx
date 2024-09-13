// Importing `React` to create a functional component.
import React from "react";

// Importing `useState` and `useContext` from React to manage state and access the context for the temperature unit.
import { useState, useContext } from "react";

// Importing the CSS file for styling the `ToggleSwitch` component.
import "./ToggleSwitch.css";

// Importing the `CurrentTemperatureUnitContext` to access the current temperature unit (Fahrenheit or Celsius) and the function to toggle the unit.
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// Defining the `ToggleSwitch` component, which allows users to toggle between Fahrenheit (F) and Celsius (C).
const ToggleSwitch = () => {
  // Using the `useContext` hook to access the current temperature unit and the function to toggle between units.
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="switch">
      {/* The checkbox input triggers the `handleToggleSwitchChange` function when the switch is toggled */}
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />

      {/* The slider element visually represents the current unit (F or C) based on the state */}
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>

      {/* Displaying the Fahrenheit label and highlighting it if the current unit is "F" */}
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>

      {/* Displaying the Celsius label and highlighting it if the current unit is "C" */}
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

// Exporting the `ToggleSwitch` component so it can be used in other parts of the application.
export default ToggleSwitch;
