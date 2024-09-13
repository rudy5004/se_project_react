const baseUrl = "http://localhost:3001";
// Base URL for the API server. This is used as the root URL for all requests to the backend.

// Utility function to check response status
// This function checks if the HTTP response was successful (status 200-299).
// If successful, it returns the response in JSON format. If not, it rejects the promise with an error message.
function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// Generalized request function
// This function sends an HTTP request using the Fetch API.
// It accepts a URL and options (method, headers, body) and uses `checkResponse` to handle the response.
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// Get Items API
// Sends a GET request to retrieve a list of items from the backend.
// It calls the `request` function with the `/items` endpoint.
function getItems() {
  return request(`${baseUrl}/items`);
}

// Add Items API
// Sends a POST request to add a new item to the backend.
// It takes an object containing `name`, `imageUrl`, and `weather`, and sends it in the request body as JSON.
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
// Sends a DELETE request to remove an item by its ID.
// It constructs the URL with the item's ID and sends the request to delete the item.
function deleteItems(id) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

export { deleteItems, addItems, getItems, checkResponse };
