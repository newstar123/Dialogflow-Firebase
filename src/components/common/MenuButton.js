import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { black80 } from "../strings/recources";

const MenuButton = ({ onPress }) => {
  const { container, line } = styles;
  return (
    <View style={container}>
      <View style={line} />
      <View style={line} />
      <View style={line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "column" },
  line: {
    height: 2,
    width: 16,
    backgroundColor: black80,
    margin: 2
  }
});

export { MenuButton };
