import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  interpretation: { alignItems: "flex-end" },
  box_temperature: {
    flex: 1,
  },
  box_touchTemp: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  box_interpretation: {
    justifyContent: "space-between",
  },
  temperature: {
    fontSize: 130,
  },
  img_temperature: {
    width: 50,
    height: 50,
  },
  address: {
    fontSize: 20,
  },
  clock: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  box_address: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-evenly",
  },
});
