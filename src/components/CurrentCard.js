import { getDayOfWeek, getMonthString, formatDay } from "../utils/date";
import { RiWindyLine, RiArrowDownLine } from "react-icons/ri";
import { FaThermometerHalf } from "react-icons/fa";
import { IoWaterOutline } from "react-icons/io5";
import { BsArrowsCollapse, BsSunrise, BsSunset } from "react-icons/bs";
import "./CurrentCard.css";

const CurrentCard = ({ location, current, feelsLike, icon, iconAlt, minTemp, maxTemp, humidity, pres, windDirection, windSpeed, sunrise, sunset }) => {
    const date = new Date();
    const formattedDate = `${getDayOfWeek(date)}, ${getMonthString(date)} ${formatDay(date)}`
    const pressure = (pres * 0.02953).toFixed(2);
    const sunriseTime = `${(new Date(sunrise * 1000)).getHours()}:${(new Date(sunrise * 1000)).getMinutes()}`;
    const sunsetTime = `${(new Date(sunset * 1000)).getHours()}:${(new Date(sunset * 1000)).getMinutes()}`;

    return (
        <div className="current">
            <div className="current-header">
                <div>
                    <h2>{location}</h2>
                    <div className="date">{formattedDate}</div>
                    <h2 className="temp-current">{Math.round(current)}°F</h2>
                    <div className="min-max">{minTemp}°/{maxTemp}°</div>
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
                    <div className="detail"><span><RiWindyLine /> Wind</span><span><RiArrowDownLine style={{ transform: `rotate(${windDirection}deg)` }} />{windSpeed} mph</span></div>
                    <div className="detail"><span><BsSunrise /> Sunrise</span><span>{sunriseTime}</span></div>
                    <div className="detail-last"><span><BsSunset /> Sunset</span><span>{sunsetTime}</span></div>
                </div>
            </div>
        </div>
    );
};

export default CurrentCard;


