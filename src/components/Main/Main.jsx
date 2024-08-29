import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

//import { defaultClothingItems } from "../../utils/constants.js";

function Main({ weatherData, onCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature =
    currentTemperatureUnit === "F"
      ? `${weatherData.temp.F} ° F`
      : `${weatherData.temp.C} ° C`;
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {temperature} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            // .filter((item) => {
            // return item.weather === weatherData.type;
            //  })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
//<div className="main"></div>;
//<ItemCard />
//<ModalWithForm />
//<ItemModal />
// <WeatherCard />
