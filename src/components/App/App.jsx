import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer/";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { deleteItems, addItems, getItems } from "../../utils/api";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal"; // Import the RegisterModal

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [cardData, setCardData] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const onCardClick = (card) => {
    setActiveModal("preview");
    setCardData(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  // Function to open LoginModal --- > Incorporate into header later
  const openLoginModal = () => {
    setActiveModal("login");
  };

  // Function to open RegisterModal --- > Incorporate into header later
  const openRegisterModal = () => {
    setActiveModal("register");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
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

  // Function to simulate login
  function onLogin({ email, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "user@example.com" && password === "password123") {
          console.log("User logged in");
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  }

  // Function to simulate registration
  function onRegister({ name, email, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "newuser@example.com") {
          console.log("User registered successfully");
          resolve();
        } else {
          reject(new Error("Error registering user"));
        }
      }, 1000);
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
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
        />
        {activeModal === "preview" && (
          <ItemModal
            handleDelete={handleDelete}
            cardData={cardData}
            closeActiveModal={closeActiveModal}
          />
        )}
        {activeModal === "login" && (
          <LoginModal
            closeActiveModal={closeActiveModal}
            onLogin={onLogin}
            isOpen={activeModal === "login"}
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            closeActiveModal={closeActiveModal}
            onRegister={onRegister}
            isOpen={activeModal === "register"}
          />
        )}
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
