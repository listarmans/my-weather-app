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

let today = document.querySelector("#date");
today.innerHTML = formatDate(now);

function formatTime(time) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Time: ${hours}:${minutes}`;
}
let time = document.querySelector("#time");
time.innerHTML = formatTime(now);

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  feelingTemperature = response.data.main.feels_like;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    celsiusTemperature
  )} °C`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#feeling").innerHTML = `Feels like ${Math.round(
    feelingTemperature)} °C`;
  document.querySelector("#humidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = 
  `<div class="col-2">
                <div class="future-time">
                 12:00
                </div>
                <img
                 src="https://ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png"
                 alt=""
                />
                <div class="weather-forecast-temperature">
                 <strong>16</strong> 15
                </div>
            </div>`
}

function searchCity(city) {
  let apiKey = "06ca6b2e6fb5a01a965d59c5f70dc4cc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
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

function showFahrenheitTemperature(event){
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = `${Math.round(fahrenheitTemperature)} °F`;
  let fahrenheitFeelingTemperature = (feelingTemperature * 9) / 5 + 32;
  document.querySelector("#feeling").innerHTML = `Feels like ${Math.round(fahrenheitFeelingTemperature)} °F`;
}

function showCelsiusTemperature(event){
   document.querySelector("#temperature").innerHTML = `${Math.round(
    celsiusTemperature
  )} °C`;
  document.querySelector("#feeling").innerHTML = `Feels like ${Math.round(
    feelingTemperature)} °C`;
}

let celsiusTemperature = null;
let feelingTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemperature);

let celsius = document.querySelector("#celsius");
celcius.addEventListener("click", showCelsiusTemperature);