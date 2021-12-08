import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import CurrentCard from "./components/CurrentCard";
import Header from "./components/Header";
import { fetchCurrentByName, fetchCurrentByCoords } from "./store/features/weather/weatherSlice";

function App() {
  const weather = useSelector((state) => state.weather);
  const currentWeather = weather.current;
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      // navigator.permissions
      //   .query({ name: "geolocation" })
      //   .then((res) => {
      //     if (res.state === "granted") {
      //       console.log(res.state);
      //       console.log("res", res)
      //     } else if (res.state === "prompt") {

      //     }
      //   })
      navigator.geolocation.getCurrentPosition((res) => {
        const { latitude, longitude } = res.coords;
        const search = {
          lat: latitude,
          lon: longitude
        }
        dispatch(fetchCurrentByCoords(search));
      })
    }
  }, [])

  const handleInputChange = (e) => setSearch(e.target.value);

  const handleUserSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCurrentByName(search))
  }

  return (
    <div>
      <Header
        searchValue={search}
        onChange={handleInputChange}
        handleSubmit={handleUserSubmit}
      />
      <main>
        {currentWeather !== null &&
          <CurrentCard
            location={currentWeather.name}
            current={currentWeather.main.temp}
            feelsLike={currentWeather.main.feels_like}
            icon={currentWeather.weather[0].icon}
            iconAlt={currentWeather.weather[0].description}
            minTemp={currentWeather.main.temp_min}
            maxTemp={currentWeather.main.temp_max}
            humidity={currentWeather.main.humidity}
          />
        }
        <div className="forecast">

        </div>
      </main>
    </div>
  );
}

export default App;
