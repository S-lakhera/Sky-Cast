import React from 'react'
import { Navigation } from 'lucide-react'

const HourlyForecast = ({hourlyData, isLoaded}) => {
  return (
    <section className={`transition-all duration-1000 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Navigation size={20} className="text-white/60" />
                Hourly Forecast
              </h3>
              <button className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">See full report</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {hourlyData.map((item, i) => (
                <div key={i} className="shrink-0 w-24 bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-4 flex flex-col items-center gap-3 hover:bg-white/20 hover:-translate-y-1 transition-all cursor-pointer group">
                  <span className="text-sm opacity-60">{item.time}</span>
                  <div className="text-white group-hover:scale-110 transition-transform">{item.icon}</div>
                  <span className="text-lg font-bold">{item.temp}°</span>
                </div>
              ))}
            </div>
          </section>
  )
}

export default HourlyForecast
