import { WeatherData, City } from '../../types';

const cities: City[] = [
  { name: 'Москва', lat: 55.7558, lon: 37.6176 },
  { name: 'Санкт-Петербург', lat: 59.9343, lon: 30.3351 },
  { name: 'Казань', lat: 55.7961, lon: 49.1064 },
  { name: 'Новосибирск', lat: 55.0084, lon: 82.9357 },
  { name: 'Екатеринбург', lat: 56.8389, lon: 60.6057 },
  { name: 'Сочи', lat: 43.5855, lon: 39.7231 },
];

interface WeatherWidgetProps {
  weather: WeatherData | null;
  loading: boolean;
  currentCity: City | null;
  onCitySelect: (city: City) => void;
}

export const WeatherWidget = ({ weather, loading, currentCity, onCitySelect }: WeatherWidgetProps) => {
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = cities.find((c) => c.name === e.target.value);
    if (city) onCitySelect(city);
  };

  const getWeatherIcon = (temp: number): string => {
    if (temp < 0) return '❄️';
    if (temp < 10) return '🌥️';
    if (temp < 20) return '🌤️';
    if (temp < 30) return '☀️';
    return '🔥';
  };

  return (
    <div className="weather-container">
      <div className="panel-controls">
        <select className="city-select" onChange={handleCityChange} value={currentCity?.name || ''}>
          <option value="">Выберите город</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="loading-spinner">⏳ Загрузка погоды...</div>}

      {weather && currentCity && !loading && (
        <div className="weather-card">
          <div className="weather-city">
            {getWeatherIcon(weather.temperature)} {currentCity.name}
          </div>
          <div className="weather-temp">{weather.temperature}°C</div>
          <div className="weather-details">
            <div>💨 Ветер: {weather.windSpeed} км/ч</div>
            <div>💧 Влажность: {weather.humidity}%</div>
          </div>
        </div>
      )}
    </div>
  );
};