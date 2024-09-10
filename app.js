const displayWeather = async (city) => {
  try {
    const fetchWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=99c995323862714fb8d376c237d51824&units=metric`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!fetchWeather.ok) {
      throw new Error(`HTTP error! Status: ${fetchWeather.status}`);
    }

    const weatherData = await fetchWeather.json();
    console.log(weatherData);
    console.log(weatherData.name);

    document.getElementById("city").textContent = weatherData.name;
    document.getElementById("weatherInfo").innerHTML = `
      <img 
        src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png"
        alt="status icon"
      />
      <h2>${weatherData.weather[0].main}</h2>
      <p>${weatherData.weather[0].description}</p>
    `;
    document.getElementById("tempInfo").innerHTML = `
      <h3 class="mb-3">${weatherData.main.temp}°C</h3>
      <div class="container-fluid d-flex justify-content-sm-around">
        <div>
          <p class="text-primary"><strong>Lows</strong></p>
          <p>${weatherData.main.temp_min}°C</p>
        </div>
        <div>
          <p class="text-danger"><strong>Highs</strong></p>
          <p>${weatherData.main.temp_max}°C</p>
        </div>
      </div>
    `;

    const status = weatherData.weather[0].main.toLowerCase();
    if (weatherData.weather[0].icon === "01n") {
      document.body.className = "";
      document.body.classList.add("bg-night");
    } else if (
      status === "rain" ||
      status === "snow" ||
      status == "clear" ||
      status === "clouds" ||
      status === "thunderstorm" ||
      status === "mist"
    ) {
      document.body.className = "";
      document.body.classList.add(`bg-${status}`);
    } else {
      document.body.className = "";
      document.body.classList.add("bg-default");
    }
  } catch (err) {
    console.log(err);
  }
};

displayWeather("New York");

document.getElementById("displayWeather").addEventListener("click", () => {
  const city = document.getElementById("citySearch").value;
  displayWeather(city);
});

document.getElementById("citySearch").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = document.getElementById("citySearch").value;
    displayWeather(city);
    event.preventDefault();
  }
});
