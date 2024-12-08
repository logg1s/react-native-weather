import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#0000005C",
    flex: 1,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 15,
  },
  view: {
    flex: 1,
    justifyContent: "center",
  },
  value: {
    fontSize: 15,
    textAlign: "center",
  },
  label: { textAlign: "center", fontSize: 18 },
});
