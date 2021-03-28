import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import OnBoarding from "./OnBoarding";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
// import ProfileSetup from "./ProfileSetup";
const Stack = createStackNavigator();

const MyTransition = {
  gestureDirection: "horizontal",
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
};

export default function Navigation() {
  return (
    // <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoarding"
        headerMode={"none"}
        // screenOptions={{ stackAnimation: "flip", stackPresentation: "modal" }}
      >
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: "SIGN IN" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "SIGN UP" }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ForgotPassword}
          options={{ title: "RESET PASSWORD" }}
        />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}
