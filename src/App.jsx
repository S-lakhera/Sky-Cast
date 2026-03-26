
import Header from './components/Header';
import Hero from './components/Hero';
import HourlyForecast from './components/HourlyForecast';
import SevenDayForecast from './components/SevenDayForecast';
import SunAndAirCard from './components/SunAndAirCard';
import Footer from './components/Footer';
import { useWeather } from './context/WeatherContext';
import Loading from './components/Loading';

const App = () => {

  const { isLoading, error, currentTheme, weatherInfo } = useWeather()

  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <div className={`min-h-screen w-full transition-all duration-1000 ease-in-out ${currentTheme.bg} text-white font-sans p-4 md:p-8 flex flex-col items-center overflow-x-hidden`}>

          <Header />

          {error ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center mt-20 fade-in">
              <h2 className="text-5xl font-bold mb-4">Oops!</h2>
              <p className="text-2xl font-medium opacity-80">{error}</p>
            </div>
          ) : weatherInfo ? (
            <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Hero />
                <HourlyForecast />
              </div>

              <div className="space-y-8">
                <SevenDayForecast />
                <SunAndAirCard/>
              </div>
            </main>
          ) : null}

          <Footer />
        </div>
      )}
    </>
  );
};

export default App;