import React, { Component } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "./Loading";
import StackNavigator from "../StackNavigator";
import SignNavigation from "../Sign/SignNavigation";
import ProfileSetup from "../Sign/ProfileSetup";
const AuthNav = createStackNavigator();

class AuthNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AuthNav.Navigator
        screenOptions={{
          headerShown: false,
        }}
        // initialRouteName="SignNavigation"
      >
        <AuthNav.Screen name="Loading" component={Loading} />
        <AuthNav.Screen name="SignNavigation" component={SignNavigation} />
        <AuthNav.Screen name="ProfileSetup" component={ProfileSetup} />
        <AuthNav.Screen name="StackNavigator" component={StackNavigator} />
      </AuthNav.Navigator>
    );
  }
}

export default AuthNavigation;
