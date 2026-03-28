import React from 'react'
import { Sunrise, Sunset } from 'lucide-react'
import { useWeather } from '../context/useWeather';

const SunAndAirCard = () => {
  const { weatherInfo, isLoaded, currentTheme } = useWeather()
  const sun = weatherInfo.sunAndAir;

  return (
    <section className={`rounded-4xl p-5 md:p-6  backdrop-blur-2xl border ${currentTheme.card} border-white/10 transition-all duration-1000 delay-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="flex justify-between items-center mb-6">
        <p className="text-md uppercase tracking-widest opacity-60  font-bold">Air Quality</p>
        <p className="text-md font-bold">{sun.aqi <= 50? `Good - ${sun.aqi}`:sun.aqi <= 100 ? `Moderate - ${sun.aqi}` :`Unhealthy - ${sun.aqi}`} AQI</p>
      </div>
      <div className="w-full h-2 bg-white/20 rounded-full mb-8 overflow-hidden">
        <div className="h-full w-1/4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <Sunrise className="text-yellow-200" size={24} />
          <div>
            <p className="text-[10px] uppercase opacity-40 font-bold">Sunrise</p>
            <p className="text-sm font-semibold">{sun.sunrise}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Sunset className="text-orange-300" size={24} />
          <div>
            <p className="text-[10px] uppercase opacity-40 font-bold">Sunset</p>
            <p className="text-sm font-semibold">{sun.sunset}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SunAndAirCard
