import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { blueColor, calibri } from "../strings/recources";
import * as Animatable from 'react-native-animatable';

const RoundBlueButton = ({ text, onPress }) => {
  const { buttonContainer, buttonText } = styles;
  return (
    <TouchableOpacity onPress={onPress}>
      <Animatable.View animation="pulse" duration={3500} style={buttonContainer}>
        <Text style={buttonText}>{text}</Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1.6,
    borderColor: blueColor,
    borderRadius: 18,
    paddingHorizontal: 22,
    minHeight: 36,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: blueColor,
    fontFamily: calibri,
    lineHeight: 24,
    fontSize: 20
  }
});

export { RoundBlueButton };
