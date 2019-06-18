import React, { Component } from "react";
import Slider from "react-native-slider";
import { StyleSheet, View, Text } from "react-native";
import { blueColor } from "../strings/recources";
import { SliderButton, SliderText } from "./SliderViews";
import { sad, happy } from "../strings/viewText";

class SliderPicker extends Component {
  state = {
    pickerValue: 5
  };

  setNewValue = pickerValue => {
    this.setState({ pickerValue });
    this.props.onValueChange(pickerValue);
  };

  render() {
    const {
      container,
      countContainer,
      sliderThumb,
      textUnderSliderContainer,
      textUnderSliderStyle
    } = styles;
    return (
      <View style={container}>
        <View style={countContainer}>
          <SliderButton
            text={"-"}
            onPress={() => {
              if (this.state.pickerValue > 0) {
                this.setNewValue(this.state.pickerValue - 1);
              }
            }}
          />
          <SliderText text={this.state.pickerValue} />
          <SliderButton
            text={"+"}
            onPress={() => {
              if (this.state.pickerValue < 10) {
                this.setNewValue(this.state.pickerValue + 1);
              }
            }}
          />
        </View>
        <Slider
          minimumValue={0}
          maximumValue={10}
          value={this.state.pickerValue}
          step={1}
          onValueChange={pickerValue => {
            this.setNewValue(pickerValue);
          }}
          minimumTrackTintColor={blueColor}
          thumbTintColor={"white"}
          thumbStyle={sliderThumb}
        />
        <View style={textUnderSliderContainer}>
          <SliderText text={sad} style={textUnderSliderStyle} />
          <SliderText text={happy} style={textUnderSliderStyle} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "stretch",
    marginBottom: 30
  },
  countContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  sliderThumb: {
    elevation: 2,
    height: 28,
    width: 28,
    borderRadius: 90,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  textUnderSliderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },
  textUnderSliderStyle: {
    fontSize: 24
  }
});

export { SliderPicker };
