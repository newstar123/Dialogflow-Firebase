import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import {
  yourSelfLove,
  googleSignUpText,
  privacyPolicy
} from "../components/strings/viewText";

import { googleLogin } from "../services/AuthService";
import { LoadingView } from "../components/common";
import { chatScreenStr } from "../components/strings/navigation";
import { black80, white80, calibri } from "../components/strings/recources";
import { getTimeData } from "../services/FirestoreService";

const jeseyLogo = require("../../assets/images/jeseyLogo/jeseyLogo.png");
const googleLogo = require("../../assets/images/googleIcon/googleIcon.png");

class WelcomeComponent extends Component {
  state = {
    isLoading: false
  };

  render() {
    const {
      container,
      headerContainer,
      welcomeTextStyle,
      jeseyLogoStyle,
      bottomContainer,
      googleSignInButton,
      googleSignInImage,
      googleSignInText,
      privacyPolicyTextStyle
    } = styles;
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground style={{ flex: 1 }}>
          <View style={container}>
            <View style={headerContainer}>
              <Text style={welcomeTextStyle}>{yourSelfLove}</Text>
              <Image source={jeseyLogo} style={jeseyLogoStyle} />
            </View>

            <LoadingView
              isLoading={this.state.isLoading}
              style={bottomContainer}
            >
              <TouchableOpacity
                onPress={async () => {
                  this.setState({ isLoading: true });
                  const firebaseUserCredential = await googleLogin();
                  if (firebaseUserCredential) {
                    await getTimeData();
                    this.props.navigation.navigate(chatScreenStr);
                  } else {
                    this.setState({ isLoading: false });
                  }
                }}
              >
                <View style={googleSignInButton}>
                  <Image style={googleSignInImage} source={googleLogo} />
                  <Text style={googleSignInText}>{googleSignUpText}</Text>
                </View>
              </TouchableOpacity>
              <Text style={privacyPolicyTextStyle}>{privacyPolicy}</Text>
            </LoadingView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)"
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 87,
    marginHorizontal: 34
  },
  welcomeTextStyle: {
    fontFamily: calibri,
    fontSize: 20,
    color: "white",
    marginTop: 16,
    marginRight: 25
  },
  jeseyLogoStyle: {
    width: 75,
    height: 80
  },
  bottomContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 47
  },
  googleSignInButton: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 35,
    height: 70,
    marginHorizontal: 45,
    maxWidth: 286,
    paddingLeft: 25,
    paddingRight: 25
  },
  googleSignInImage: { width: 47, height: 30, marginRight: 25 },
  googleSignInText: {
    fontWeight: "bold",
    fontFamily: calibri,
    fontSize: 16,
    color: black80
  },
  privacyPolicyTextStyle: {
    fontFamily: calibri,
    fontSize: 14,
    color: white80,
    marginTop: 15
  }
});

const mapStateToProps = state => {
  return { text: "" };
};

const WelcomeScreen = connect(
  mapStateToProps,
  {}
)(WelcomeComponent);

export { WelcomeScreen };
