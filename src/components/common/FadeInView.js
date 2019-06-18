import React from "react";
import { Animated } from "react-native";

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0)
  };

  componentDidMount() {
    this.manipulateView(this.props.toValue, this.props.time);
  }

  manipulateView(toValue, duration) {
    return new Promise((resolve, reject) => {
      Animated.timing(
        // Animate over time
        this.state.fadeAnim,
        {
          toValue,
          duration
        }
      ).start(() => {
        resolve();
      });
    });
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: fadeAnim
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export { FadeInView };
