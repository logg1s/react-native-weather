import { View, Text, StyleSheet } from "react-native";
import React from "react";
import StyledText from "../StyledText/StyledText";
import { SCREEN } from "../../App";

export default function HeaderForecast({
  address,
  onPressBack,
}: {
  address: string;
  onPressBack: (screen: SCREEN) => void;
}) {
  return (
    <View style={styles.headerContainer}>
      <StyledText style={styles.back} onPress={() => onPressBack(SCREEN.HOME)}>
        {"<"}
      </StyledText>
      <StyledText style={styles.forecastText}>{address}</StyledText>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
  },
  back: { width: 50 },
  forecastText: {
    textAlign: "center",
    flex: 1,
    marginRight: 50,
    fontSize: 18,
  },
});
