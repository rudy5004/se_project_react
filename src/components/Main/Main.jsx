// Importing `useContext` from React to access the current temperature unit from context.
import { useContext } from "react";

// Importing the CSS file for styling the `Main` component.
import "./Main.css";

// Importing the `WeatherCard` component, which displays weather-related information.
import WeatherCard from "../WeatherCard/WeatherCard";

// Importing the `ItemCard` component, which renders individual clothing items as cards.
import ItemCard from "../ItemCard/ItemCard";

// Importing the `CurrentTemperatureUnitContext` to get the current temperature unit (Fahrenheit or Celsius).
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// Defining the `Main` component, which renders the main content of the page.
// Props:
// - `weatherData`: An object containing weather information (temperature, type, city).
// - `onCardClick`: A function to handle when a clothing item card is clicked.
// - `clothingItems`: An array of clothing items to be displayed based on the current weather.
function Main({ weatherData, onCardClick, clothingItems }) {
  // Using the `useContext` hook to access the current temperature unit (F or C) from the context.
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Setting the temperature to either Fahrenheit or Celsius based on the current temperature unit.
  const temperature =
    currentTemperatureUnit === "F"
      ? `${weatherData.temp.F} ° F`
      : `${weatherData.temp.C} ° C`;

  return (
    <main>
      {/* Displaying the weather information using the `WeatherCard` component */}
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        {/* Displaying a message with the current temperature and clothing recommendation */}
        <p className="cards__text">
          Today is {temperature} / You may want to wear:
        </p>

        {/* Rendering a list of clothing items that match the current weather */}
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type; // Filtering items based on the current weather type.
            })
            .map((item) => {
              return (
                // Rendering each clothing item as an `ItemCard` component.
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick} // Handling card click events.
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

// Exporting the `Main` component so it can be used in other parts of the application.
export default Main;
