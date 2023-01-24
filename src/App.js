import './App.css';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [apiData, setApiData] = useState([]);
  const [city, setCity] = useState('London');
  const [getCity, setGetCity] = useState('');

  const ApiKey = process.env.REACT_APP_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data))
      .catch(() => alert('error'));
  }, [url]);

  return (
    <body>
      <header>
        <input
          onChange={(e) => setGetCity(e.target.value)}
          value={getCity}
          placeholder="Enter a city name"
        />
        <button onClick={() => setCity(getCity)}>Search</button>
      </header>
      <main>
        <h1> {apiData.name}</h1>
        <h2>{Math.round(apiData.main?.temp - 273)}°C</h2>
        <p>Humidity: {apiData.main?.humidity}%</p>
        <section>
          <div className="tempMaxMin">
            <p>High: {Math.round(apiData.main?.temp_max - 273)}°C</p>
          </div>
          <div className="tempMaxMin">
            <p>Low: {Math.round(apiData.main?.temp_min - 273)}°C</p>
          </div>
        </section>
      </main>
    </body>
  );
}
