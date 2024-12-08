import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import StyledText from "../StyledText/StyledText";

export default function ForecastItem({
  image,
  day,
  date,
  temperature,
}: {
  image: ImageSourcePropType;
  day: string;
  date: string;
  temperature: number;
}) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <StyledText style={styles.day}>{day}</StyledText>
      <StyledText style={styles.date}>{date}</StyledText>
      <StyledText style={styles.temperature}>{temperature}°</StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    flex: 1,
  },
  day: { flex: 1, fontSize: 24 },
  date: { flex: 1, fontSize: 24 },
  temperature: { flex: 1, fontSize: 24 },
});
