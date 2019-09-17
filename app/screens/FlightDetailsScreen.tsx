import { Text, View } from "native-base";
import React from "react";
import { Alert } from "react-native";
import { NavigationInjectedProps, NavigationParams } from "react-navigation";
import { Network } from "../constants/Network";

type FlightDetails = {
	description: string,
	end_time: string,
	id: number,
	outcome: string,
	session: number,
	start_time: string,
	success: boolean,
}
type State = { refreshing: boolean, flight_details: FlightDetails | undefined }

export class FlightDetailsScreen extends React.Component<NavigationInjectedProps, State> {
	static navigationOptions = {
		title: "Flight Details"
	}

	constructor(props: Readonly<NavigationInjectedProps<NavigationParams>>) {
		super(props)
		this.state = { flight_details: undefined, refreshing: false }
	}

	componentDidMount() {
		this.refresh_flight_details()
	}

	async refresh_flight_details() {
		if (this.state.refreshing)
			return
		this.setState({ refreshing: true })
		await fetch(Network.URL_BASE + "sessions/" + this.props.navigation.getParam('session_id') + "/flights/" + this.props.navigation.getParam('flight_id'))
			.then(response => response.json(), Network.onError)
			.then(json => { this.setState({ flight_details: json }) })
			.catch(reason => Alert.alert(
				'A JSON Error Has Occured',
				reason.toString(),
				[{ text: 'OK' }],
				{ cancelable: false }))
		this.setState({ refreshing: false })
	}

	render() {
		return (
			// TODO make pretty
			<View>
				<Text>{JSON.stringify(this.state.flight_details)}</Text>
			</View>
			// TODO edit button
		)
	}
}