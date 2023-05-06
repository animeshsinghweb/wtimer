import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Header, useTheme } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";

import { Tab, Text, TabView } from "@rneui/themed";
import CountdownScreen from "./CountdownScreen";
import TimezonesScreen from "./TImezonesScreen";

export default () => {
  const { theme } = useTheme();

  const [index, setIndex] = React.useState(0);

  return (
    <>
      <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        disableSwipe={true}>
        <TabView.Item
          style={{ backgroundColor: theme.colors.grey5, width: "100%" }}>
          <CountdownScreen />
        </TabView.Item>
        <TabView.Item
          style={{ backgroundColor: theme.colors.grey5, width: "100%" }}>
          <TimezonesScreen />
        </TabView.Item>
      </TabView>

      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "#ff8f00",
          height: 4,
        }}
        variant="primary"
        containerStyle={{
          backgroundColor: theme.colors.grey4,
          paddingBottom: 5,
        }}>
        <Tab.Item
          title="Countdown"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "hourglass-outline", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="Timezones"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "time-outline", type: "ionicon", color: "white" }}
        />
      </Tab>
    </>
  );
};

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
