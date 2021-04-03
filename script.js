//update the weather live
let submitValue = document.getElementById("submit-value");
let btn = document.getElementById("btn");

function showWeather(response) {
	let city = response.data.name;
	let title = document.querySelector("#title");
	let appTemp = document.getElementById("temp");
	let conditions = document.getElementById("conditions");
	let feelsLike = document.getElementById("realFeel");
	let maxTemp = Math.round(response.data.main.temp_max);
	let minTemp = Math.round(response.data.main.temp_min);
	let realFeel = Math.round(response.data.main.feels_like);
	let weatherDescription = response.data.weather[0].description;
	conditions.innerHTML = `${weatherDescription}`;
	appTemp.innerHTML = `${maxTemp}°C/${minTemp}°C`;
	title.innerHTML = `${city}`;
	feelsLike.innerHTML = `${realFeel}`;
}

function findWeather() {
	let city = submitValue.value;
	city = city.trim().toLowerCase();
	let apiKey = "27a45e93cf87c55d3ceeaccda8173814";
	let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	console.log(api);

	axios.get(api).then(showWeather);
}
btn.addEventListener("click", findWeather);

//local weather
let weatherBtn = document.getElementById("localWeather");

function showPosition(location) {
	let latitude = location.coords.latitude;
	let longitude = location.coords.longitude;
	let apiKey = "27a45e93cf87c55d3ceeaccda8173814";
	let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
	console.log(`latitude: ${latitude}  longitude: ${longitude}`);

	axios.get(api).then(showWeather);
}

function crtArea() {
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
