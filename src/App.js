import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import CurrentCard from './components/CurrentCard';


const headers = {
  'Content-Type': 'application/json',
  'Timestamp': (new Date()).toISOString(),
}

function App() {
  const [result, setResult] = useState(null);

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
        console.log(res)
        const { latitude, longitude } = res.coords;
        const timestamp = (new Date()).toISOString();
        console.log(timestamp)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`, headers)
          .then((data) => {
            setResult(data.data);
          })
      })
    }
  }, [])

  return (
    <div>
      <header className="App-header">
        <h1 className="title">Weather</h1>
        <form>
          <input className="search" placeholder="Search by city..." />
          <button className="submit">Search</button>
        </form>
      </header>
      <main>
        {result &&
          <CurrentCard
            location={result.name}
            current={result.main.temp}
            feelsLike={result.main.feels_like}
            icon={result.weather[0].icon}
            iconAlt={result.weather[0].description}
          />
        }
        <div className="forecast">

        </div>
      </main>
    </div>
  );
}

export default App;
