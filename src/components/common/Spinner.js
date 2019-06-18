import React from "react";
import { View, ActivityIndicator } from "react-native";

const Spinner = ({ size, absolute }) => {
  const view = (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || "large"} />
    </View>
  );
  if (absolute) {
    return <View style={{ marginBottom: 50 }}>{view}</View>;
  } else {
    return view;
  }
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

export { Spinner };
