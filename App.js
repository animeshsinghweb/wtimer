import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";

import WorldTimerScreen from "./src/screens/CountdownScreen";
import Routes from "./src/screens/routes";

let BLUE = "rgb(20, 154, 250)",
  ORANGE = "#ff8f00",
  BROWN = "brown",
  TEAL = "teal",
  RED = "rgb(255, 50, 40)",
  GRAY = "#a1a1c1";

const theme = createTheme({
  lightColors: {
    primary: "#e7e7e8",
  },
  darkColors: {
    primary: "#ff8f00",
    secondary: "red",
  },
  mode: "dark",
  // colors: {
  //   BLUE,
  //   ORANGE,
  //   BROWN,
  //   TEAL,
  //   RED,
  //   GRAY,
  // },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
