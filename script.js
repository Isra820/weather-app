
const form = document.getElementById('weatherForm');
const result = document.getElementById('result');

form.addEventListener("submit", async function(e){
    e.preventDefault();

    const city = document.getElementById('cityInput').value;
    const apiKey = '948d9b6afefb0661ceed43931a3fe41e';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   
    try {
        const resp = await fetch(url);
        const data = await resp.json();

        if (!resp.ok) {
            result.innerHTML = "❌ City not found";
            return;
        }

        const temp = data.main.temp;
        const desc = data.weather[0].description;
        
        const icon = data.weather[0].icon;
const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

result.innerHTML = `
    <h2> ${city}</h2>
    <img src="${iconUrl}" alt="weather icon">
    <p>🌡️ ${temp}°C</p>
    <p>☁️ ${desc}</p>
`;


    } 
    catch (error) {
        result.innerHTML = "⚠️ Error fetching data!";
    }
});
