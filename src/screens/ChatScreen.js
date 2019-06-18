import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { ChatBotScreen } from "../components/screens";
import {
  select,
  inputError,
  okay,
  wrongInput
} from "../components/strings/viewText";
import {
  RoundBlueButton,
  MenuButton,
  SliderPicker,
  ChatTextInput,
  FadeInView
} from "../components/common";
import { AndroidBackHandler } from "react-navigation-backhandler";
import { DashboardScreen } from "./DashboardScreen";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { ScrollView } from "react-native-gesture-handler";
import { setTodaysScore } from "../services/FirestoreService";
import Dialog, {
  DialogTitle,
  DialogFooter,
  DialogButton,
  DialogContent
} from "react-native-popup-dialog";
import { calibri, black80, pinkColor } from "../components/strings/recources";
import { isBlank } from "../utils/StringUtils";
import { DotIndicator } from "react-native-indicators";
import { SafeAreaView, Header } from "react-navigation";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { userName } from "../services/AuthService";

const jeseyLogoText = require("../../assets/images/jeseyLogoText/jeseyLogoText.png");
const chatGif = require("../../assets/chatGif.gif");

const fadeInViewRef = "FadeInView";
const indicatorRef = "indicator";

const startScreen = "chat";

class ChatComponent extends Component {
  state = {
    clickable: true,
    isDashboardVisible: false,
    screens: null,
    value: 5,
    isDialogVisible: false,
    errorText: "",
    lastContext: []
  };

  getDashboard = () => {
    return <DashboardScreen />;
  };

  renderAdditionalThings = displayName => {
    if (displayName) {
      if (displayName == "#Score") {
        return [
          <SliderPicker
            key={"score"}
            onValueChange={value => {
              this.setState({ value });
            }}
          />,
          <RoundBlueButton
            key={select}
            text={select}
            onPress={() => {
              setTodaysScore(this.state.value);
              this.setState({ isDashboardVisible: true });
              this.getScreen("AfterScore");
            }}
          />
        ];
      }
    }
    return null;
  };

  fadeView = async show => {
    if (this.refs[fadeInViewRef]) {
      await this.refs[fadeInViewRef].manipulateView(0, 250);
      await this.refs[indicatorRef].manipulateView(1, 750);
      await this.refs[indicatorRef].manipulateView(0, 750);
      await this.refs[fadeInViewRef].manipulateView(1, 250);
    }
  };

  getScreen = async toReq => {
    var req = toReq;
    if (toReq === startScreen) {
      req = startScreen + " " + userName.split(" ")[0];
    }

    this.fadeView(false);
    await Dialogflow_V2.requestQuery(
      req,
      res => {
        console.log(`REQ: ${req}`);
        console.log(`RESULT: ${JSON.stringify(res)}`);
        if (
          res &&
          res.queryResult &&
          res.queryResult.action != "input.unknown"
        ) {
          const stringToParse = res.queryResult.fulfillmentText;
          console.log(stringToParse);
          const stringArr = stringToParse.split("###");
          const text = stringArr[0];
          const buttons = [];
          stringArr.forEach(element => {
            if (element != text) {
              if (element === "$nameEnteringButton") {
                buttons.push(
                  <RoundBlueButton
                    key={element}
                    text={userName.split(" ")[0]}
                    onPress={() => {
                      this.setState({ clickable: false });
                      this.getScreen(userName.split(" ")[0]);
                    }}
                  />                
                );
              } else {
                buttons.push(
                  <RoundBlueButton
                    key={element}
                    text={element}
                    onPress={() => {
                      this.setState({ clickable: false });
                      this.getScreen(element);
                    }}
                  />
                );
              }
            }
          });
          const screen = (
            <ChatBotScreen botText={text}>
              {this.renderAdditionalThings(res.queryResult.intent.displayName)}
              {buttons}
            </ChatBotScreen>
          );
          this.setState({
            screens: screen,
            clickable: true,
            lastContext: res.queryResult.outputContexts
              ? res.queryResult.outputContexts
              : []
          });
          this.refs["scrollView"].scrollTo({ x: 0, y: 0, animated: false });
        } else {
          this.setState({
            isDialogVisible: true,
            clickable: true,
            errorText:
              res &&
              res.queryResult &&
              res.queryResult.fulfillmentText &&
              !isBlank(res.queryResult.fulfillmentText)
                ? res.queryResult.fulfillmentText
                : inputError
          });
          Dialogflow_V2.setContexts(this.state.lastContext);
        }
      },
      error => {
        console.log(error);
      }
    );
  };

  getPages = () => {
    if (this.state.isDashboardVisible) {
      return this.getDashboard();
    }

    const { gifImageContainer, gifImage } = styles;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, marginLeft: 30, marginRight: 20 }}
          ref={"scrollView"}
          contentContainerStyle={{ justifyContent: "flex-end" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={gifImageContainer}>
            <View style={{ alignItems: "center" }}>
              <Image style={gifImage} source={chatGif} />
              <FadeInView ref={indicatorRef} toValue={0} time={0}>
                <View
                  style={{
                    height: 30,
                    width: 60,
                    marginTop: 10
                  }}
                >
                  <DotIndicator color={pinkColor} count={3} size={7} />
                </View>
              </FadeInView>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <FadeInView ref={fadeInViewRef} toValue={1} time={250}>
              {this.state.screens}
            </FadeInView>
          </View>
        </ScrollView>

        <KeyboardAvoidingView
          keyboardVerticalOffset={Header.HEIGHT + getStatusBarHeight() - 14}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <ChatTextInput
            onPress={text => {
              this.setState({ clickable: false });
              this.getScreen(text);
            }}
          />
        </KeyboardAvoidingView>
      </View>
    );
  };

  render() {
    const { container, logoContainer } = styles;
    if (!this.state.screens) {
      this.getScreen(startScreen);
    }

    return (
      <AndroidBackHandler
        onBackPress={() => {
          return true;
        }}
      >
        <SafeAreaView
          style={container}
          pointerEvents={this.state.clickable ? "auto" : "none"}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isDashboardVisible: !this.state.isDashboardVisible
              });
            }}
          >
            <View style={logoContainer}>
              <Image source={jeseyLogoText} />
              <MenuButton />
            </View>
          </TouchableOpacity>

          <View style={{ flex: 1 }}>{this.getPages()}</View>

          <Dialog
            containerStyle={{ paddingHorizontal: 40 }}
            onDismiss={() => {
              this.setState({ isDialogVisible: false });
            }}
            visible={this.state.isDialogVisible}
            dialogTitle={<DialogTitle title={wrongInput} />}
            footer={
              <DialogFooter>
                <DialogButton
                  text={okay}
                  textStyle={{
                    fontFamily: calibri,
                    fontSize: 16,
                    color: black80,
                    fontWeight: "bold"
                  }}
                  onPress={() => {
                    this.setState({ isDialogVisible: false });
                  }}
                />
              </DialogFooter>
            }
          >
            <DialogContent>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignSelf: "stretch",
                  marginTop: 10
                }}
              >
                <Text
                  style={{ fontFamily: calibri, fontSize: 16, color: black80 }}
                >
                  {this.state.errorText}
                </Text>
              </View>
            </DialogContent>
          </Dialog>
        </SafeAreaView>
      </AndroidBackHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  logoContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 20
  },
  gifImageContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 16
  },
  gifImage: {
    height: 72,
    width: 72,
    resizeMode: "contain"
  }
});

const mapStateToProps = () => {
  return {};
};

const ChatScreen = connect(
  mapStateToProps,
  {}
)(ChatComponent);

export { ChatScreen };
