import React from 'react'
import { MapPin, Search } from 'lucide-react'

const Header = ({setActiveWeather,searchQuery,setSearchQuery,isLoaded,activeWeather}) => {
    return (
        <header className={`w-full max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 mb-12 transition-all duration-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
            <div className="flex items-center gap-2 group cursor-pointer">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md group-hover:scale-110 transition-transform">
                    <MapPin className="text-white" size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">San Francisco, CA</h1>
                    <p className="text-sm opacity-70">Monday, 24 March 2024</p>
                </div>
            </div>

            <div className="relative w-full md:w-96 group">
                <input
                    type="text"
                    placeholder="Search city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-white/40 transition-all placeholder:text-white/60"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={20} />
            </div>

            <div className="flex gap-2 bg-black/10 p-1.5 rounded-2xl backdrop-blur-lg">
                {['sunny', 'rainy', 'cloudy'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setActiveWeather(type)}
                        className={`px-4 py-2 rounded-xl capitalize transition-all text-sm font-bold ${activeWeather === type ? 'bg-white text-gray-900 shadow-xl' : 'text-white/70 hover:text-white'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </header>
    )
}

export default Header
