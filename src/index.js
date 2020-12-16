let now = new Date();

function formatDate(date) {
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let currentDay = weekDay[now.getDay()];
  let currentMonth = month[now.getMonth()];
  let currentYear = now.getFullYear();
  let currentDate = now.getDate();

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

  return formattedDate;
}

document.querySelector("#date").innerHTML = formatDate(now);

function formatTime(time) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
document.querySelector("#time").innerHTML = formatTime(now);

////////
function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feeling").innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )} °C`;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
}

function searchCity(city) {
  let apiKey = "06ca6b2e6fb5a01a965d59c5f70dc4cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "06ca6b2e6fb5a01a965d59c5f70dc4cc";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function localWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocalization = document.querySelector("#my-location");
currentLocalization.addEventListener("click", localWeather);
searchCity("Amsterdam");

function toFahrenheit() {
  let celcius = 14;
  let fahrenheit = (celcius * 9) / 5 + 32;
  celcius = fahrenheit;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${celcius}°F`;
}
let currentTemperature = document.querySelector("#fahrenheit");
currentTemperature.addEventListener("click", toFahrenheit);

function toCelcius() {
  let celcius = 14;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${celcius}°C`;
}

let backToCelcius = document.querySelector("#celcius");
backToCelcius.addEventListener("click", toCelcius);
