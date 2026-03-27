async function getWeather() {
  const location = document.getElementById('locationInput').value.trim();
  const apiKey = "fee8fd7e7f9b43acb2790832251409";
  const loader = document.getElementById('loader');
  const resultCard = document.getElementById('weatherResult');

  if (location === "") {
    alert("Please enter a city name.");
    return;
  }

  resultCard.classList.add("hidden");
  loader.classList.remove("hidden");
  document.body.className = "default"; // reset background

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Location not found");

    const data = await response.json();

  
    document.getElementById('cityName').innerText = `${data.location.name}, ${data.location.country}`;
    document.getElementById('temperature').innerText = `🌡️ ${data.current.temp_c}°C`;
    document.getElementById('condition').innerText = `☁️ Condition: ${data.current.condition.text}`;
    document.getElementById('humidity').innerText = `💧 Humidity: ${data.current.humidity}%`;
    document.getElementById('wind').innerText = `🌬️ Wind: ${data.current.wind_kph} km/h`;

  
    document.getElementById('weatherIcon').src = `https:${data.current.condition.icon}`;
    document.getElementById('weatherIcon').alt = data.current.condition.text;

  
    const conditionText = data.current.condition.text.toLowerCase();

    if (conditionText.includes("sunny") || conditionText.includes("clear")) {
      document.body.className = "sunny";
    } else if (conditionText.includes("rain") || conditionText.includes("drizzle") || conditionText.includes("thunder")) {
      document.body.className = "rainy";
    } else if (conditionText.includes("cloud") || conditionText.includes("overcast") || conditionText.includes("mist")) {
      document.body.className = "cloudy";
    } else {
      document.body.className = "default";
    }


    resultCard.classList.remove("hidden");

  } catch (error) {
    alert("Error: " + error.message);
  } finally {
    loader.classList.add("hidden");
  }
}

