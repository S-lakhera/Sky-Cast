import React from 'react';
import { useWeather } from '../context/useWeather';
import { History } from 'lucide-react';
import { getWeatherIcon } from '../utils/getWeatherIcon';

const RecentSearches = () => {
    const { recentSearches, setSearchQuery, currentTheme } = useWeather();

    if (!recentSearches || recentSearches.length === 0) return null;

    return (
        <div className="w-full max-w-[1400px] 2xl:max-w-[1800px] min-[2500px]:max-w-[2400px] my-2.5 flex flex-col gap-3 fade-in">
            
            <div className="flex gap-4 overflow-x-hidden pb-2 scrollbar-hide">
                {recentSearches.map((search, idx) => (
                    <div 
                        key={idx}
                        onClick={() => setSearchQuery(search.name)}
                        className={`min-w-[160px] p-4 rounded-2xl cursor-pointer backdrop-blur-md transition-all duration-250 hover:scale-105 border border-white/10 ${currentTheme.card}`}
                    >
                        <div className='flex w-full justify-between'>
                            <p className="text-xs opacity-70 truncate">{search.country}</p>
                            {getWeatherIcon(search.theme)}
                        </div>
                        <h4 className="font-bold text-lg flex justify-between items-center">
                            {search.name} <span className="text-sm font-semibold">{Math.round(search.temp)}°C</span>
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentSearches;
