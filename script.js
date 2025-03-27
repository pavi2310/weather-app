async function getWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "2fa63479e31789cb25aab3e3f9bd79a2"; // Replace with your OpenWeatherMap API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        document.getElementById("weatherResult").innerHTML = "<p>Loading...</p>";
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("weatherResult").innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <img src="${weatherIcon}" alt="Weather icon">
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = `<p class="error">${error.message}</p>`;
    }
}
