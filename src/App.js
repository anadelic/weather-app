import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [city, setCity] = useState('Vienna');
  const [data, setData] = useState({});
  const [state, setState] = useState('');

  const submitHandler = () => {
    setState(setCity);
  };
  const apiKey = process.env.REACT_APP_API_KEY;

  function ifClicked() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  useEffect(() => {
    ifClicked();
  }, []);

  return (
    <body>
      <header>
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Enter Location"
          type="text"
        />
        <button className="location_searcher" onClick={ifClicked}>
          Search Location
        </button>
      </header>
      <section>
        <h1> {data.name}</h1>
        <h2>{Math.round(data.main.temp - 273)} °C</h2>
        <p>Humidity: {data.main.humidity} %</p>
      </section>
      <section>
        <p>High: {Math.round(data.main.temp_max - 273)} °C</p>
        <p>Low: {Math.round(data.main.temp_min - 273)} °C</p>
      </section>
      <section>
        <img
          src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
          alt="weather status icon"
        />
      </section>
      <footer> Weather app made by Ana</footer>
    </body>
  );
}
