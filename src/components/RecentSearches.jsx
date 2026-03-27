import React from 'react';
import { useWeather } from '../context/useWeather';
import { History } from 'lucide-react';
import { getWeatherIcon } from '../utils/getWeatherIcon';

const RecentSearches = () => {
    const { recentSearches, setSearchQuery } = useWeather();

    if (!recentSearches || recentSearches.length === 0) return null;

    return (
        <div className="w-full max-w-6xl mb-2 flex flex-col gap-3 fade-in">
            {/* <div className="flex items-center gap-2 text-white/80">
                <History size={18} />
                <h3 className="text-md font-medium">Your Recent Searches</h3>
            </div> */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {recentSearches.map((search, idx) => (
                    <div 
                        key={idx}
                        onClick={() => setSearchQuery(search.name)}
                        className={`min-w-[160px] p-4 rounded-2xl cursor-pointer backdrop-blur-md transition-all hover:scale-105 border border-white/10 ${search.theme === 'day' ? 'bg-white/20 text-white' : 'bg-black/20 text-white'}`}
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
