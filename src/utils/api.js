const baseUrl = "http://localhost:3001";

// Utility function to check response status
function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// Generalized request function
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// Get Items API
function getItems() {
  return request(`${baseUrl}/items`);
}

// Add Items API
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

// Delete Items API
function deleteItems(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

export { deleteItems, addItems, getItems, checkResponse };
