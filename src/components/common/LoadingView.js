import React from "react";
import { View } from "react-native";
import { Spinner } from "./Spinner";

const LoadingView = ({ isLoading, children, style }) => {
  if (isLoading) {
    return <Spinner />;
  } else {
    return <View style={[style]}>{children}</View>;
  }
};

export { LoadingView };
