import { checkResponse } from "./api"; // Import checkResponse from api.js
import { baseUrl } from "./constants";

// Function to handle user signup
export const signup = ({ name, email, password, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, avatar }),
  }).then(checkResponse); // Use checkResponse to handle the API response
};

// Function to handle user signin
export const signin = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse); // Use checkResponse to handle the API response
};
