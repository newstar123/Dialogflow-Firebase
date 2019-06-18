import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { black80, calibri } from "../strings/recources";

const ChatBotScreen = ({ botText, children }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
      }}
    >
      <Text
        style={{
          fontFamily: calibri,
          fontSize: 18,
          color: black80
        }}
      >
        {botText}
      </Text>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-end",
          marginTop: 70
        }}
      >
        {children}
      </View>
    </View>
  );
};

const style = StyleSheet.create({});

export { ChatBotScreen };
