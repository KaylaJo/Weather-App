let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = (`0` + now.getMinutes()).slice(-2);

let currentTime = document.querySelector("span.time");
currentTime.innerHTML = `${day} ${hours} : ${minutes}`;



function getTemp(response) {
  let citySearch = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${citySearch}`;
  let weather = response.data.weather[0].main;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${weather}`;
  let humidity = response.data.main.humidity;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `Humidity: ${humidity} %`;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".windSpeed");
  windSpeed.innerHTML = `Wind Speed: ${wind} mph `;
  temperature = response.data.main.temp;
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${Math.round(temperature)}°`;
  let nightTemp = Math.round(response.data.main.temp_min);
  let tonightTemp = document.querySelector(".tonightTemp");
  tonightTemp.innerHTML = `${nightTemp}°`;

}


function search(city) {
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(getTemp);
}

function enterCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search");
  let city = input.value;

  search(city);
}

let typeCity = document.querySelector("#search-form");
typeCity.addEventListener("submit", enterCity);

function findLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(getTemp);
}
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(findLocation);
}

let button = document.querySelector(".locationButton");
button.addEventListener("click", getCurrentLocation);


function convertCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let h5 = document.querySelector("h5");
  let celsiusTemp = Math.round((temperature - 32) / 1.8);
  h5.innerHTML = `${celsiusTemp}°`;
}

function convertFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let h5 = document.querySelector("h5");
  let FahrenheitTemp = Math.round(temperature);
  h5.innerHTML = `${FahrenheitTemp}°`;
}

let temperature = null;

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);

search("Chicago");





