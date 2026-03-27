import { Sun, CloudRain, Cloud, Moon } from "lucide-react";

const weatherThemes = {
    day: {
      // Golden/Sun-drenched palette
      bg: "bg-gradient-to-br from-[#FF8C00] via-[#FF5F00] to-[#FFC300]",
      accent: "text-amber-900",
      card: "bg-white/10",
      
      icon: <Sun className="w-24 h-24 text-yellow-100 animate-bounce drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
    },
    night: {
      // Keeping the well-liked rainy theme
      bg: "bg-[#111015]",
      accent: "text-blue-200",
      card: "bg-gray-800/10",
      icon: <Moon className="w-24 h-24 text-blue-300 animate-bounce" />
    }
  };

  export default weatherThemes;