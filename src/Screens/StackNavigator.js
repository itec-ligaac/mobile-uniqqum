import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TopTabNavigator from "./TopTabNavigator";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopTabNavigator"
        component={TopTabNavigator}
        options={({ navigation, route }) => ({
          headerTitleAlign: "center",
          gestureEnabled: true,
          title: "HERE MAPS",
          headerTintColor: "black",
          headerStyle: {
            shadowColor: "transparent",
            elevation: 0,
            backgroundColor: "white",
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerLeft: () => null,
        })}
      />
    </Stack.Navigator>
  );
}

export default function StackNavigator() {
  return <MyStack />;
}
