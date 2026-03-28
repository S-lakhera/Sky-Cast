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
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&past_days=1`

        const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.latitude}&longitude=${location.longitude}&current=us_aqi`;


        const [weatherRes, aqiRes] = await Promise.all([
            axios.get(weatherUrl),
            axios.get(aqiUrl)
        ]);
        const apiData = weatherRes.data;
        const aqiData = aqiRes.data;

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');

        const localHourStr = `${year}-${month}-${day}T${hour}:00`;
        let startIndex = apiData.hourly.time.findIndex(t => t === localHourStr);

        if (startIndex === -1) {
            startIndex = apiData.hourly.time.findIndex(t => new Date(t) >= now);
        }
        if (startIndex === -1) startIndex = 0;

        const formattedData = {
            current: {
                temp: Math.round(apiData.current.temperature_2m),
                feelsLike: Math.round(apiData.current.apparent_temperature),
                high: Math.round(apiData.daily.temperature_2m_max[1]), // Index 1 is Today when past_days=1
                low: Math.round(apiData.daily.temperature_2m_min[1]),
                condition: getWeatherStatus(apiData.current.weather_code).status,
                theme: getWeatherStatus(apiData.current.weather_code).theme,
                wind: apiData.current.wind_speed_10m,
                humidity: apiData.current.relative_humidity_2m,
                pressure: apiData.current.surface_pressure,
                visibility: apiData.current.visibility || 10,
            },
            forecast: {
                yesterday: {
                    temp: Math.round((apiData.daily.temperature_2m_max[0] + apiData.daily.temperature_2m_min[0]) / 2),
                    high: Math.round(apiData.daily.temperature_2m_max[0]),
                    low: Math.round(apiData.daily.temperature_2m_min[0]),
                    theme: getWeatherStatus(apiData.daily.weather_code[0]).theme,
                },
                today: {
                    temp: Math.round(apiData.current.temperature_2m),
                    high: Math.round(apiData.daily.temperature_2m_max[1]),
                    low: Math.round(apiData.daily.temperature_2m_min[1]),
                    theme: getWeatherStatus(apiData.current.weather_code).theme,
                },
                tomorrow: {
                    temp: Math.round((apiData.daily.temperature_2m_max[2] + apiData.daily.temperature_2m_min[2]) / 2),
                    high: Math.round(apiData.daily.temperature_2m_max[2]),
                    low: Math.round(apiData.daily.temperature_2m_min[2]),
                    theme: getWeatherStatus(apiData.daily.weather_code[2]).theme,
                }
            },
            hourly: apiData.hourly.time.slice(startIndex+1, startIndex + 9).map((time, index) => ({
                time: new Date(time).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    hour12: true
                }),
                temp: Math.round(apiData.hourly.temperature_2m[startIndex + index]),
                theme: getWeatherStatus(apiData.hourly.weather_code[startIndex + index]).theme
            })),
            daily: apiData.daily.time.slice(1).map((date, index) => ({ // Slice(1) to skip Yesterday in the 7-day list
                day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
                high: Math.round(apiData.daily.temperature_2m_max[index + 1]),
                low: Math.round(apiData.daily.temperature_2m_min[index + 1]),
                condition: getWeatherStatus(apiData.daily.weather_code[index + 1]).status,
                theme: getWeatherStatus(apiData.daily.weather_code[index + 1]).theme
            })),
            sunAndAir: {
                sunrise: new Date(apiData.daily.sunrise[1]).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                sunset: new Date(apiData.daily.sunset[1]).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                aqi: aqiData.current.us_aqi // REAL AQI HERE!
            }
        };

        return formattedData;

    } catch (error) {
        console.error("API Fetch Error:", error);
        return null;
    }
};