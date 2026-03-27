import { Sun, CloudRain, Cloud, Moon } from "lucide-react";

const weatherThemes = {
    day: {
      // Golden/Sun-drenched palette
      bg: "bg-gradient-to-br from-[#FF8C00] via-[#FF5F00] to-[#FFC300]",
      accent: "text-white",
      card: "bg-black/15",
    },
    night: {
      // Keeping the well-liked rainy theme
      bg: "bg-[#111015]",
      accent: "text-white",
      card: "bg-black/20",
    }
  };

  export default weatherThemes;