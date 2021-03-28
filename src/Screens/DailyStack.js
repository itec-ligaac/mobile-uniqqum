import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DailyMap from "./DailyMap";
import AddDailyMap from "./AddDailyMap";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DailyMap"
        component={DailyMap}
        options={({ navigation, route }) => ({
          headerShown: false,
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
      <Stack.Screen
        name="AddDailyMap"
        component={AddDailyMap}
        options={({ navigation, route }) => ({
          headerShown: false,

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
