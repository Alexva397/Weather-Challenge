import { getDayOfWeek } from "../utils/date";
import { RiWindyLine, RiArrowDownLine } from "react-icons/ri";
import "./ForecastCard.css";

const ForecastCard = ({ date, icon, iconAlt, minTemp, maxTemp, windDirection, windSpeed }) => {
    const dateString = new Date(date * 1000);
    const dayOfWeek = getDayOfWeek(dateString);
    
    return (
            <div className="forecast-day">
                <div className="forecast-date">{dayOfWeek}</div>
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={iconAlt} style={{ height: 100, width: 100 }} />
                <div className="max-forecast">{maxTemp}°</div>
                <div className="min-forecast">{minTemp}°</div>
                <div className="forecast-wind"><RiWindyLine /> <RiArrowDownLine style={{ transform: `rotate(${windDirection}deg)` }}/>{windSpeed} mph</div>
            </div>
    );
};

export default ForecastCard;