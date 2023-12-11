const weatherInfoDiv = document.getElementById("weather-info");
const weatherDescriptionP = document.getElementById("weather-description");
const temperatureP = document.getElementById("temperature");
const weatherIconImg = document.getElementById("weather-icon");

// Replace with the actual endpoint URL and query parameters as necessary
const weatherApiUrl = "https://api.weather.gov/gridpoints/XXX/YY/forecast"; // XXX and YY should be replaced with actual gridpoint values

function displayWeather(data) {
  if (
    data &&
    data.properties &&
    data.properties.periods &&
    data.properties.periods.length > 0
  ) {
    const currentWeather = data.properties.periods[0];
    weatherDescriptionP.textContent = currentWeather.shortForecast;
    temperatureP.textContent = `Temperature: ${currentWeather.temperature} ${currentWeather.temperatureUnit}`;
    weatherIconImg.src = currentWeather.icon;
    weatherIconImg.style.display = "block";
  } else {
    weatherDescriptionP.textContent = "Current weather conditions unavailable.";
    temperatureP.textContent = "";
    weatherIconImg.style.display = "none";
  }
}

function fetchWeather() {
  fetch(weatherApiUrl, {
    headers: {
      "User-Agent": "(myweatherapp.com, contact@myweatherapp.com)", // Replace with your User-Agent
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherDescriptionP.textContent = "Failed to load weather data.";
    });
}

document.addEventListener("DOMContentLoaded", fetchWeather);
