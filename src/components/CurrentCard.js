import React, { useState, useEffect } from "react";
import { RiWindyLine, RiArrowDownLine, RiPushpin2Line, RiPushpin2Fill } from "react-icons/ri";
import { FaThermometerHalf } from "react-icons/fa";
import { IoWaterOutline } from "react-icons/io5";
import { BsArrowsCollapse, BsSunrise, BsSunset } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getDayOfWeek, getMonthString, formatDay } from "../utils/date";
import "./CurrentCard.css";

const CurrentCard = ({ location, current, feelsLike, icon, iconAlt, minTemp, maxTemp, humidity, pres, windDirection, windSpeed, sunrise, sunset, pinCity }) => {
    const state = useSelector(state => state);
    const pinnedCities = state.pinned.cities;
    const currentCity = state.weather.current.name;
    const [isPinned, setIsPinned] = useState(false);
    
    const date = new Date();
    const formattedDate = `${getDayOfWeek(date)}, ${getMonthString(date)} ${formatDay(date)}`;
    const pressure = (pres * 0.02953).toFixed(2);
    const sunriseTime = `${(new Date(sunrise * 1000)).getHours()}:${(new Date(sunrise * 1000)).getMinutes()}`;
    const sunsetTime = `${(new Date(sunset * 1000)).getHours()}:${(new Date(sunset * 1000)).getMinutes()}`;
    
    useEffect(() => {
        let index = -1;
        for (let i = 0; i < pinnedCities.length; i++) {
            if (pinnedCities[i] === currentCity) index = i;
        }
        if (index > -1) setIsPinned(true);
        else setIsPinned(false);
    }, [pinnedCities, currentCity]);

    return (
        <div className="current">
            <div className="current-header">
                <div className="current-header-text">
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
                        <button className="btn-no-style" onClick={pinCity}>
                        {!isPinned
                            ? <RiPushpin2Line className="pin"/>
                            : <RiPushpin2Fill className="pin"/>
                        }
                        </button>
                    </div>
                    <div className="temps-container">
                        <h2 className="temp-current">{Math.round(current)}°</h2>
                        <div className="min-max">{minTemp}° / {maxTemp}°</div>
                    </div>
                    <div className="location-date">
                        <h2>{location}</h2>
                        <div className="date">{formattedDate}</div>
                    </div>
                </div>
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={iconAlt} style={{ height: 140, width: 140 }} />
            </div>
            <div className="current-details">
                <div className="detail-col">
                    <div className="detail"><span><FaThermometerHalf /> Feels like:</span><span>{Math.round(feelsLike)}°F</span></div>
                    <div className="detail"><span><IoWaterOutline /> Humidity:</span><span>{humidity}%</span></div>
                    <div className="detail-last"><span><BsArrowsCollapse /> Pressure:</span><span><RiArrowDownLine /> {pressure} in</span></div>
                </div>
                <div className="detail-divider"></div>
                <div className="detail-col">
                    <div className="detail"><span><RiWindyLine /> Wind</span><span><RiArrowDownLine style={{ transform: `rotate(${windDirection}deg)` }} />{windSpeed.toFixed(1)} mph</span></div>
                    <div className="detail"><span><BsSunrise /> Sunrise</span><span>{sunriseTime}</span></div>
                    <div className="detail-last"><span><BsSunset /> Sunset</span><span>{sunsetTime}</span></div>
                </div>
            </div>
        </div>
    );
};

export default CurrentCard;