import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [getCity, setGetCity] = useState('London');
  const [apiData, setApiData] = useState({});
  const [city, setCity] = useState('London');

  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data))
      .catch(() => alert('We could not find that template.'));
  }, [url]);

  return (
    <body>
      <header>
        <input onChange={(e) => setGetCity(e.target.value)} value={getCity} />
        <button onClick={(e) => setCity(getCity)}>Search</button>
      </header>
      <main>
        <h1> {apiData.name}</h1>
        <h2>{Math.round(apiData.main.temp - 273)} °C</h2>
        <p>Humidity: {apiData.main.humidity} %</p>

        <section>
          <p>High: {Math.round(apiData.main.temp_max - 273)} °C</p>
          <p>Low: {Math.round(apiData.main.temp_min - 273)} °C</p>
        </section>

        <img
          src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
          alt="weather status icon"
        />
      </main>

      <footer> Weather app made by Ana</footer>
    </body>
  );
}
