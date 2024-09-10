let date = new Date();

const displayWeather = async () => {
  try {
    const fetchWeather = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=jakarta&appid=99c995323862714fb8d376c237d51824&units=metric",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const weatherData = await fetchWeather.json();
    console.log(weatherData);
    console.log(weatherData.name);
    console.log(date);
  } catch (err) {
    console.log(err);
  }
};

displayWeather();
