//getting the longitude and latitude for forecast

function getForecast(coordinates) {

	let apiKey = "27a45e93cf87c55d3ceeaccda8173814";
	let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

	axios.get(api).then(displayForecast);
	console.log(api);
}


//update the weather live

function showWeather(response) {
	let city = response.data.name;
	let title = document.querySelector("#title");
	let appTemp = document.getElementById("temp");
	let conditions = document.getElementById("conditions");
	let feelsLike = document.getElementById("realFeel");
	let mainIcon = document.getElementById("main-icon")
	let humidity = document.getElementById("humidity")
	let windSpeed = document.getElementById("windSpeed")

	let maxTemp = Math.round(response.data.main.temp_max);
	let minTemp = Math.round(response.data.main.temp_min);
	let realFeel = Math.round(response.data.main.feels_like);
	let weatherDescription = response.data.weather[0].description;
	conditions.innerHTML = `${weatherDescription}`;
	appTemp.innerHTML = `${maxTemp}/${minTemp}°C`;
	title.innerHTML = `${city}`;
	feelsLike.innerHTML = `${realFeel}`;
	humidity.innerHTML = `${response.data.main.humidity}`;
	windSpeed.innerHTML = Math.round(response.data.wind.speed);
	mainIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

	getForecast(response.data.coord)
}

//getting the forecast

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000)
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;

	let forecastElement = document.getElementById("boxes");
	let forecastHTML = "";

	forecast.forEach(function (forecastDay, idx) {

		if (idx < 6) {

			forecastHTML = forecastHTML + `
	<div class="box" id="box">
		<h3 id="forecast-day">${formatDay(forecastDay.dt)}</h3>
		<img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png">
		<p id="forecast-temp">${Math.round(forecastDay.temp.max)}/${Math.round(forecastDay.temp.min)}</p>
	</div>
	`;
		}
	});

	forecastElement.innerHTML = forecastHTML;
};




//search engine

function search(city) {
	let apiKey = "27a45e93cf87c55d3ceeaccda8173814";
	let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	console.log(api);

	axios.get(api).then(showWeather);
}
search("singapore");

function handleSubmit(event) {
	event.preventDefault();
	let cityInput = document.getElementById("city-input");
	search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit)


//local weather
let weatherBtn = document.getElementById("localWeather");

function showPosition(location) {
	let latitude = location.coords.latitude;
	let longitude = location.coords.longitude;
	let apiKey = "27a45e93cf87c55d3ceeaccda8173814";
	let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
	console.log(`latitude: ${latitude} longitude: ${longitude}`);

	axios.get(api).then(showWeather);
}

function crtArea(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showPosition);
}

weatherBtn.addEventListener("click", crtArea);

//current date/time

let crntDate = document.querySelector("#crnt-date");
let now = new Date();

let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
	hour = `0${hour}`;
}
let mins = now.getUTCMinutes();
if (mins < 10) {
	mins = `0${mins}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
let month = months[now.getMonth()];

crntDate.innerHTML = `${hour}:${mins} ${day} ${date} ${month}`;

let boxD = documnent.querySelector("box:nth-child(3)");
boxD.innerHTML = "bugger";