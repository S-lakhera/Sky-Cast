// utils/getWeatherIcon.jsx
import { Sun, Cloud, CloudRain, Moon } from 'lucide-react';

export const getWeatherIcon = (theme, size = 24, className="") => {
  const icons = { sunny: Sun, cloudy: Cloud, rainy: CloudRain };
  const Icon = icons[theme] || Sun;
  return <Icon size={size} className={className}/>;
};

export const getThemeIcon = (theme, size = 24, className="") => {
  const icons = { day: Sun, night: Moon };
  const Icon = icons[theme] || Moon;
  return <Icon size={size} className={className}/>;
};
