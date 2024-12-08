export type WeatherDetailsType = {
  latitude?: number;
  longitude?: number;
  generationtime_ms?: number;
  utc_offset_seconds?: number;
  timezone?: string;
  timezone_abbreviation?: string;
  elevation?: number;
  current_weather_units?: CurrentWeatherUnits;
  current_weather?: CurrentWeather;
  daily_units?: DailyUnits;
  daily?: Daily;
};

export type CurrentWeather = {
  time?: string;
  interval?: number;
  temperature?: number;
  windspeed?: number;
  winddirection?: number;
  is_day?: number;
  weathercode?: number;
};

export type CurrentWeatherUnits = {
  time?: string;
  interval?: string;
  temperature?: string;
  windspeed?: string;
  winddirection?: string;
  is_day?: string;
  weathercode?: string;
};

export type Daily = {
  time?: Date[];
  weathercode?: number[];
  temperature_2m_max?: number[];
  sunrise?: string[];
  sunset?: string[];
  windspeed_10m_max?: number[];
};

export type DailyUnits = {
  time?: string;
  weathercode?: string;
  temperature_2m_max?: string;
  sunrise?: string;
  sunset?: string;
  windspeed_10m_max?: string;
};
