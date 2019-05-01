import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import PreflightScreen from "../screens/AddLogScreen/PreflightScreen";
import FlightsScreen from "../screens/AddLogScreen/FlightsScreen";

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
  tabBarLabel: "Add Flight",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
    />
  )
};

export default createBottomTabNavigator({
  PreflightStack,
  FlightsStack
});
