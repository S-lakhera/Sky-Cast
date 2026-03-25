import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Wind,
  Droplets,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Thermometer,
  Navigation,
  Eye,
  Sunrise,
  Sunset,
  MoreHorizontal,
  ChevronRight,
  Calendar
} from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import HourlyForecast from './components/HourlyForecast';
import SevenDayForecast from './components/SevenDayForecast';
import SunAndAirCard from './components/SunAndAirCard';

const App = () => {
  const [activeWeather, setActiveWeather] = useState('rainy');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger entry animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Updated Theme Colors
  const weatherThemes = {
    sunny: {
      // Golden/Sun-drenched palette
      bg: "bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600",
      accent: "text-amber-100",
      card: "bg-white/10",
      icon: <Sun className="w-24 h-24 text-yellow-100 animate-bounce drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
    },
    rainy: {
      // Keeping the well-liked rainy theme
      bg: "bg-gradient-to-br from-slate-700 via-blue-800 to-slate-900",
      accent: "text-blue-200",
      card: "bg-black/20",
      icon: <CloudRain className="w-24 h-24 text-blue-300 animate-bounce" />
    },
    cloudy: {
      // Less foggy, more "bright day with clouds"
      bg: "bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-300",
      accent: "text-blue-50",
      card: "bg-white/15",
      icon: <Cloud className="w-24 h-24 text-white animate-bounce opacity-90" />
    }
  };

  const currentTheme = weatherThemes[activeWeather];

  const hourlyData = [
    { time: '12 PM', temp: 28, icon: <Sun size={20} /> },
    { time: '1 PM', temp: 29, icon: <Sun size={20} /> },
    { time: '2 PM', temp: 30, icon: <Sun size={20} /> },
    { time: '3 PM', temp: 29, icon: <Cloud size={20} /> },
    { time: '4 PM', temp: 27, icon: <CloudRain size={20} /> },
    { time: '5 PM', temp: 26, icon: <CloudRain size={20} /> },
    { time: '6 PM', temp: 24, icon: <Cloud size={20} /> },
    { time: '7 PM', temp: 22, icon: <Sun size={20} /> },
  ];

  const dailyForecast = [
    { day: 'Monday', high: 30, low: 22, condition: 'Sunny', icon: <Sun size={24} className="text-yellow-200" /> },
    { day: 'Tuesday', high: 28, low: 21, condition: 'Partly Cloudy', icon: <Cloud size={24} className="text-white/80" /> },
    { day: 'Wednesday', high: 25, low: 19, condition: 'Rainy', icon: <CloudRain size={24} className="text-blue-200" /> },
    { day: 'Thursday', high: 24, low: 18, condition: 'Thunderstorm', icon: <CloudLightning size={24} className="text-indigo-200" /> },
    { day: 'Friday', high: 27, low: 20, condition: 'Sunny', icon: <Sun size={24} className="text-yellow-200" /> },
    { day: 'Saturday', high: 29, low: 22, condition: 'Clear', icon: <Sun size={24} className="text-yellow-200" /> },
    { day: 'Sunday', high: 31, low: 24, condition: 'Hot', icon: <Sun size={24} className="text-orange-200" /> },
  ];

  return (
    <div className={`min-h-screen w-full transition-all duration-1000 ease-in-out ${currentTheme.bg} text-white font-sans p-4 md:p-8 flex flex-col items-center overflow-x-hidden`}>

      {/* Search Header */}
      <Header
        activeWeather={activeWeather}
        setActiveWeather={setActiveWeather}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isLoaded={isLoaded}
      />

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Hero & Hourly */}
        <div className="lg:col-span-2 space-y-8">

          {/* Hero Card */}
          <Hero
            currentTheme={currentTheme}
            isLoaded={isLoaded}
          />

          {/* Hourly Forecast */}
          <HourlyForecast
          hourlyData={hourlyData}
          isLoaded={isLoaded}
          />
        </div>

        {/* Right Column: 7-Day Forecast & Misc */}
        <div className="space-y-8">

          {/* 7-Day Forecast Card */}
          
          <SevenDayForecast
          isLoaded={isLoaded}
          currentTheme={currentTheme}
          dailyForecast={dailyForecast}
          />

          {/* Sun & Air Card */}
          <SunAndAirCard isLoaded={isLoaded}/>
          
        </div>
      </main>

      {/* Footer / Branding */}
      <footer className="mt-16 pb-8 text-center text-white/40 text-[10px] uppercase tracking-widest font-bold">
        <p>© 2026 SkyCast • Designed for Clarity</p>
      </footer>
    </div>
  );
};

export default App;