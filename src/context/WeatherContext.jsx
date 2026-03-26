import { createContext, useContext } from "react";
import weatherThemes from "../utils/theme";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchWeatherInfo } from "../utils/fetchData";

const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
    const [activeWeather, setActiveWeather] = useState('rainy');
    const [searchQuery, setSearchQuery] = useState('Bhopal');
    const [cityDetails, setCityDetails] = useState({ name: "Bhopal" })
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [weatherInfo, setWeatherInfo] = useState()

    const currentTheme = weatherThemes[activeWeather]

    // Trigger entry animation
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        const loadWeather = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}`);
                if (!res.data.results?.[0]) {
                    setError("City not found. Please try another search.");
                    return;
                }
                const city = res.data.results[0];
                setCityDetails(city);
                const data = await fetchWeatherInfo(city);
                if (data) {
                    setWeatherInfo(data);
                    setActiveWeather(data.current.theme);
                } else {
                    setError("Failed to fetch weather forecast.");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to connect to weather service.");
            } finally {
                setIsLoading(false);
            }
        };
        loadWeather();
    }, [searchQuery]);


    return (
        <WeatherContext.Provider value={{
            weatherInfo, cityDetails, searchQuery, setSearchQuery,
            activeWeather, setActiveWeather, currentTheme,
            isLoading, isLoaded, error, setError
        }}>
            {children}
        </WeatherContext.Provider>
    )
}

export const useWeather = () => useContext(WeatherContext)