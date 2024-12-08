import { Dimensions, StyleSheet } from "react-native";

const { width: deviceWidth } = Dimensions.get("window");

export const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    width: Math.min(deviceWidth, 500),
  },
  bgImg: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  img: {
    opacity: 0.8,
    width: "100%",
    height: "100%",
  },
});
