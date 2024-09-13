// Importing `useState` and `useEffect` from React to manage component state and handle side effects in the application.
import { useState, useEffect } from "react";

// Importing `Routes` and `Route` from `react-router-dom` to define client-side routing for different pages in the app.
import { Routes, Route } from "react-router-dom";

// Importing the global CSS file for styling the app.
import "./App.css";

// Importing `coordinates` and `APIkey` constants, which are used to fetch weather data for a specific location.
import { coordinates, APIkey } from "../../utils/constants";

// Importing the `Header` component, which displays the header of the application, including weather data and navigation.
import Header from "../Header/Header";

// Importing the `Main` component, which is the main content area displaying weather info and clothing items.
import Main from "../Main/Main";

// Importing the `ModalWithForm` component, which renders a modal with a form for adding or editing items.
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// Importing the `Footer` component, which displays the footer section of the application.
import Footer from "../Footer/Footer/";

// Importing the `ItemModal` component, which displays a modal for previewing or deleting an item.
import ItemModal from "../ItemModal/ItemModal";

// Importing the `getWeather` and `filterWeatherData` functions to fetch and process weather data from the OpenWeather API.
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

// Importing the `CurrentTemperatureUnitContext` to manage the current temperature unit (Fahrenheit or Celsius) across the app.
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// Importing the `AddItemModal` component, which provides a modal for adding a new clothing item.
import AddItemModal from "../AddItemModal/AddItemModal";

// Importing the `Profile` component, which displays the user's profile page with their clothing items.
import Profile from "../Profile/Profile";

// Importing API functions (`deleteItems`, `addItems`, `getItems`) to manage CRUD operations for clothing items.
import { deleteItems, addItems, getItems } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const onCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garmet");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  function onAddItem(name, link, weather) {
    const inputValues = {
      name: name,
      imageUrl: link,
      weather: weather,
    };
    return addItems(inputValues).then((inputValues) => {
      setClothingItems([inputValues, ...clothingItems]);
    });
  }

  function handleDelete(card) {
    return deleteItems(card._id).then(() => {
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== card._id)
      );
    });
  }

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={onCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={onCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garmet"}
          onAddItem={onAddItem}
        />
        {activeModal === "preview" && (
          <ItemModal
            onDelete={handleDelete}
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
          />
          {activeModal === "login" && (
            <LoginModal 
            closeModal={closeActiveModal} 
            onLogin={handleLogin} 
            />
        )}
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
