import { useWeatherStore } from '../store/weatherStore';
import { ResultBox } from '../components/common/ResultBox';
import { WeatherWidget } from '../components/weather/WeatherWidget';

export const WeatherPage = () => {
  const { weather, loading, error, currentCity, resultMessage, fetchWeather, setResultMessage } =
    useWeatherStore();

  return (
    <section className="panel active-panel">
      <div className="panel-header">
        <h2>🌤️ Прогноз погоды</h2>
        <p>Open-Meteo API — GET запрос</p>
      </div>

      <ResultBox message={resultMessage} />
      {error && <div className="error-state">❌ {error}</div>}

      <WeatherWidget
        weather={weather}
        loading={loading}
        currentCity={currentCity}
        onCitySelect={fetchWeather}
      />
    </section>
  );
};