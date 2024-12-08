import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ForecastItem from "../ForecastItem/ForecastItem";
import { WeatherDetailsType } from "../../utils/types/weatherDetailsType";
import StyledText from "../StyledText/StyledText";
import { getInterpretationByCode } from "../../utils/meteo-utils";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export default function BodyForecast({
  weatherDetails,
}: {
  weatherDetails: WeatherDetailsType | undefined;
}) {
  const time = weatherDetails?.daily?.time;

  const dayToday = new Date().getDay();
  if (!time) {
    return;
  }
  const forecastArray = time.map((t, index) => {
    const day = DAYS[(dayToday + index) % 7];
    const date = new Date(t).toLocaleDateString("default", {
      day: "2-digit",
      month: "2-digit",
    });
    const interpretation = getInterpretationByCode(
      weatherDetails?.daily?.weathercode
        ? weatherDetails.daily.weathercode[index]
        : 0
    );

    const temperature = weatherDetails?.daily?.temperature_2m_max
      ? weatherDetails.daily.temperature_2m_max[index]
      : 0;
    return {
      image: interpretation?.image,
      day,
      date,
      temperature: Math.round(temperature),
    };
  });
  return (
    <View style={styles.bodyContainer}>
      <StyledText style={styles.title}>7 day forecasts</StyledText>
      {forecastArray.map((forecast) => (
        <ForecastItem
          key={forecast.date}
          image={forecast.image}
          day={forecast.day}
          date={forecast.date}
          temperature={forecast.temperature}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 15,
    gap: 20,
    marginTop: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
  },
});
