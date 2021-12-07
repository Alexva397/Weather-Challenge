import { getDayOfWeek, getMonthString, formatDay } from "../utils/date";

const CurrentCard = ({ location, current, feelsLike, icon, iconAlt }) => {
    const date = new Date();
    const formattedDate = `${getDayOfWeek(date)}, ${getMonthString(date)} ${formatDay(date)}` 
    
    return (
        <div className="current">
            <div>{formattedDate}</div>
            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={iconAlt} />
            <h2>{location}</h2>
            <div>Current Temperature: {Math.round(current)} °F</div>
            <div>Feels like: {Math.round(feelsLike)} °F</div>
        </div>
    );
};

export default CurrentCard;


