import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { calibri, blueColor } from "../strings/recources";
import Emoji from 'react-native-emoji';

const SliderButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const SliderText = ({ text, style }) => {
  return (
    <View>
      {(text !== 'Happy' && text !== 'Sad')&&<Text style={[styles.textStyle, style]}>{text}&nbsp;</Text>}
      {text === 'Happy'&&<Emoji name="laughing" style={{fontSize: 32}}/>}
      {text === 'Sad'&&<Emoji name="disappointed" style={{fontSize: 32}}/>}
      
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: { justifyContent: "center", alignItems: "center", padding: 20 },
  textStyle: { fontFamily: calibri, fontSize: 32, color: blueColor }
});

export { SliderButton, SliderText };
