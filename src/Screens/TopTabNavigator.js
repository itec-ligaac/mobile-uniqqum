import * as React from "react";
import { Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import DailyMap from "./DailyMap";
import PeopleMap from "./PeopleMap";
import DailyStack from "./DailyStack";

const Tab = createMaterialTopTabNavigator();

export default function TopTab() {
  return (
    <Tab.Navigator showIcon>
      <Tab.Screen
        name="PeopleMap"
        component={PeopleMap}
        options={({ route }) => ({
          showIcon: true,
          gestureEnabled: true,
          tabBarLabel: "People",
          tabBarColor: "red",
          tabBarIcon: ({ color }) => (
            <Ionicons name="map" size={24} color="black" />
          ),
        })}
      />
      <Tab.Screen name="DailyStack" component={DailyStack} />
    </Tab.Navigator>
  );
}
