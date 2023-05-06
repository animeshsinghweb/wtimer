import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import DatePicker from "react-native-date-picker";
import { Input } from "@rneui/themed";
import CountDownList from "./CountDownList";
import Ripple from "react-native-material-ripple";

const AddTimer = ({ params }) => {
  const [date, setDate] = useState(new Date());
  const [label, setLabel] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef();

  const { theme } = useTheme();

  const [countdowns, setCountdowns] = useState([]);

  const handleDeteleTimer = (id) => {
    const filteredCountdowns = countdowns.filter((v) => v.id !== id);
    setCountdowns(filteredCountdowns);
  };

  return (
    <ScrollView style={styles.container}>
      <>
        <View>
          {countdowns.map((v, i) => (
            <CountDownList
              key={i}
              id={v.id}
              label={v.label}
              date={v.date}
              onDeleteTimer={(id) => handleDeteleTimer(id)}
            />
          ))}
        </View>

        <View style={styles.form}>
          <Input
            placeholder="Name of the timer"
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus={true}
            ref={inputRef}
            value={label}
            onChangeText={(v) => setLabel(v)}
            // leftIcon={{ type: "font-awesome", name: "chevron-left" }}
          />

          <Ripple
            rippleSize={400}
            rippleContainerBorderRadius={120}
            onPress={() => setOpen(true)}>
            <Button
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: [theme.colors.primary, theme.colors.grey5],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              buttonStyle={styles.button}
              title="Add Countdown"
              titleStyle={styles.buttonTitle}
              type="outline"
              onPress={() => setOpen(true)}
            />
          </Ripple>

          <DatePicker
            modal
            open={open}
            date={date}
            minimumDate={new Date()}
            confirmText="Start Countdown"
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
              inputRef.current.clear();
              setCountdowns([
                ...countdowns,
                { label, date, id: new Date().getTime() },
              ]);
              setLabel("Label #" + (countdowns.length + 2));
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          {/* <Text>{label + " " + JSON.stringify(date)}</Text> */}
        </View>
      </>
    </ScrollView>
  );
};

export default AddTimer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 0,
  },

  form: {
    padding: 20,
  },

  button: {
    borderRadius: 30,
    borderColor: "transparent",
    marginHorizontal: 20,
    // width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",

    shadowColor: "rgba(240,240,240, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: "white",
  },
});
