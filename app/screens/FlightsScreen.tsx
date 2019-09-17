import { Icon, Left, ListItem, Right, Text, View } from "native-base";
import React from "react";
import { Button, FlatList, Alert } from "react-native";
import { NavigationInjectedProps, NavigationParams } from "react-navigation";
import { Network } from "../constants/Network";
import { Styles } from "../constants/Styles";

type Flight = { id: number, start_time: string }
type State = { flights: Array<Flight>, refreshing: boolean }

export class FlightsScreen extends React.Component<NavigationInjectedProps, State> {
	static navigationOptions = {
		title: "Flights"
	}

	constructor(props: Readonly<NavigationInjectedProps<NavigationParams>>) {
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
			.then(response => response.json(), Network.onError)
			.then(json => this.setState({ flights: json as Array<Flight> })) // TODO don't error when no flights are available 
			.catch(reason => Alert.alert(
				'A JSON Error Has Occured',
				reason.toString(),
				[{ text: 'OK' }],
				{ cancelable: false }))
		this.setState({ refreshing: false })
	}

	render() {
		return (
			<View style={Styles.container}>
				<FlatList
					style={Styles.list}
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
				<Button
					title='New Flight'
					onPress={() => { this.props.navigation.navigate('NewFlight') }}
				/>
			</View>
		)
	}
}