import { Icon, Left, ListItem, Right, Text, View } from "native-base";
import React from "react";
import { Alert, Button, FlatList } from "react-native";
import Network from "../constants/Network.js";

export default class SessionsScreen extends React.Component {
	static navigationOptions = {
		title: "New Flight"
	};

	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<View>
			</View>
		)
	}
}

