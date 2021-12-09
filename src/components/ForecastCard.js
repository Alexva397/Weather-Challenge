import { getDayOfWeek } from "../utils/date";


const ForecastCard = ({ date, rain, humidity, icon, iconAlt, minTemp, maxTemp }) => {
    const dateString = new Date(date * 1000);
    const dayOfWeek = getDayOfWeek(dateString);
    
    return (
        <>
            <div className="forecast-day">
                <div className="forecast-date">{dayOfWeek}</div>
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={iconAlt} style={{ height: 100, width: 100 }} />
            </div>
        </>
    );
};

export default ForecastCard;