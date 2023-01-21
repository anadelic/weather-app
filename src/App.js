import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import { setOriginalNode } from 'typescript';

export default function App() {
  const [city, setCity] = useState('Vienna');
  const [temp, setTemp] = useState([]);
  const [weather, setWeather] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [icon, setIcon] = useState([]);
  const [name, setName] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
    )
    .then(function (res) {
      // handle success
      setTemp(res.data.main.temp);
      setName(res.data.name);
      setHumidity(res.data.main.humidity);

      setIcon(res.data.weather[0].icon);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  return (
    <body>
      <header>
        <h1>{name}</h1>
      </header>
      <main>
        <h2> {Math.round(temp - 273)}°C</h2>

        <label forHtml="city">
          Choose the city
          <input
            id="city"
            name="city"
            onChange={(e) => {
              setCity(e.currentTarget.value);
            }}
          />
        </label>

        <p> Humidity: {humidity}%</p>

        <img
          src={`http://openweathermap.org/img/w/${icon}.png`}
          alt="weather status icon"
        />
      </main>
      <footer></footer>
    </body>
  );
}
