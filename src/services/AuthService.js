import { GoogleSignin } from "react-native-google-signin";
import firebase from "react-native-firebase";

// Calling this function will open Google for login.
export async function googleLogin() {
  try {
    // add any configuration settings here:
    await GoogleSignin.configure();

    const data = await GoogleSignin.signIn();

    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(
      data.idToken,
      data.accessToken
    );
    // login with credential
    const firebaseUserCredential = await firebase
      .auth()
      .signInWithCredential(credential);

    userName = firebase.auth().currentUser.displayName;

    return firebaseUserCredential;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export const signIn = async () => {
  try {
    await GoogleSignin.configure();
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const currentUser = await GoogleSignin.signInSilently();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        currentUser.idToken,
        currentUser.accessToken
      );
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      userName = firebase.auth().currentUser.displayName;

      return firebaseUserCredential;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export var userName = "";
