import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import firebase from "firebase";

export default function Loading(props) {
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = () => {
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase
          .firestore()
          .collection("Users")
          .doc(user.uid)
          .get()
          .then((documentSnapshot) => {
            if (documentSnapshot.data().isProfileSet) {
              props.navigation.navigate("StackNavigator");
            } else {
              props.navigation.navigate("ProfileSetup");
            }
          });

          // props.navigation.navigate("StackNavigator");
        } else {
          props.navigation.navigate("SignNavigation");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}
