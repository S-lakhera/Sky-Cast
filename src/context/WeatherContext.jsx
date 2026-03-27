import { createContext } from "react";
import weatherThemes from "../utils/theme";
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchWeatherInfo } from "../utils/fetchData";

export const WeatherContext = createContext()

export const WeatherProvider = ({ children }) => {
    const [activeWeather, setActiveWeather] = useState(() => localStorage.getItem('themePreference') || 'night');
    const [searchQuery, setSearchQuery] = useState('Bhopal');
    const [cityDetails, setCityDetails] = useState({ name: "Bhopal" })
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [weatherInfo, setWeatherInfo] = useState()
    const [recentSearches, setRecentSearches] = useState(() => JSON.parse(localStorage.getItem('recentSearches')) || []);

    const currentTheme = weatherThemes[activeWeather]

    useEffect(() => {
        localStorage.setItem('themePreference', activeWeather);
    }, [activeWeather]);

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
                    
                    const newSearch = {
                        name: city.name,
                        admin1: city.admin1,
                        country: city.country,
                        temp: data.current.temp,
                        theme: data.current.theme,
                        timestamp: Date.now()
                    };
                    
                    setRecentSearches(prev => {
                        const filtered = prev.filter(item => item.name !== newSearch.name);
                        const updated = [newSearch, ...filtered].slice(0, 5);
                        localStorage.setItem('recentSearches', JSON.stringify(updated));
                        return updated;
                    });
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
            isLoading, isLoaded, error, setError,
            recentSearches, setRecentSearches
        }}>
            {children}
        </WeatherContext.Provider>
    )
}
