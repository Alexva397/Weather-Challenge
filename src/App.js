import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ImSpinner2 } from "react-icons/im";

import { fetchCurrentByName, fetchCurrentByCoords, fetchForecastByCoords, fetchForecastByName } from "./store/features/weather/weatherSlice";
import { addCity, removeCity } from "./store/features/pinned/pinnedSlice";
import CurrentCard from "./components/CurrentCard";
import ForecastCard from "./components/ForecastCard";
import Header from "./components/Header";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const currentWeather = state.weather.current;
  const forecastWeather = state.weather.forecast;
  const pinnedCities = state.pinned.cities;
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (pinnedCities.length > 0) {
      dispatch(fetchCurrentByName(pinnedCities[0]));
      dispatch(fetchForecastByName(pinnedCities[0]));
    } else {
      navigator.geolocation.getCurrentPosition((res) => {
        const { latitude, longitude } = res.coords;
        const coordinates = { lat: latitude, lon: longitude };
        fetchLocalWeather(coordinates);
      })
    }
  }, []);

  const fetchLocalWeather = (c) => {
    dispatch(fetchCurrentByCoords(c));
    dispatch(fetchForecastByCoords(c));
  };

  const handleInputChange = (e) => setSearch(e.target.value);

  const handleUserSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCurrentByName(search.trim()));
    dispatch(fetchForecastByName(search.trim()));
  };

  const handleUserPinClick = () => {
    let index = -1;
    for (let i = 0; i < pinnedCities.length; i++) {
      if (pinnedCities[i] === currentWeather.name) index = i;
    }
    if (index > -1) dispatch(removeCity(currentWeather.name));
    else dispatch(addCity(currentWeather.name));
  };

  return (
    <div className="background">
      <Header
        searchValue={search}
        onChange={handleInputChange}
        handleSubmit={handleUserSubmit}
      />
      <main>
        {(state.weather.loading || (currentWeather === null && forecastWeather === null))
          ? <ImSpinner2 className="spinner" />
          : (currentWeather !== null && forecastWeather !== null) &&
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
                windDirection={currentWeather.wind.deg}
                windSpeed={currentWeather.wind.speed}
                sunrise={currentWeather.sys.sunrise}
                sunset={currentWeather.sys.sunset}
                pinCity={() => handleUserPinClick()}
              />
              <div className="forecast">
                <div className="forecast-title">{currentWeather.name}'s Forecast</div>
                <div className="day-container">
                  {forecastWeather.list.slice(0, 5).map((day, index) => (
                    <div key={index} style={{ display: 'flex' }}>
                      <ForecastCard
                        key={day.dt}
                        date={day.dt}
                        maxTemp={day.temp.max}
                        minTemp={day.temp.min}
                        humidity={day.humidity}
                        icon={day.weather[0].icon}
                        iconAlt={day.weather[0].description}
                        windDirection={day.deg}
                        windSpeed={day.speed}
                      />
                      {index < 4 &&
                        <div className="forecast-divider"></div>
                      }
                    </div>
                  ))}
                </div>
              </div>
            </>
        }
      </main>
    </div>
  );
};

export default App;
