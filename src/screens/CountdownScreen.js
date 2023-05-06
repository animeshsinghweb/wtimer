import React from "react";
import { View, StyleSheet } from "react-native";
import { Header, useTheme } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Tab, Text, TabView } from "@rneui/themed";

import AddTimer from "../components/AddTimer";

const CountdownScreen = () => {
  const { theme } = useTheme();

  const [index, setIndex] = React.useState(0);

  return (
    <SafeAreaProvider>
      <>
        <View
          style={[styles.container, { backgroundColor: theme.colors.grey5 }]}>
          <Header
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: [theme.colors.primary, theme.colors.grey5],
              start: { x: 0, y: 1.5 },
              end: { x: 0.8, y: 1.5 },
            }}
            centerComponent={{ text: "CountDown", style: styles.heading }}
          />
          <AddTimer />
          <StatusBar style="auto" />
        </View>
      </>
    </SafeAreaProvider>
  );
};

export default CountdownScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: 800,
  },
});
