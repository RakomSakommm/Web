export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
}

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  humidity: number;
}

export interface WeatherResponse {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
}

export interface City {
  name: string;
  lat: number;
  lon: number;
}