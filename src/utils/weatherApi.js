// Importing the `checkResponse` function from `../utils/api`.
// This function is used to handle the response from the weather API, typically checking if the response is successful or handling any errors.
import { checkResponse } from "../utils/api";

// Exporting the `getWeather` function, which retrieves the current weather data from the OpenWeather API.
// The function takes the user's geographical coordinates (latitude and longitude) and the API key as parameters.
// It sends a request to the OpenWeather API using the Fetch API and uses the `checkResponse` function to handle the response.
export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
`).then(checkResponse);
};

// Exporting the `filterWeatherData` function, which processes and filters the raw weather data from the API response.
// It creates an object that contains:
// - `city`: The name of the city where the weather data was collected.
// - `temp`: An object with the temperature in Fahrenheit (`F`) and Celsius (`C`), rounded to the nearest whole number.
// - `type`: A label for the type of weather (hot, warm, or cold), determined by the temperature.
// - `condition`: A string representing the main weather condition (e.g., clear, cloudy), converted to lowercase.
// - `isDay`: A boolean indicating whether it's currently daytime based on the sunrise and sunset times.
export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9), // Converts Fahrenheit to Celsius.
  };
  result.type = getWeatherType(result.temp.F); // Determines the weather type based on the Fahrenheit temperature.
  result.condition = data.weather[0].main.toLowerCase(); // Converts the main weather condition to lowercase.
  result.isDay = isDay(data.sys, Date.now()); // Checks if it's currently daytime based on the sunrise and sunset times.
  return result;
};

// A helper function `isDay` that determines whether it's currently daytime.
// It takes the sunrise and sunset times (in Unix timestamp format) and the current time (`now` in milliseconds).
// The function returns `true` if the current time is between sunrise and sunset, indicating daytime.
const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

// A helper function `getWeatherType` that categorizes the temperature into a weather type (hot, warm, or cold).
// - If the temperature is 86°F or above, it's classified as "hot".
// - If the temperature is between 66°F and 85°F, it's classified as "warm".
// - If the temperature is below 66°F, it's classified as "cold".
const getWeatherType = ({ temperature }) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
