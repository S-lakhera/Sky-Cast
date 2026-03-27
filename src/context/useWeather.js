import { useContext } from "react";
import { WeatherContext } from "./WeatherContext";

export const useWeather = () => useContext(WeatherContext);