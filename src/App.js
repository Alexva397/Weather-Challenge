import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import CurrentCard from "./components/CurrentCard";
import ForecastCard from "./components/ForecastCard";
import Header from "./components/Header";
import { fetchCurrentByName, fetchCurrentByCoords, fetchForecastByCoords, fetchForecastByName } from "./store/features/weather/weatherSlice";

function App() {
  const weather = useSelector((state) => state.weather);
  const currentWeather = weather.current;
  const forecastWeather = weather.forecast;
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [geolocation, setGeoLocation] = useState(null)

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((res) => {
  //     const { latitude, longitude } = res.coords;
  //     const coordinates = {
  //       lat: latitude,
  //       lon: longitude
  //     }
  //     setGeoLocation(coordinates);
  //     // fetchLocalWeather(coordinates);
  //   })

  // }, [geolocation])

  const fetchLocalWeather = (c) => {
    dispatch(fetchCurrentByCoords(c));
    dispatch(fetchForecastByCoords(c));
  }

  const handleInputChange = (e) => setSearch(e.target.value);

  const handleUserSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCurrentByName(search))
    dispatch(fetchForecastByName(search))
  }

  const arr = [1, 2, 3, 4, 5]

  return (
    <div className="background">
      <Header
        searchValue={search}
        onChange={handleInputChange}
        handleSubmit={handleUserSubmit}
      />
      <main>
        {(currentWeather !== null && forecastWeather !== null) &&
          <>
            <CurrentCard
              location={currentWeather.name}
              current={currentWeather.main.temp}
              feelsLike={currentWeather.main.feels_like}
              icon={currentWeather.weather[0].icon}
              iconAlt={currentWeather.weather[0].description}
              minTemp={currentWeather.main.temp_min}
              maxTemp={currentWeather.main.temp_max}
              humidity={currentWeather.main.humidity}
              pres={currentWeather.main.pressure}
            />
            <div className="forecast">
              <div className="forecast-title">Richardson's Forecast</div>
              <div className="day-container">
                {forecastWeather.list.slice(0, 5).map(day => (
                  <ForecastCard
                    date={day.dt}
                    maxTemp={day.temp.max}
                    minTemp={day.temp.min}
                    humidity={day.humidity}
                    icon={day.weather[0].icon}
                    iconAlt={day.weather[0].description}
                  />

                ))}
              </div>
            </div>
          </>
        }
      </main>
    </div>
  );
}

export default App;
