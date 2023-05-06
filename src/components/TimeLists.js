import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button, Icon, ListItem, useTheme } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin

dayjs.extend(utc);
dayjs.extend(timezone);

let BLUE = "rgb(20, 154, 250)",
  DAY = "#ff8f00",
  NIGHT = "purple";

const TimeLists = ({ id, abbr, value, text, offset, utc, onDeleteTimer }) => {
  const { theme } = useTheme();

  const hours = dayjs().utc().add(offset, "hours").get("hours");

  // const timeOptions = {
  //   weekday: "short",
  //   // year: "numeric",
  //   // month: "long",
  //   // day: "numeric",
  //   // hour12: true,
  //   timeZone: utc[0],
  // };

  const [color, setColor] = useState(BLUE);
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(
    dayjs().utc().add(offset, "hours").format("dddd, MMMM D, YYYY h:mm:ss A"),
  );

  useEffect(() => {
    const currTime = setInterval(() => {
      setTime(
        dayjs()
          .utc()
          .add(offset, "hours")
          .format("dddd, MMMM D, YYYY h:mm:ss A"),
      );
      // setTime(
      //   new Date().toLocaleString(
      //     new Intl.DateTimeFormat("en", timeOptions).resolvedOptions(),
      //   ),
      // );
      if (hours > 6 && hours < 18) {
        setColor(DAY);
      } else {
        setColor(NIGHT);
      }
    }, 1000);

    return () => {
      clearInterval(currTime);
    };
  }, []);

  return (
    <View>
      <ListItem.Swipeable
        onPress={() => setShow(!show)}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: [theme.colors.grey5, color],
          start: { x: 0.1, y: 0.2 },
          end: { x: 1, y: 0.5 },
        }}
        containerStyle={{ backgroundColor: color || theme.colors.grey5 }}
        rightContent={(reset) => (
          <Button
            title="Delete"
            onPress={() => {
              onDeleteTimer(id);
              reset();
            }}
            icon={{ name: "delete", color: "white" }}
            buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
          />
        )}>
        <Icon
          raised
          reverse
          reverseColor="white"
          name={hours > 6 && hours < 18 ? "sunny-outline" : "moon-outline"}
          type="ionicon"
          color={color}
        />
        <ListItem.Content>
          <ListItem.Subtitle>
            {abbr} ( {offset} )
          </ListItem.Subtitle>
          <ListItem.Title>{value}</ListItem.Title>
          <ListItem.Subtitle style={{ color: theme.colors.grey1 }}>
            {time}
          </ListItem.Subtitle>

          {/* <ListItem.Subtitle>{distance}</ListItem.Subtitle> */}
          {show && (
            <ListItem.Subtitle style={{ color: theme.colors.grey1 }}>
              {text}
            </ListItem.Subtitle>
          )}
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
    </View>
  );
};

export default TimeLists;
