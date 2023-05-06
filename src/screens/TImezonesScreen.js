import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Header, useTheme } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Tab, Text, TabView } from "@rneui/themed";
import timezonesData from "../assets/timezones.json";

import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);

import AddTimer from "../components/AddTimer";
import TimeLists from "../components/TimeLists";
import TimesDropdown from "../components/TimesDropdown";

const TimezonesScreen = () => {
  const { theme } = useTheme();

  const timezonesFromPSTtoIST = timezonesData
    .map((v, i) => ({
      ...v,
      id: v.text,
      label: v.text,
      value: v.text,
    }))
    .filter((v) => v.offset > -8 && v.offset < 6.5);

  const [tzLists, setTzLists] = useState(timezonesFromPSTtoIST);
  const [homeTime, setHomeTime] = useState(
    dayjs().format("dddd, MMMM D, YYYY h:mm:ss A"),
  );

  const [timezones, setTimezones] = useState([
    // {
    //   value: "Pacific Daylight Time",
    //   abbr: "PDT",
    //   offset: -7,
    //   isdst: true,
    //   id: "America/Los_Angeles",
    //   text: "(UTC-07:00) Pacific Daylight Time (US & Canada)",
    //   utc: ["America/Los_Angeles", "America/Tijuana", "America/Vancouver"],
    // },
    // {
    //   value: "India Standard Time",
    //   abbr: "IST",
    //   offset: 5.5,
    //   isdst: false,
    //   text: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
    //   utc: ["Asia/Kolkata", "Asia/Calcutta"],
    // },
  ]);

  useEffect(() => {
    const filteredTimezone = timezonesFromPSTtoIST.filter((v) => {
      return timezones.findIndex((t) => t.id === v.id);
    });
    setTzLists(filteredTimezone);
  }, [timezones]);

  useEffect(() => {
    const currTime = setInterval(() => {
      setHomeTime(dayjs().format("dddd, MMMM D, YYYY h:mm:ss A"));
    }, 1000);

    return () => {
      clearInterval(homeTime);
    };
  }, []);

  const handleAddTimezone = (time) => {
    let found = timezones.find((t) => time.id === t.id);
    console.log(
      "🚀 ~ file: TImezonesScreen.js:50 ~ handleAddTimezone ~ found:",
      found,
    );
    if (!found) {
      setTimezones([...timezones, time]);
    }
    // setTimezones([...timezones, time]);

    // const filteredTimezone = tzLists.filter((v, i) => v.id != time.id);
  };

  const handleDeteleTimezone = (id) => {
    const filteredTimezone = timezones.filter((v, i) => v.id != id);
    setTimezones(filteredTimezone);
  };

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { backgroundColor: theme.colors.grey5 }]}>
        <Header
          ViewComponent={LinearGradient}
          linearGradientProps={{
            colors: [theme.colors.secondary, theme.colors.grey5],
            start: { x: 1, y: 1.5 },
            end: { x: 0.12, y: 1.5 },
          }}
          centerComponent={{ text: "Timezone", style: styles.heading }}
        />

        <ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              backgroundColor: "rgb(250, 177, 96)",
            }}>
            <Text h4 style={{ color: theme.colors.grey4 }}>
              Time at your residence is
            </Text>
            <Text
              h3
              style={{ color: theme.colors.secondary, textAlign: "center" }}>
              {new Date().toLocaleString("en-GB", { weekday: "long" })}
            </Text>
          </View>
          <TimesDropdown
            data={tzLists}
            addTimezone={(time) => handleAddTimezone(time)}
          />

          {timezones.map((v, i) => (
            <TimeLists
              id={v.id}
              onDeleteTimer={(id) => handleDeteleTimezone(id)}
              value={v.value}
              abbr={v.abbr}
              offset={v.offset}
              text={v.text}
              utc={v.utc}
              key={i}
            />
          ))}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
};

export default TimezonesScreen;

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
