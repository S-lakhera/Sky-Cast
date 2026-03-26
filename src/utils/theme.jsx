import { Sun, CloudRain, Cloud } from "lucide-react";

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

  export default weatherThemes;