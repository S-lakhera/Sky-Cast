import axios from "axios";

// 1. Helper function ko yahi define karein ya upar se import karein
const getWeatherStatus = (code) => {
    if (code <= 1) return { status: 'Sunny', theme: 'sunny' };
    if (code <= 3) return { status: 'Cloudy', theme: 'cloudy' };
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { status: 'Rainy', theme: 'rainy' };
    return { status: 'Sunny', theme: 'sunny' };
};

export const fetchWeatherInfo = async (location) => {
    // Location check
    if (!location || !location.latitude || !location.longitude) return null;

    try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`);

        const apiData = response.data;

        const formattedData = {
            current: {
                temp: Math.round(apiData.current.temperature_2m),
                feelsLike: Math.round(apiData.current.apparent_temperature),
                high: Math.round(apiData.daily.temperature_2m_max[0]),
                low: Math.round(apiData.daily.temperature_2m_min[0]),
                condition: getWeatherStatus(apiData.current.weather_code).status,
                theme: getWeatherStatus(apiData.current.weather_code).theme,
                wind: apiData.current.wind_speed_10m,
                humidity: apiData.current.relative_humidity_2m,
                pressure: apiData.current.surface_pressure,
                visibility: apiData.current.visibility || 10,
            },
            hourly: apiData.hourly.time.slice(0, 8).map((time, index) => ({
                time: new Date(time).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    hour12: true
                }),
                temp: Math.round(apiData.hourly.temperature_2m[index]),
                theme: getWeatherStatus(apiData.hourly.weather_code[index]).theme
            })),
            daily: apiData.daily.time.map((date, index) => ({
                day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
                high: Math.round(apiData.daily.temperature_2m_max[index]),
                low: Math.round(apiData.daily.temperature_2m_min[index]),
                condition: getWeatherStatus(apiData.daily.weather_code[index]).status,
                theme: getWeatherStatus(apiData.daily.weather_code[index]).theme
            })),
            sunAndAir: {
                sunrise: new Date(apiData.daily.sunrise[0]).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                sunset: new Date(apiData.daily.sunset[0]).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                aqi: 24
            }
        };

        return formattedData; 

    } catch (error) {
        console.error("API Fetch Error:", error);
        return null;
    }
};