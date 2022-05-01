import { StyleSheet } from "react-native";

export const useStyles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: 90,
    minHeight: 40,
    justifyContent: "center",
  },
  paragraph: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    marginTop: 20,
    alignSelf: "baseline",
  },
  actions: {
    justifyContent: "space-around",
    padding: 20,
  },
});
