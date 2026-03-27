import { Wind, Droplets, Navigation, Eye } from "lucide-react"
import { useWeather } from "../context/useWeather"
import { getWeatherIcon } from "../utils/getWeatherIcon"

const Hero = () => {
    const {currentTheme,isLoaded,weatherInfo} = useWeather()
    
    return (
        <section className={` relative overflow-hidden rounded-[2.5rem] p-6 md:p-10.5 ${currentTheme.card}  backdrop-blur-3xl border border-white/20 shadow-2xl transition-all duration-800 delay-100 transform ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        Live Updates
                    </div>
                    <h2 className="text-6xl md:text-7xl font-black tracking-tighter drop-shadow-2xl">
                        {weatherInfo.current.temp}<span className="text-5xl align-top mt-4 inline-block">°C</span>  
                    </h2>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <span className="text-2xl font-medium opacity-90">Mostly {weatherInfo.current.theme}</span>
                        <div className="h-6 w-px bg-white/30"></div>
                        <span className="text-lg opacity-70">H: {weatherInfo.current.high}° L: {weatherInfo.current.low}°</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-end">
                    {getWeatherIcon(weatherInfo.current.theme,24,"w-20 h-20 animate-bounce") }
                    <div className="mt-4 px-6 py-2 rounded-2xl bg-white/10 border border-white/10 text-sm font-medium backdrop-blur-sm">
                        Feels like {weatherInfo.current.feelsLike}°C
                    </div>
                </div>
            </div>

            {/* Weather Detail Pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                {[
                    { label: 'Wind', value: `${weatherInfo.current.wind} km/h`, icon: <Wind size={18} /> },
                    { label: 'Humidity', value: `${weatherInfo.current.humidity} %`, icon: <Droplets size={18} /> },
                    { label: 'Pressure', value: `${weatherInfo.current.pressure} hPa`, icon: <Navigation size={18} className="rotate-45" /> },
                    { label: 'Visibility', value: `${weatherInfo.current.visibility} km`, icon: <Eye size={18} /> },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl hover:bg-white/20 transition-all cursor-default border border-transparent hover:border-white/10">
                        <div className="p-2 bg-white/10 rounded-lg">{item.icon}</div>
                        <div>
                            <p className="text-[10px] uppercase tracking-wider opacity-60 font-bold">{item.label}</p>
                            <p className="font-semibold">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Hero
