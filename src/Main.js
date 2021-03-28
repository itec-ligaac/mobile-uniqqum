import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./Screens/StackNavigator";
import AuthNavigation from './Screens/Auth/AuthNavigation'
export default function Main() {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
}
