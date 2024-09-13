// Importing the CSS file for styling the `WeatherCard` component.
import "./WeatherCard.css";

// Importing weather options and default weather options from constants.
// These provide the image URLs and data for various weather conditions.
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

// Importing `useContext` from React to access the current temperature unit context.
import { useContext } from "react";

// Importing `CurrentTemperatureUnitContext` to get the current temperature unit (Fahrenheit or Celsius).
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// Defining the `WeatherCard` component, which displays the current weather data in a card format.
// Props:
// - `weatherData`: An object containing weather information such as temperature, condition, and day/night status.
function WeatherCard({ weatherData }) {
  // Accessing the current temperature unit (F or C) from the context.
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Filtering the weather options to find the matching one based on the current weather condition and whether it's day or night.
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  // If no matching weather option is found, use the default weather option for day or night.
  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  // Displaying the temperature in the correct unit (Fahrenheit or Celsius) based on the current temperature unit.
  const displayTemp =
    currentTemperatureUnit === "F"
      ? `${weatherData.temp.F} °F`
      : `${weatherData.temp.C} °C`;

  return (
    <section className="weather-card">
      {/* Displaying the temperature */}
      <p className="weather-card__temp">{displayTemp}</p>

      {/* Displaying the corresponding weather image based on the weather condition and day/night status */}
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

// Exporting the `WeatherCard` component so it can be used in other parts of the application.
export default WeatherCard;
