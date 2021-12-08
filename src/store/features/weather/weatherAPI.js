import axios from "axios";

const headers = {
    "Content-Type": "application/json",
    "Timestamp": (new Date()).toISOString(),
}  

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

export const getCurrentByName = async (name) => {
    try {
        const res = await axios.get(`${baseUrl}q=${name}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`, headers);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getCurrentByCoords = async (lat, lon) => {
    try {
        const res = await axios.get(`${baseUrl}lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`, headers);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getForecastByName = (name) => {

};

export const getForecastByCoords = (lat, lon) => {

}