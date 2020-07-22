import React, { useState } from "react";
const api = {
  key: process.env.REACT_APP_SECRETE_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };
  const dateBuilder = (d) => {
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

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  const weatherType = () => {
    if (typeof weather.main != "undefined") {
      if (weather.main.temp > 1 && weather.main.temp < 20) {
        return "app warm";
      }
      if (weather.main.temp > 20 && weather.main.temp < 30) {
        return "app hot";
      }
      if (weather.main.temp < 1) {
        return "app cold";
      }
      if (weather.main.temp > 30) {
        return "app super-hot";
      } else {
        return "app";
      }
    } else {
      return "app";
    }
  };
  return (
    <div className={weatherType()}>
      <main>
        <h1>Weather Checker</h1>
        <div className="search-box">
          <input
            type="text"
            className="search-box"
            placeholder="Please write your city or country"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp"> {Math.round(weather.main.temp)}ºc</div>
            </div>
            <div className="weather-box">
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
