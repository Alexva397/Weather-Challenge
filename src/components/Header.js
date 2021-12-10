import { useSelector, useDispatch } from "react-redux";
import { BsLightning } from "react-icons/bs";
import { fetchCurrentByName, fetchForecastByName } from "../store/features/weather/weatherSlice";
import "./Header.css";

const Header = ({ searchValue, onChange, handleSubmit }) => {
    const { cities } = useSelector(state => state.pinned);
    const dispatch = useDispatch();

    const handleSavedSerach = (c) => {
        dispatch(fetchCurrentByName(c));
        dispatch(fetchForecastByName(c));
    };

    return (
        <header className="App-header">
            <h1 className="title"><BsLightning /> Lightning Weather</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="search"
                    placeholder="Search by city..."
                    type="text"
                    name="search"
                    value={searchValue}
                    onChange={onChange}
                />
                <button className="submit" type="submit">Search</button>
            </form>
            {cities.length > 0 &&
                <div className="saved-container">
                    <div className="saved-text">Saved:</div>
                    {cities.map((city, index) => (
                        <button key={index} onClick={() => handleSavedSerach(city)} className="saved-btn">{city}</button>
                    ))}
                </div>
            }
        </header>
    );
};

export default Header;