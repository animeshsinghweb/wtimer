import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button, Icon, ListItem, useTheme } from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";

let BLUE = "rgb(20, 154, 250)",
  ORANGE = "#ff8f00",
  BROWN = "brown",
  TEAL = "teal",
  RED = "rgb(255, 50, 40)",
  GRAY = "#a1a1c1";

const CountDownList = ({ id, label, date, onDeleteTimer }) => {
  const { theme } = useTheme();

  const [ctimer, setCtimer] = useState("00:00");
  const [distance, setDistance] = useState(10);
  const [color, setColor] = useState(BLUE);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let countDownDate = new Date(date).getTime();

    // Update the count down every 1 second
    const cdInterval = setInterval(() => {
      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      // let distance = countDownDate - now;
      setDistance(countDownDate - now);

      let dayms = 1000 * 60 * 60 * 24;
      let minms = 1000 * 60;

      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / dayms);
      let hours = Math.floor((distance % dayms) / (minms * 60));
      let minutes = Math.floor((distance % (minms * 60)) / minms);
      let seconds = Math.floor((distance % minms) / 1000);

      // Display the result in the element with id="demo"
      setCtimer(
        days + "d " + hours + "h " + minutes + "m " + seconds + "s left for",
      );

      if (days < 1 && hours < 1 && minutes < 2) {
        // less than 5 minutes
        setColor(BROWN);
      } else if (days < 1 && hours < 1 && minutes < 5) {
        setColor(ORANGE);
      } else if (days < 1 && hours < 1) {
        setColor(TEAL);
      } else if (days < 1) {
        setColor(GRAY);
      } else {
        setColor(BLUE);
      }

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(cdInterval);
        setColor(RED);
        setCtimer("Countdown OVER");
      }
    }, 1000);

    return () => {
      clearInterval(cdInterval);
    };
  }, [ctimer]);

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
        // leftContent={(reset) => (
        //   <Button
        //     title="Edit"
        //     titleStyle={{ color: "gray" }}
        //     onPress={() => reset()}
        //     icon={{ name: "edit", color: "gray" }}
        //     buttonStyle={{ minHeight: "100%", backgroundColor: "white" }}
        //   />
        // )}
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
          name={distance < 0 ? "hourglass-end" : "hourglass-half"}
          type="font-awesome"
          color={color}
        />
        <ListItem.Content>
          <ListItem.Subtitle>{ctimer}</ListItem.Subtitle>
          <ListItem.Title>{label}</ListItem.Title>
          {/* <ListItem.Subtitle>{distance}</ListItem.Subtitle> */}
          {show && (
            <ListItem.Subtitle style={{ color: theme.colors.grey1 }}>
              {new Date(date).toLocaleString()}
            </ListItem.Subtitle>
          )}
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
    </View>
  );
};

export default CountDownList;
