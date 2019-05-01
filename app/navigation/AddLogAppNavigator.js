import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AddLogNavigator from "./AddLogNavigator";

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AddLog: AddLogNavigator
  })
);
