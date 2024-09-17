import { getToken } from "./token"; // Import getToken to retrieve the JWT

export const baseUrl = "http://localhost:3001";

// Utility function to check response status
function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// Generalized request function with dynamic token handling
function request(url, options = {}) {
  const token = getToken(); // Get the token from localStorage
  if (token) {
    // Include Authorization header if token exists
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return fetch(url, options).then(checkResponse);
}

// Get Items API - No Authorization header needed
function getItems() {
  return request(`${baseUrl}/items`);
}

// Add Items API - Authorization required
function addItems({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
}

// Delete Items API - Authorization required
function deleteItems(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

// Get User API (for token validation)
function getUser() {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

// Update User API - Authorization required
function updateUser({ name, avatar }) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar }),
  });
}

// Add Like API - Authorization required
function addCardLike(id) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
  });
}

// Remove Like API - Authorization required
function removeCardLike(id) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
  });
}

export {
  deleteItems,
  addItems,
  getItems,
  getUser,
  updateUser,
  addCardLike, // Export addCardLike
  removeCardLike, // Export removeCardLike
  checkResponse,
};
