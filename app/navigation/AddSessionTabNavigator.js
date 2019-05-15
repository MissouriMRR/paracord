import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import PreflightScreen from "../screens/AddSessionScreen/PreflightScreen";
import FlightsScreen from "../screens/AddSessionScreen/FlightsScreen";

const PreflightStack = createStackNavigator({
  Preflight: PreflightScreen
});

PreflightStack.navigationOptions = {
  tabBarLabel: "Preflight",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const FlightsStack = createStackNavigator({
  Flights: FlightsScreen
});

FlightsStack.navigationOptions = {
  tabBarLabel: "Flights",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-list" : "md-list"}
    />
  )
};

export default createBottomTabNavigator({
  PreflightStack,
  FlightsStack
});
