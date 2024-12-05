import axios from "axios";
import { CoordinatesType } from "../utils/types/coordinate";

export async function fetchWeatherByCoords(coordinates: CoordinatesType) {
  try {
    return (
      await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lng}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`
      )
    ).data;
  } catch (err) {
    console.log("Error in fetchWeatherByCoords - " + err);
  }
}
