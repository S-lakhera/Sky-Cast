// utils/getWeatherIcon.jsx
import { Sun, Cloud, CloudRain } from 'lucide-react';

export const getWeatherIcon = (theme, size = 24) => {
  const icons = { sunny: Sun, cloudy: Cloud, rainy: CloudRain };
  const Icon = icons[theme] || Sun;
  return <Icon size={size} />;
};
