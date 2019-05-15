import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import SessionsScreen from "../screens/SessionsScreen";
import AddSessionScreen from "../screens/AddSessionScreen/index";

const SessionsStack = createStackNavigator({
  Sessions: SessionsScreen
});

SessionsStack.navigationOptions = {
  tabBarLabel: "Sessions",
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

const AddSessionStack = createStackNavigator({
  AddSession: AddSessionScreen
});

AddSessionStack.navigationOptions = {
  tabBarLabel: "Add Session",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
    />
  )
};

export default createBottomTabNavigator({
  SessionsStack,
  AddSessionStack
});
