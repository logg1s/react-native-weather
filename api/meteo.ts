import axios from "axios";
import { CoordinatesType } from "../utils/types/coordinate";
import { LocationDetailsType } from "../utils/types/locationDetails";
import { WeatherDetailsType } from "../utils/types/weatherDetailsType";
import { USER_AGENT } from "../utils/constaints";

export async function fetchWeatherDetailByCoords(
  coordinates: CoordinatesType
): Promise<WeatherDetailsType> {
  return (
    await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`,
      {
        headers: {
          "User-Agent": USER_AGENT,
        },
      }
    )
  ).data;
}

export async function fetchLocationDetailByCoords(
  coordinates: CoordinatesType
): Promise<LocationDetailsType> {
  return (
    await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates.latitude}&lon=${coordinates.longitude}`,
      {
        headers: {
          "User-Agent": USER_AGENT,
        },
      }
    )
  ).data;
}

export async function fetchCoordsByCity(city: string) {
  const { latitude, longitude }: CoordinatesType = (
    await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`,
      {
        headers: {
          "User-Agent": USER_AGENT,
        },
      }
    )
  ).data.results[0];
  return { latitude, longitude };
}
