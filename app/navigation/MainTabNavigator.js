import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import FlightsScreen from "../screens/FlightsScreen";
import AddLogScreen from "../screens/AddLogScreen/index";

const FlightsStack = createStackNavigator({
  Flights: FlightsScreen
});

FlightsStack.navigationOptions = {
  tabBarLabel: "Flights",
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

const AddLogStack = createStackNavigator({
  AddLog: AddLogScreen
});

AddLogStack.navigationOptions = {
  tabBarLabel: "Add Flight",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
    />
  )
};

export default createBottomTabNavigator({
  FlightsStack,
  AddLogStack
});
