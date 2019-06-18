import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { inputPlaceholder, send } from "../strings/viewText";
import { calibri, pinkColor, black30, black06 } from "../strings/recources";
import { isBlank } from "../../utils/StringUtils";
import Voice from "react-native-voice";

const mirco = require("../../../assets/images/dictationGlyph/dictationGlyph.png");

class ChatTextInput extends Component {
  state = {
    text: ""
  };

  componentDidMount() {
    Voice.onSpeechResults = this.onSpeechResult.bind(this);
  }

  componentWillUnmount() {
    Voice.removeAllListeners();
  }

  onSpeechResult = res => {
    try {
      this.setState({ text: res.value[0] });
    } catch (error) {}
  };

  render() {
    const { container, textInputStyle, buttonStyle, buttonText } = styles;
    return (
      <View style={container}>
        <TouchableOpacity
          style={{ padding: 10, paddingLeft: 15 }}
          onPressIn={() => {
            if (Voice.isAvailable()) {
              Voice.start("en-US");
            }
          }}
          onPressOut={() => {
            Voice.stop();
          }}
        >
          <Image source={mirco} />
        </TouchableOpacity>

        <TextInput
          ref={"TextInput"}
          multiline={true}
          style={textInputStyle}
          value={this.state.text}
          placeholder={inputPlaceholder}
          onChangeText={text => {
            this.setState({ text });
          }}
        />

        <TouchableOpacity
          onPress={() => {
            if (!isBlank(this.state.text)) {
              this.props.onPress(this.state.text);
              this.setState({ text: "" });
              this.refs["TextInput"].blur();
            }
          }}
        >
          <View style={buttonStyle}>
            <Text style={buttonText}>{send}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: black06
  },
  textInputStyle: {
    flex: 1,
    minHeight: 34,
    fontFamily: calibri,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 10,
    borderColor: black30,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 17
  },
  buttonStyle: {
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: pinkColor,
    marginLeft: 10,
    marginRight: 15,
    paddingHorizontal: 15,
    borderRadius: 17
  },
  buttonText: {
    fontFamily: calibri,
    fontSize: 16,
    color: "white",
    fontWeight: "bold"
  }
});

export { ChatTextInput };
