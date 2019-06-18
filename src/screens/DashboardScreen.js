import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Share,
  TouchableOpacity
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { connect } from "react-redux";
import {
  pinkColor,
  pinkColor10,
  calibri,
  black80,
  black50,
  white,
  shareButtonColor
} from "../components/strings/recources";
import {
  min,
  week,
  month,
  today,
  hrs,
  inApp,
  totalReward,
  shareMessage,
  dashboardBottomLabel
} from "../components/strings/viewText";
import { staticDays } from "../services/FirestoreService";
import { getDateInFormat } from "../utils/DateUtils";
import { startTime } from "../../App";
import moment from "moment";
import Emoji from "react-native-emoji";

const shareImage = require("../../assets/images/share/share.png");

class DashboardComponent extends Component {
  state = {
    todayProgress: 0,
    weekProgress: 0,
    monthProgress: 0,
    todayTime: 0,
    weekTime: 0,
    monthTime: 0,
    totalReward: 0
  };

  getCircle = (size, width, progress, textStyle, text) => {
    return (
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={progress}
        rotation={0}
        tintColor={pinkColor}
        backgroundColor={pinkColor10}
        lineCap="round"
      >
        {() => <Text style={textStyle}>{Math.round(text * 100) / 100}%</Text>}
      </AnimatedCircularProgress>
    );
  };

  componentDidMount() {
    var momentNow = moment();
    var today = staticDays.find(item => item.date == getDateInFormat());
    var todayTime = new Date().getTime() - startTime;
    var todayTotal = 0;
    if (today) {
      todayTime += today.time;
      todayTotal = today.score;
    }

    var weekTime = todayTime;
    var monthTime = todayTime;
    var totalReward = todayTime;

    var weekCounter = 0;
    var weekTotal = 0;
    var mothCounter = 0;
    var monthTotal = 0;

    staticDays.forEach(item => {
      var momentObj = moment(item.date);
      if (
        momentObj.year() == momentNow.year() &&
        momentObj.month() == momentNow.month() &&
        momentObj.isoWeek() == momentNow.isoWeek()
      ) {
        weekTime += item.time;
        if (item.score) {
          weekTotal += item.score;
          weekCounter++;
        }
      }
      if (
        momentObj.year() == momentNow.year() &&
        momentObj.month() == momentNow.month()
      ) {
        monthTime += item.time;
        if (item.score) {
          monthTotal += item.score;
          mothCounter++;
        }
      }
      totalReward += item.time;
    });

    this.setState({
      todayProgress: todayTotal * 10,
      weekProgress: weekCounter != 0 ? (weekTotal / weekCounter) * 10 : 0,
      monthProgress: weekCounter != 0 ? (monthTotal / mothCounter) * 10 : 0,
      todayTime,
      weekTime,
      monthTime,
      totalReward: Math.round(totalReward / 1000 / 60)
    });
  }

  getTime = mills => {
    const timeInSec = mills / 1000;
    var minutes = Math.round(timeInSec / 60);
    var hours = 0;
    if (minutes > 60) {
      hours = Math.floor(minutes / 60);
      minutes %= 60;
    }
    if (hours > 0) {
      return `${hours}${hrs} ${minutes}${min}`;
    } else {
      return `${minutes} ${min}`;
    }
  };

  renderRow = (topText, progress, mins) => {
    const { otherRow, pinkText } = styles;
    const textStyle = [pinkText, { fontSize: 32 }];
    return (
      <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <Text style={otherRow}>{topText}</Text>
        <View
          style={{ flexDirection: "row", marginTop: 16, alignItems: "center" }}
        >
          {this.getCircle(120, 5, progress, textStyle, progress)}
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={textStyle}>{this.getTime(mins)}</Text>
            <Text style={{ fontFamily: calibri, fontSize: 16, color: black50 }}>
              {inApp}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {
      todayRow,
      todayRowText,
      pinkText,
      totalRewardContainer,
      totalRewardText
    } = styles;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={todayRow}>
          <Text style={todayRowText}>{today}</Text>
          <View style={{ marginTop: 25 }}>
            {this.getCircle(
              150,
              6,
              this.state.todayProgress,
              [pinkText, { fontSize: 50 }],
              this.state.todayProgress
            )}
          </View>

          {this.renderRow(week, this.state.weekProgress, this.state.weekTime)}
          {this.renderRow(
            month,
            this.state.monthProgress,
            this.state.monthTime
          )}

          <View style={{ flexDirection: "row", marginTop: 100 }}>
            <View style={totalRewardContainer}>
              <Text style={totalRewardText}>{totalReward}</Text>
              <Text style={[totalRewardText, { fontWeight: "bold" }]}>
                {this.state.totalReward + " "}
              </Text>
              <Emoji name={"crown"} fontSize={40} />
            </View>

            <TouchableOpacity
              onPress={async () => {
                try {
                  const result = await Share.share({
                    message: shareMessage
                  });

                  if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                    } else {
                    }
                  } else if (result.action === Share.dismissedAction) {
                  }
                } catch (error) {
                  console.log("Sharing error\n" + error);
                }
              }}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  marginLeft: 20,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: shareButtonColor
                }}
              >
                <Image source={shareImage} />
              </View>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: calibri,
              fontSize: 14,
              color: black50,
              textAlign: "center",
              marginTop: 12,
              marginHorizontal: 47
            }}
          >
            {dashboardBottomLabel}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  todayRow: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 36,
    marginLeft: 30,
    marginRight: 20
  },
  todayRowText: {
    fontFamily: calibri,
    fontSize: 20,
    color: black80,
    fontWeight: "bold"
  },
  otherRow: {
    fontFamily: calibri,
    fontSize: 17,
    color: black80,
    marginTop: 20
  },
  pinkText: { fontFamily: calibri, color: pinkColor, textAlign: "center" },
  totalRewardContainer: {
    height: 50,
    flexDirection: "row",
    backgroundColor: pinkColor,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  totalRewardText: { fontFamily: calibri, fontSize: 16, color: white }
});

const mapStateToProps = () => {
  return {};
};

const DashboardScreen = connect(
  mapStateToProps,
  {}
)(DashboardComponent);

export { DashboardScreen };
