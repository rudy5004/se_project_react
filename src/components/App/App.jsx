import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import {
  deleteItems,
  addItems,
  getItems,
  getUser,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api"; // Added API functions for handling likes
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditPorfileModal"; // Fixing typo
import { signup, signin } from "../../utils/auth";
import { getToken, setToken, removeToken } from "../../utils/token"; // Import removeToken
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const openModal = (modalName) => setActiveModal(modalName);
  const closeActiveModal = () => setActiveModal("");

  const onCardClick = (card) => {
    setActiveModal("preview");
    setCardData(card);
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

  useEffect(() => {
    const token = getToken();
    if (token) {
      getUser(token)
        .then((data) => {
          setIsLoggedIn(true);
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error validating token:", error);
          setIsLoggedIn(false);
          setUserData(null);
        });
    }
  }, []);

  // Ensure the avatar updates correctly after login or registration
  useEffect(() => {
    if (userData && !userData.avatar && !userData.hasPlaceholderAvatar) {
      setUserData((prev) => ({
        ...prev,
        avatar: null,
        hasPlaceholderAvatar: true,
      }));
    }
  }, [userData]);

  const onAddItem = (name, link, weather) => {
    const inputValues = {
      name,
      imageUrl: link,
      weather,
    };
    return addItems(inputValues).then((newItem) => {
      setClothingItems([newItem, ...clothingItems]);
    });
  };

  const handleDelete = (card) => {
    return deleteItems(card._id).then(() => {
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== card._id)
      );
    });
  };

  const handleUpdateUser = ({ name, avatar }) => {
    return updateUser({ name, avatar })
      .then((updatedUser) => {
        setUserData(updatedUser);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  // Handle likes and dislikes for cards
  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const onRegister = ({ name, email, password, avatar }) => {
    return signup({ name, email, password, avatar })
      .then(() => signin({ email, password })) // Automatically sign in after registration
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setUserData(data.user);
          setIsLoggedIn(true);
          navigate("/profile");
        } else {
          console.error("Token not found in login response.");
        }
      })
      .catch((error) => {
        console.error("Error during registration/login:", error);
      });
  };

  const onLogin = ({ email, password }) => {
    return signin({ email, password })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setUserData(data.user);
          setIsLoggedIn(true);
          navigate("/profile");
        } else {
          console.error("Token not found in login response.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  // Handle sign out logic
  const handleSignOut = () => {
    removeToken(); // Remove token from local storage
    setIsLoggedIn(false); // Update logged in state
    setUserData(null); // Clear user data
    navigate("/"); // Redirect to home page
  };

  return (
    <CurrentUserContext.Provider value={userData}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={() => openModal("add-garment")}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              userData={userData}
              openLoginModal={() => openModal("login")}
              openRegisterModal={() => openModal("register")}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={onCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike} // Pass handleCardLike to Main
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={onCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={() => openModal("add-garment")}
                      openEditProfileModal={() => openModal("edit-profile")}
                      onCardLike={handleCardLike} // Pass handleCardLike to Profile
                      handleSignOut={handleSignOut} // Pass handleSignOut to Profile
                    />
                  </ProtectedRoute>
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
          <ItemModal
            handleDelete={handleDelete}
            cardData={cardData}
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "preview"}
          />
          <LoginModal
            closeActiveModal={closeActiveModal}
            onLogin={onLogin}
            isOpen={activeModal === "login"}
            openRegisterModal={() => openModal("register")} // Added this line to open Sign Up modal
          />
          <RegisterModal
            closeActiveModal={closeActiveModal}
            onRegister={onRegister}
            isOpen={activeModal === "register"}
            openLoginModal={() => openModal("login")} // Added this line to open Log In modal
          />
          <EditProfileModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
