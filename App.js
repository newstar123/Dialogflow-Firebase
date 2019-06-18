import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { WelcomeScreen, ChatScreen } from "./src/screens";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ignoreWarnings from "react-native-ignore-warnings";
import SplashScreen from "react-native-splash-screen";
import { Dialogflow_V2 } from "react-native-dialogflow";
import {
  welcomeScreenStr,
  chatScreenStr
} from "./src/components/strings/navigation";
import { signIn } from "./src/services/AuthService";
import { setTodaysTime, getTimeData } from "./src/services/FirestoreService";

export const startTime = new Date().getTime();
export default class App extends Component {
  constructor() {
    super();
    ignoreWarnings([
      "ViewPagerAndroid has been extracted",
      "Slider has been extracted",
      "Remote debugger is in a background tab which",
      "`scaleY` supplied to ",
      "Failed prop type: Invalid prop `children` of type `object` supplied to `DialogActionList`"
    ]);
    //ignoreWarnings("error", ["Error: CANCELED"]);
    // Dialogflow_V2.setConfiguration(
    //   "dialogflow-maskxr@jesey-e783d.iam.gserviceaccount.com",
    //   "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCYZCEnRgeJgusZ\nULOkUJITDr9w06fcAJiwO++/IFkT/GCRv9VP8EmPcGAJDnYqhb35qGS530UGhPJj\nVaF6bNeVXHq8jlr9kUwXySyXl8NruQ0T20ssyl/IBrjxrgFNhD2UyWrS+eJ4M3vY\nargqm2982vfrKONxGEzqaNoRqiVziEYl4wDnAsSzoMgFa+S1H0b1/n2oEh6gyx3Y\nmOTfXzN26dKY1keNOimFpEn4jtw9Ep6xZWPC+jkPAI1ktaHqfN6CS/8aKAD6PlxX\nLjuEu3fo+YYdDfRogkw5gdKctMbwG6K7DMZejMdEUMDi1LJoqVPTiXQF0R58VTe/\nyhRw7CdTAgMBAAECggEAH2qtJxKZ5TCXVU2860gtBT7KGvGXrpR05ghFQeriUmt6\nYTHiQSuxjp/FPLi9hcCyzLB5q5Qq/9ASxIXX14xu2X0KVKsoeRQmUtUHm20PPbsV\nxh00n1RNcMhqAnE0FY4IwA7SNhKMLOm4Q4Kk2yvWTTA7YkC4uw0edkkNhAzG0c1Z\npgkjp+dX6/gyP807HPS/zi7vQwbWf8BjjoMNjb3TmLdy8GOV0qpP+fO0hgPRoEN4\n0yfkZ5YrxcKYaleMyYEi8V778mWDzmW4UwL6mqTynlA8euc9JJNZvea3SDBP4FAO\nIOWODgxeP/Egwrb8cnwpmuV8GnURrkp7AIzDPxRsYQKBgQDW5hEDzEtqMepMPE7h\nUhcJD6iZJFMC1+jlye4+LoFTygU/Ju5EIDYJl+1oaeMmLNNL3syD4hnPEbzLRwM1\noqBm8A4QSi6/7hgufYk+Vr5uZhZy0yJwIcpoNjBr1zPfXlSHqOCjIq0nRP8DwkJF\n8E/CX/fFs1P/pbVL2sQnq74BUQKBgQC1iYySIDYFY3OOhlVJ+1XCuSGz5WGXsLpK\na1ip+QL8S3a+YhM/Y9fLV4EjC5XVZq8hlcft92AYNo4WCSiTyQclui9HyGLJt7WA\n4iCSb7nTR0y/5ea9ta9Ddz/LtO6g4iKwkV+GNE4ydLEqBYnk7fbs94SWlQKfQgQl\n99yHRXYVYwKBgDLHfnHFTnSzgses4H7BpQvRFWfKe4sKddAGnTM4Tfr8m6zGiDq0\n2c/+hGzNyIz2vp8I8I6hWLPjXxcxmoKMARcR1mDnBpD3s+MYatu+J5Vyrg9H8LVK\nZselNl/lJC693X+I2jvyL7Q9y3yZ5IseM9qcTrH6o/iesW5RLVSqcmVhAoGANQrs\nvOGWhzqI0DMmBojehRfs5hB21Ii51fbJoFh269rs5jHn59S3f92giOngrMrlDw4h\nrcFjHZALMhsY9R1+7iIZoILHgqMf8HmiBMeKZ1Zk8YkuQ24ruK3GQTIrq2yHsEm5\nvI/Z7Vo1Tc7yfKafSJwF7K27Z2c1qRZkJE5Cc3sCgYAtht69nY4qs/0QChnkU5K2\n/XaRZcvH7FRLcnndoNhgcyIWB4l3R/ABCWuDdVLrkdLRLT/E8em99oShG7o7o+6T\nWm46n4d6kO08t3I70nJbXjd0swDTyjfeX1nizMa4QI3x1pBIfNuCqp1YG2LHGti2\nMOVblKFbLkK/HhR2TZ+Iig==\n-----END PRIVATE KEY-----\n",
    //   Dialogflow_V2.LANG_ENGLISH,
    //   "jesey-e783d"
    // );
    Dialogflow_V2.setConfiguration(
      "dialogflow-klmaew@jiiggl-c143c.iam.gserviceaccount.com",
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDc92CXS+fo1HK9\nQC2sesEzg6S5DIvH/lCv8j89KlruKfRKPvHUEUm8P/9gtF8zs2gISba21H25Acj8\nyq/fx3ghcqRhtqIz0rH4T8Fcq4Y/uRMFIKGj5CKDbidRvIx9S8l0UJh/eKSAAUd0\nMXGuHAwn3dTLmrSpFZVBYrtvg+f5ESkDj7KT7T7kXjvJ3CVlaZH+mdckD9bs1Jxd\nI5QLQcGz63SvkqVWZ1tbvgKMAt8H4tYCs2a6Cv2ytM0Sfx7IiWH1pOP8CqiZVUps\nrCsYhMhG0nmYrqz8wdiUXmBm2yFStjPl3nVvEyIM8CIcuKSzgDh9SIDK1FQlz/uz\nPAmVxOKRAgMBAAECggEAFISeAf6I5sxPaTZb51+wr/1h3tME6cm6KVRXvfDAZ8wa\nhIhqwTPnwmS47HxjOLRIjTh3EGwTzomVZa/We/OUOprgG7ivQBuo7fNN87JzsVgY\npYm9qK/G6qhgW00kSIAwkS3oszF7KO21elsbAL1W/Z6yI0PW0bqQ1PT7jaPUdwKO\nMPhrIuiDQZhjVprV4D1VRI+yAk4yuRP85+pBkoa5AK4EGziLPBYHQpWSNJpFTT3l\nbyGunKOTejTxlc9Zt4SqcdbnDrYYCi86Mk2JUO3xaeN81cFim44wb+UAZHYZQoV6\nRuBOVI5jQzWQke5JEX/xowSorM81hHRV7I9n5LPqXwKBgQD5r+nyoC/pZIdxsNP7\n6wvyDP9MNkc8pdBjdBqTubN3ZLK8bp+OW0tR5uNJawhKSIpaovcgf2GLP4uYiD8C\nmydS4xGA3sVpTe8/682FcW5UBX6cGcI4td3G2+ZB3YtZU1B5AOq7u47pf4QHoqod\n7mbSDxejb7m4d5Hn+IKR5Tm+gwKBgQDijZHDbhCT/FSzC5WHmaepqm1xlVQeCpP8\n16eS+Vl5QrSuBXszOTtSBIVgrNpyGsU34D7yJPKDTpDYt7pQbiaDqV8/y0vR+J7A\nrJa6ag7uQdYos6VIQY6RZBsjgHpYDT+gKrItDimCtny1Tipqwx8dklXQBZtyPNB/\nQe+GnnEOWwKBgQCiUrj3ISjExLRBN0I5Lm+Ppt96PndFeE7nuR1mGH4SCocgdZKJ\nS9TFpCLzIgA7urknf3bFy8owatloCntcSF3iRvikHS+d7Cq0FaqBLGMbgI71ENHx\naFqL433oKA1lvwI8CFqSPbcFGf9Nr3SFDO4PdfxaJlJJGILkmezYyHsn3QKBgDem\nEqHwjT3sg1mfhNFUGu0AIfX+ejUO4B8BUfY2LZYtnngIfKSucDXLSn/etaHFlaAO\nAygzjyZVzBqPtsI+7FL27aCb7TncWhJ10mhj2NsJbPN+fSDsiXqJHmlwC51JU9Gh\n6zZJ/kRPUv6t/plO6Hu5ED8SwYYkDgrURWPJ03d1AoGBAK/sOiRCmBZ2y8w/nvtf\nhg/QfCFtK9emiIsoaoQ6K+zxULPgMLrCBbU7zAHWRRKMOTK8Uyo/zDFyxwE8+q5l\npJeA3sVxuc/bN1TM0vn/pXT+2fGBspgFWW09mmXQgrFF99303m8kCbQrzjP5UO7k\nQLcqRE/LgXRXCtxPPy6Oih/9\n-----END PRIVATE KEY-----\n",
      Dialogflow_V2.LANG_ENGLISH,
      "jiiggl-c143c"
    );
  }

  state = {
    initialScreen: welcomeScreenStr
  };

  async componentDidMount() {
    this.setMinuteTimer();
    const result = await signIn();
    if (result) {
      console.log(result);
      this.setState({ initialScreen: chatScreenStr });
      getTimeData();
    }
    SplashScreen.hide();
  }

  setMinuteTimer = () => {
    // setTodaysTime();
    setTimeout(() => {
      setTodaysTime();
      console.log("setMinuteTimer called");
      this.setMinuteTimer();
    }, 60000);
  };

  render() {
    const MainNavigator = createStackNavigator(
      { Welcome: WelcomeScreen, Chat: ChatScreen },
      {
        headerMode: "none",
        initialRouteName: this.state.initialScreen,
        defaultNavigationOptions: {
          gesturesEnabled: false
        }
      }
    );
    const Navigation = createAppContainer(MainNavigator);
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Navigation />
        </View>
      </Provider>
    );
  }
}
