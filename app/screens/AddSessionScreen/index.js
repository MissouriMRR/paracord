import React from "react";
import { View, StyleSheet } from "react-native";
import AddSessionNavigator from "../../navigation/AddSessionNavigator";

export default class AddSessionScreen extends React.Component {
  static navigationOptions = {
    title: "New Session"
  };

  render() {
    return (
      <View style={styles.container}>
        <AddSessionNavigator />
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
