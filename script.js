let weather = {
  apiKey: "10053f2958b53ec8f94cef689093b473",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=" +
        "metric" +
        "&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".temperature").innerText = temp.toFixed(1) + "°C";
    document.querySelector(".humidity").innertext =
      "Humidty: " + humidity + "%";
    document.querySelector(".description").innerText = description;
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed.toFixed(1) + "km/h";
    document.querySelector(".weather").classList.remove("loading");
    // document.body.style.backgroundImage =
    //   "url('https://source.unsplash.com/random/?" + name + ", landscape')";

    const myButton = document.querySelector(".unit-button");
    let isF = true;
    myButton.addEventListener("click", function () {
      if (isF) {
        myButton.innerText = "°C";
        myButton.classList.remove("C");
        myButton.classList.add("F");
        document.querySelector(".temperature").innerText =
          ((temp * 9) / 5 + 32).toFixed(1) + "°F";
        document.querySelector(".wind").innerText =
          "Wind speed: " + (speed / 1.609).toFixed(1) + "mph";
        isF = false;
      } else {
        myButton.innerText = "°F";
        myButton.classList.remove("F");
        myButton.classList.add("C");
        document.querySelector(".temperature").innerText =
          temp.toFixed(1) + "°C";
        document.querySelector(".wind").innerText =
          "Wind speed: " + speed.toFixed(1) + "km/h";
        isF = true;
      }
    });
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search("metric");
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

  //default city
weather.fetchWeather("seattle", "metric");
