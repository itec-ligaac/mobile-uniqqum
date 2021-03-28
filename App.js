import React from "react";
import Main from "./src/Main";
import { firebaseConfig } from "./config";
import { LogBox } from "react-native";
import * as firebase from "firebase";

LogBox.ignoreAllLogs(); //Ignore all log notifications

firebase.initializeApp(firebaseConfig);
export default function App() {
  return <Main />;
}


