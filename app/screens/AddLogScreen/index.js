import React from "react";
import { View, StyleSheet } from "react-native";
import AddLogAppNavigator from "../../navigation/AddLogAppNavigator";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "New Flight Log"
  };

  render() {
    return (
      <View style={styles.container}>
        <AddLogAppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
