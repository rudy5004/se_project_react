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
} from "../../utils/api";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditPorfileModal"; // Fixing typo
import { signup, signin } from "../../utils/auth";
import { getToken, setToken, removeToken } from "../../utils/token";
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

  // Fetch items and include the `isLiked` status for each item
  useEffect(() => {
    const token = getToken();
    getItems()
      .then((data) => {
        const itemsWithLikeStatus = data.map((item) => {
          return {
            ...item,
            isLiked: item.likes.includes(userData?._id), // Check if the current user has liked the item
          };
        });
        setClothingItems(itemsWithLikeStatus.reverse());
      })
      .catch(console.error);
  }, [userData]);

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
    const apiCall = !isLiked ? addCardLike : removeCardLike;

    apiCall(id, token)
      .then(() => {
        setClothingItems((cards) =>
          cards.map((item) => {
            if (item._id === id) {
              return {
                ...item,
                isLiked: !isLiked, // Toggle isLiked
                likes: isLiked
                  ? item.likes.filter((userId) => userId !== userData._id)
                  : [...item.likes, userData._id], // Update the likes array accordingly
              };
            }
            return item;
          })
        );
      })
      .catch((err) => console.error("Error updating like status:", err));
  };

  const onRegister = ({ name, email, password, avatar }) => {
    return signup({ name, email, password, avatar })
      .then(() => signin({ email, password })) // Automatically sign in after registration
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setUserData({
            name: data.name,
            avatar: data.avatar,
            _id: data._id,
            email: data.email,
          });
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
          setUserData({
            name: data.name,
            avatar: data.avatar,
            _id: data._id,
            email: data.email,
          });
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

  const handleSignOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/");
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
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
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
            openRegisterModal={() => openModal("register")}
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
