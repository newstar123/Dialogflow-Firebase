import firebase, { RNFirebase } from "react-native-firebase";
import { GoogleSignin } from "react-native-google-signin";
import { getDateInFormat } from "../utils/DateUtils";
import moment from "moment";
import { startTime } from "../../App";

export const setTodaysScore = async score => {
  try {
    const todayObj = staticDays.find(item => item.date == getDateInFormat());
    if (todayObj) {
      staticDays[staticDays.indexOf(todayObj)].score = score;
    } else {
      staticDays.push({
        date: getDateInFormat(),
        score: score,
        time: new Date().getTime() - startTime,
        year: moment().year(),
        month: moment().month()
      });
    }

    const userData = await GoogleSignin.getCurrentUser();
    if (userData && userData.user && userData.user.id) {
      const toSet = { score };
      await firebase
        .firestore()
        .collection("users")
        .doc(userData.user.id)
        .collection("days")
        .doc(getDateInFormat())
        .set(toSet, { merge: true });
    }
  } catch (error) {
    console.log(error);
  }
};

export var staticDays = [];

export const getTimeData = async () => {
  try {
    const userData = await GoogleSignin.getCurrentUser();
    if (userData && userData.user && userData.user.id) {
      const time = moment();
      const thisMothsResults = await firebase
        .firestore()
        .collection("users")
        .doc(userData.user.id)
        .collection("days")
        // .where("year", "==", time.year())
        // .where("month", "==", time.month())
        .get();
      const days = [];
      thisMothsResults.docs.forEach(elemnt => {
        days.push({
          date: elemnt.id,
          score: elemnt.get("score") ? elemnt.get("score") : null,
          time: elemnt.get("time") ? elemnt.get("time") : 0
        });
      });
      console.log(days);
      staticDays = days;
      return days;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const setTodaysTime = async () => {
  try {
    const userData = await GoogleSignin.getCurrentUser();
    if (userData && userData.user && userData.user.id) {
      const timeNow = moment();
      const ref = await firebase
        .firestore()
        .collection("users")
        .doc(userData.user.id)
        .collection("days")
        .doc(getDateInFormat());
      await firebase.firestore().runTransaction(async transaction => {
        const day = {
          time: 60000,
          year: timeNow.year(),
          month: timeNow.month()
        };
        const doc = await transaction.get(ref);
        if (!doc.exists || !doc.get("time")) {
          transaction.set(ref, day, { merge: true });
          return 1;
        }
        const oldTime = doc.get("time");
        day.time += oldTime;
        transaction.set(ref, day, { merge: true });
      });
    }
  } catch (error) {
    console.log(error);
  }
};
