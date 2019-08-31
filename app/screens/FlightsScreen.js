import { Icon, Left, ListItem, Right, Text, View } from "native-base";
import React from "react";
import { Alert, FlatList } from "react-native";
import Network from "../constants/Network.js";

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		title: "Flights"
	};

	constructor(props) {
		super(props)
		this.state = { flights: [], refreshing: false }
	}

	componentDidMount() {
		this.refresh_flights()
	}

	async refresh_flights() {
		if (this.state.refreshing)
			return
		this.setState({ refreshing: true })
		await fetch(Network.URL_BASE + "sessions/" + this.props.navigation.getParam('session_id') + "/flights")
			.then(response => response.json())
			.then(json => this.setState({ flights: json }))
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
				<FlatList
					refreshing={this.state.refreshing}
					onRefresh={() => { this.refresh_flights() }}
					data={this.state.flights /* TODO display something when there are no flights available */}
					keyExtractor={item => String(item.id)}
					renderItem={({ item }) => (
						<ListItem onPress={() => { this.props.navigation.navigate('FlightDetails', { ...this.props.navigation.state.params, flight_id: item.id }) }}>
							<Left>
								<Text>{item.start_time}</Text>
							</Left>
							<Right>
								<Icon name="arrow-forward" />
							</Right>
						</ListItem>
					)}
				/>
			</View>
			// TODO floating action button for new flight
		)
	}
}