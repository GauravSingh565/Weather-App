let input = document.getElementById("input");
let btn = document.getElementById("btn");
let error = document.getElementById("error");
let icon = document.getElementById("icons");
let city = document.getElementById("city");
let date = document.getElementById("date");
let temp = document.getElementById("temp");
let weather = document.getElementById("weather");
let range = document.getElementById("weatherRange");
let iconDiv = document.querySelector(".iconsDiv");
let apiKey = "fa372ab75411b9bbb0c9342ae8b32215";
let hr = document.querySelector("hr");

async function getData(data) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=${apiKey}`
  );
  let WeatherData = await response.json();
  console.log(WeatherData);
  displayData(WeatherData);
}

function displayData(data) {
  if (data.cod === "404") {
    error.innerText = "please enter valid information";
    city.innerHTML = "";
    iconDiv.innerHTML = "";
    date.innerHTML = "";
    weather.innerHTML = "";
    range.innerHTML = "";
    temp.innerHTML = "";
  } else {
    error.innerText = "";
    city.innerHTML = data.name;
    temp.innerHTML = `Temp: ${Math.floor(data.main.temp) + " &deg;"}C`;
    weather.innerHTML = `Weather: ${data.weather[0].main}`;
    range.innerHTML = `Temp Rnage: ${
      Math.floor(data.main.temp_max) + " &deg;"
    }C /${Math.floor(data.main.temp_min) + " &deg;"}C `;

    let today = new Date();
    date.innerHTML = dateTime(today);

    let iconUrl = "https://openweathermap.org/img/w/";
    icon.src = `${iconUrl}${data.weather[0].icon}.png`;
  }
}

function dateTime(data) {
  let months = [
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
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[data.getDay()];
  let month = months[data.getMonth()];
  let date = data.getDate();
  let year = data.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}

btn.addEventListener("click", function () {
  let inputVal = input.value;
  if (inputVal !== "") {
    hr.style.display = "block";
    getData(inputVal);
    input.value = "";
  }
});
