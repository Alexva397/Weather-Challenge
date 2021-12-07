import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import CurrentCard from './components/CurrentCard';
import Header from './components/Header';

const api = "99d3d6f40aed5a744f73c2687993447d";

const headers = {
  'Content-Type': 'application/json',
  'Timestamp': (new Date()).toISOString(),
}

function App() {
  const [result, setResult] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      // navigator.permissions
      //   .query({ name: "geolocation" })
      //   .then((res) => {
      //     if (res.state === "granted") {
      //       console.log(res.state);
      //       console.log('res', res)
      //     } else if (res.state === "prompt") {

      //     }
      //   })
      navigator.geolocation.getCurrentPosition((res) => {
        const { latitude, longitude } = res.coords;
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${api}`, headers)
          .then((data) => {
            setResult(data.data);
          })
      })
    }
  }, [])

  const handleInputChange = (e) => setSearch(e.target.value);

  const handleUserSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=${api}`, headers)
    .then((data) => {
      setResult(data.data);
    })
  }

  return (
    <div>
      <Header
        searchValue={search}
        onChange={handleInputChange}
        handleSubmit={handleUserSubmit}
      />
      <main>
        {result &&
          <CurrentCard
            location={result.name}
            current={result.main.temp}
            feelsLike={result.main.feels_like}
            icon={result.weather[0].icon}
            iconAlt={result.weather[0].description}
            minTemp={result.main.temp_min}
            maxTemp={result.main.temp_max}
            humidity={result.main.humidity}
          />
        }
        <div className="forecast">

        </div>
      </main>
    </div>
  );
}

export default App;
