let searchBtn = document.getElementById("searchBtn");
let cityInput = document.getElementById("cityInput");
let weatherResult = document.getElementById("weatherResult");
let historyDiv = document.getElementById("history");

const API_KEY = "0bf552358fba8c4fcb22b6d0ca83d039";


// Load history on page load
window.onload = function () {
    loadHistory();
};


searchBtn.addEventListener("click", function () {
    let city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter city name");
        return;
    }

    getWeather(city);
});


// Async/Await version
async function getWeather(city) {

    console.log("Start fetching weather...");
    
    try {
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        console.log("Fetch request sent");

        if (!response.ok) {
            throw new Error("City not found");
        }

        let data = await response.json();

        console.log("Weather data received");

        displayWeather(data);
        saveToHistory(city);

    } catch (error) {
        weatherResult.innerHTML = `<p style="color:red;">${error.message}</p>`;
        console.log("Error:", error);
    }

    console.log("End of function");
}


// Display weather
function displayWeather(data) {

    weatherResult.innerHTML = `
        <p><b>City:</b> ${data.name}</p>
        <p><b>Temperature:</b> ${data.main.temp} °C</p>
        <p><b>Condition:</b> ${data.weather[0].description}</p>
        <p><b>Humidity:</b> ${data.main.humidity}%</p>
        <p><b>Wind:</b> ${data.wind.speed} m/s</p>
    `;
}


// Save to Local Storage
function saveToHistory(city) {

    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    loadHistory();
}


// Load history from Local Storage
function loadHistory() {

    historyDiv.innerHTML = "";

    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    cities.forEach(function (city) {

        let btn = document.createElement("button");
        btn.innerText = city;

        btn.addEventListener("click", function () {
            getWeather(city);
        });

        historyDiv.appendChild(btn);
    });
}



// Promise (.then/.catch) Example (for viva demonstration)

function demoPromise() {

    console.log("Promise demo start");

    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(response => response.json())
        .then(data => {
            console.log("Promise resolved", data);
        })
        .catch(error => {
            console.log("Promise error", error);
        });

    console.log("Promise demo end");
}

demoPromise();
