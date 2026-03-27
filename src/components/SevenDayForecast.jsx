import React from 'react'
import { Calendar } from 'lucide-react'
import { useWeather } from '../context/useWeather'
import { getWeatherIcon } from '../utils/getWeatherIcon'

const SevenDayForecast = () => {
  const {currentTheme, weatherInfo, isLoaded} = useWeather()
  const dailyForecast = weatherInfo.daily
  
  return (
    <section className={`rounded-[2.5rem] p-5 md:p-8 md:py-6 ${currentTheme.card} backdrop-blur-3xl border border-white/20 shadow-xl transition-all duration-1000 delay-500 transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
              <Calendar size={20} className="text-white/60" />
              7-Day Forecast
            </h3>
            <div className="space-y-4.5">
              {dailyForecast.map((day, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <span className="w-20 font-medium text-white/80 group-hover:text-white transition-colors">{day.day.slice(0, 3)}</span>
                  <div className="flex items-center gap-4 flex-1 justify-center">
                    <div className="group-hover:scale-110 transition-transform">
                      {getWeatherIcon(day.theme,22)}
                    </div>
                    <span className="hidden md:block text-[10px] text-white/40 uppercase tracking-widest font-bold">{day.condition}</span>
                  </div>
                  <div className="flex items-center gap-4 w-20 justify-end">
                    <span className="font-bold">{day.high}°</span>
                    <span className="opacity-40">{day.low}°</span>
                  </div>
                </div>
              ))}
            </div>
            {/* <button className="w-full mt-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-bold text-sm transition-all border border-white/5">
              Full 15-day Forecast
            </button> */}
          </section>
  )
}

export default SevenDayForecast
