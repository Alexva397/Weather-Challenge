import { getDayOfWeek, getMonthString, formatDay } from "../utils/date";

const CurrentCard = ({ location, current, feelsLike, icon, iconAlt, minTemp, maxTemp, humidity, pres }) => {
    const date = new Date();
    const formattedDate = `${getDayOfWeek(date)}, ${getMonthString(date)} ${formatDay(date)}`
    const pressure = (pres * 0.02953).toFixed(2);
    console.log(pressure)
    return (
        <div className="current">
            <div className="current-header">
                <div>
                    <h2>{location}</h2>
                    <div className="date">{formattedDate}</div>
                    <h2 className="temp-current">{Math.round(current)}°F</h2>
                    <div>{minTemp}°/{maxTemp}°</div>
                </div>
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={iconAlt} style={{ height: 100, width: 100 }} />
            </div>
            <div className="current-details">
                <div>
                    <div>Feels like: {Math.round(feelsLike)}°F</div>
                    <div>Humidity: {humidity}%</div>
                    <div>Pressure: ↓ {pressure} in</div>
                </div>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default CurrentCard;


