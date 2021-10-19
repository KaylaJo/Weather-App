function findDate(timestamp){
let now = new Date(timestamp);
let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
let months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec"
]
let month = months[now.getMonth()];
let day = days[now.getDay()];
let hours = now.getHours();
let date = now.getDate();
let minutes = (`0` + now.getMinutes()).slice(-2);

let currentTime = document.querySelector("span.time");
return `${day}, ${month} ${date}, ${hours}:${minutes}`;

}

function formatDayForecast(timestamp){
  let date = new Date(timestamp * 1000);
  let days = [  
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ]
  let day = date.getDay();
  return days [day];
}


function showWeekAheadForecast(response) {
 let forecast = response.data.daily;
 let weekAheadForecast = document.querySelector("#weekAhead-Forecast");
 console.log(response.data);
 console.log(response.data.timezone_offset);
 
 let weekAheadForecastHTML = `<div class=" row weekAhead">`;
  forecast.forEach(function (forecastDay, index){  
    if (index!==0 & index < 7) { 
  weekAheadForecastHTML = weekAheadForecastHTML + ` 
   <div class="col-2 weekForecast">
   ${formatDayForecast(forecastDay.dt)} <br />
   <span class="weekHigh">${Math.round(forecastDay.temp.max)}°</span>
   <span class="weekLow">${Math.round(forecastDay.temp.min)}°</span><br />
   <div class="weekIcon"><img src = "icons/${forecastDay.weather[0].icon}.png"/></div>
   </div>
   `;
    }
  });
   
 weekAheadForecastHTML = weekAheadForecastHTML + `</div>`;
 weekAheadForecast.innerHTML = weekAheadForecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={minutely,hourly,alerts}&appid=${apiKey}&units=imperial`;
  
  axios.get(apiUrl).then(showWeekAheadForecast);
}

function getTemp(response) {
  let citySearch = response.data.name;
  let cityName = document.querySelector(".cityName");
  cityName.innerHTML = `${citySearch}`;
  let weather = response.data.weather[0].main;
  let weatherType = document.querySelector(".weatherType");
  weatherType.innerHTML = `${weather}`;
  let humidityElement = response.data.main.humidity;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `Humidity: ${humidityElement} %`;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".windSpeed");
  windSpeed.innerHTML = `Wind Speed: ${wind} mph `;
  temperature = response.data.main.temp;
  let todayTemp = document.querySelector(".todayTemp");
  todayTemp.innerHTML = `${Math.round(temperature)}°`;
  todayLowTemp = response.data.main.temp_min;
  let lowTemp = document.querySelector(".lowTemp");
  lowTemp.innerHTML = `${Math.round(todayLowTemp)}°`;
  let mainIcon = response.data.weather[0].icon;
  let todayIcon = document.querySelector(".mainIcon");
  todayIcon.innerHTML = `<img src = "icons/${mainIcon}.png"/>`;

  let now = new Date();
  let localTime = now.getTime();
  let localOffset = now.getTimezoneOffset() * 60000;
  let utc = localTime + localOffset;
  let local = utc + 1000 * response.data.timezone;
  let cityTime = new Date(local);

  let time = document.querySelector("span.time");
  time.innerHTML = findDate(cityTime);
  
  getForecast(response.data.coord);
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
  let todayTemp = document.querySelector(".todayTemp");
  let celsiusTemp = Math.round((temperature - 32) / 1.8);
  todayTemp.innerHTML = `${celsiusTemp}°`;
  let lowTemp = document.querySelector(".lowTemp");
  let tonightCelsiusTemp = Math.round((todayLowTemp - 32) / 1.8);
  lowTemp.innerHTML = `${tonightCelsiusTemp}°`;
}

function convertFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let todayTemp = document.querySelector(".todayTemp");
  let FahrenheitTemp = Math.round(temperature);
  todayTemp.innerHTML = `${FahrenheitTemp}°`;
  let lowTemp = document.querySelector(".lowTemp");
  let tonightFahrenheitTemp = Math.round(todayLowTemp);
  lowTemp.innerHTML = `${tonightFahrenheitTemp}°`;
}

let temperature = null;
let todayLowTemp = null;

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);

search("Chicago");





