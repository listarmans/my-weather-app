function formatDate(timestamp) {
  let date = new Date(timestamp);
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

  let currentDay = weekDay[date.getDay()];
  let currentMonth = month[date.getMonth()];
  let currentYear = date.getFullYear();
  let currentDate = date.getDate();

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;

  return formattedDate;
}

function formatTime(timestamp){
  let time = new Date (timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}


function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  feelingTemperature = response.data.main.feels_like;
  let dateElement = document.querySelector("#date");
  let timeElement = document.querySelector("#time");
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
  document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  timeElement.innerHTML = `Time: ${formatTime(response.data.dt * 1000)}`;
}


function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++){
    forecast = response.data.list[index];
    forecastElement.innerHTML += 
      `<div class="col-2">
       <div class="future-time">
          ${formatTime(forecast.dt * 1000)}
       </div>
        <img
          src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
          alt=""
          />
        <div class="weather-forecast-temperature">
          <strong>${Math.round(forecast.main.temp_max)}</strong> | ${Math.round(forecast.main.temp_min)}°C
       </div>
     </div>
     `;}
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

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
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