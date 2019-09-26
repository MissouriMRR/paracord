import { Icon, Left, ListItem, Right, Text, View, List } from "native-base";
import React from "react";
import { Alert, FlatList } from "react-native";
import Network from "../constants/Network.js";

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		title: "Flight Details"
	};

	constructor(props) {
		super(props)
		this.state = { flight_details: {}, refreshing: false }
	}

	componentDidMount() {
		this.refresh_flight_details()
	}


	async refresh_flight_details() {
		if (this.state.refreshing)
			return
		this.setState({ refreshing: true })
		await fetch(Network.URL_BASE + "sessions/" + this.props.navigation.getParam('session_id') + "/flights/" + this.props.navigation.getParam('flight_id'))
			.then(response => response.json())
			.then(json => { this.setState({ flight_details: json }) })
			.catch(reason => Alert.alert(
				'Error',
				'There was an error connecting to the database\n' + reason,
				[{ text: 'OK' }],
				{ cancelable: false }))
		this.setState({ refreshing: false })
	}

	render() {
		return (
			<View>
				<Text>{/* TODO make pretty */ JSON.stringify(this.state.flight_details)}</Text>
			</View>
			// TODO edit button
		)
	}
}