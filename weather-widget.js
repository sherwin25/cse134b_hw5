document.addEventListener("DOMContentLoaded", function () {
  const weatherConditions = document.getElementById("weather-conditions");
  const weatherTemperature = document.getElementById("weather-temperature");
  const weatherIcon = document.getElementById("weather-icon");

  const latitude = "32.7157";
  const longitude = "-117.1611";
  const endpoint = `https://api.weather.gov/points/${latitude},${longitude}`;

  fetch(endpoint, {
    headers: {
      "User-Agent": "myweatherapp.com, contact@myweatherapp.com",
      Accept: "application/geo+json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const forecastUrl = data.properties.forecast;
      return fetch(forecastUrl, {
        headers: {
          "User-Agent": "myweatherapp.com, contact@myweatherapp.com",
        },
      });
    })
    .then((response) => response.json())
    .then((data) => {
      const forecast = data.properties.periods[0];
      weatherConditions.textContent = forecast.shortForecast;
      weatherTemperature.textContent = `${forecast.temperature} ${forecast.temperatureUnit}`;
      weatherIcon.src = forecast.icon;
      weatherIcon.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherConditions.textContent = "Current Weather Conditions Unavailable";
    });
});
