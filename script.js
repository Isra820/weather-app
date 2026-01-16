
const form = document.getElementById('weatherForm');
const result = document.getElementById('result');
const cityInput = document.getElementById('cityInput');

const apiKey = '948d9b6afefb0661ceed43931a3fe41e';

form.addEventListener("submit", async function(e){
    e.preventDefault();
    const city = cityInput.value.trim();
    
    if(!city){
        showError("Please enter a city name");
        return;
    }
    getWeather(city);
});

async function getWeather(city){
    setLoading(true);

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const resp= await fetch(url);

        if(!resp.ok){
            throw new Error("City not found");
        }

        const data = await resp.json();
        renderWeather(data,city);
    } catch (error) {
        showError(error.message);
    } finally {
        setLoading(false);
    }
}

async function renderWeather(data, city){
    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl= `https://openweathermap.org/img/wn/${icon}@4x.png`;

    result.innerHTML = `
        <h2>${capitalize(city)}</h2>
        <img src="${iconUrl}" alt="weather icon">
        <p>🌡️ ${temp}°C</p>
        <p>☁️ ${desc}</p>
    `;
}

/* UI Helpers */
function showError(message) {
    result.innerHTML = `<p style="color:red;">❌ ${message}</p>`;
}

function setLoading(isLoading) {
    if (isLoading) {
        result.innerHTML = "⏳ Loading...";
    }
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}