import { create } from 'zustand';
import { City, WeatherData } from '../types';
import { weatherApi } from '../api';

interface WeatherState {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  currentCity: City | null;
  resultMessage: string | null;
  fetchWeather: (city: City) => Promise<void>;
  setResultMessage: (message: string | null) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  loading: false,
  error: null,
  currentCity: null,
  resultMessage: null,

  fetchWeather: async (city: City) => {
    set({ loading: true, error: null, currentCity: city });
    try {
      const data = await weatherApi.getByCity(city);
      set({
        weather: {
          temperature: data.current.temperature_2m,
          windSpeed: data.current.wind_speed_10m,
          humidity: data.current.relative_humidity_2m,
        },
        loading: false,
        resultMessage: `✅ Погода в ${city.name} загружена`,
      });
      setTimeout(() => set({ resultMessage: null }), 3000);
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  setResultMessage: (message: string | null) => set({ resultMessage: message }),
}));