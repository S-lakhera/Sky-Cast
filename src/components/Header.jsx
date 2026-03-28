import React, { useState, useEffect, useRef } from 'react'
import { LocateIcon, LocationEdit, MapIcon, MapPin, Search } from 'lucide-react'
import { useWeather } from '../context/useWeather';
import { getThemeIcon } from '../utils/getWeatherIcon';

const Header = () => {
    const { activeWeather, setActiveWeather, cityDetails, setSearchQuery, isLoaded,  } = useWeather();
    
    const [cityName, setCityName] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',    // "Monday"
        day: 'numeric',      // "24"
        month: 'long',       // "March"
        year: 'numeric',      // "2024"
        hour: 'numeric',
        minute: '2-digit'
    });

    const handleSubmit = () => {
        setSearchQuery(cityName)
        setCityName("")
    }

    return (
        <header className={`w-full max-w-[1400px] 2xl:max-w-[1800px] min-[2500px]:max-w-[2400px] flex flex-col md:flex-row justify-between items-center gap-4 mb-1 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <div className="flex w-full md:w-auto items-center justify-between">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className=" md:p-2 rounded-xl backdrop-blur-md group-hover:scale-110 transition-transform">
                        <MapPin className="" size={26} />
                    </div>
                    <div>
                        <h1 className="md:text-2xl xl:text-3xl font-bold tracking-tight">{cityDetails?.name},
                            <span className="text-[12px] md:text-[14px] opacity-70 font-normal"> {cityDetails?.admin1 ? cityDetails?.admin1 + ", " : ""} {cityDetails?.country}</span></h1>
                        <p className="text-xs md:text-sm opacity-70">{currentDate}</p>
                    </div>
                </div>

                {/* Mobile Theme Toggles */}
                <div className="flex md:hidden gap-2 bg-black/10 p-1 rounded-2xl backdrop-blur-lg">
                    {['day', 'night'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveWeather(type)}
                            className={`p-2 rounded-xl capitalize transition-all duration-500 text-sm font-bold ${activeWeather === type ? 'bg-white text-gray-900 shadow-xl' : '/70 hover:'}`}
                        >
                            {getThemeIcon(type)}
                        </button>
                    ))}
                </div>
            </div>

            <div className='flex gap-3 items-center w-full md:w-auto  px-1'>
                <div className="relative w-full md:w-60 h-11 group flex gap-3 ">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search city..."
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        className="w-full  backdrop-blur-xl border border-white/50 rounded-2xl  pl-12 pr-4 outline-none focus:ring-1 focus:ring-white/40 transition-all placeholder:/70"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 /60" size={20} />
                </div>

                {/* Desktop Theme Toggles */}
                <div className="hidden md:flex gap-2 bg-black/10 p-1.5 rounded-2xl backdrop-blur-lg">
                    {['day', 'night'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveWeather(type)}
                            className={`px-4 py-2 rounded-xl capitalize transition-all duration-500 text-sm font-bold ${activeWeather === type ? 'bg-white text-gray-900 shadow-xl' : '/70 hover:'}`}
                        >
                            {getThemeIcon(type)}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    )
}

export default Header
