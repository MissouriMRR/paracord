import { Icon, Left, ListItem, Right, Text, View } from "native-base";
import React from "react";
import { Alert, Button, FlatList } from "react-native";
import Network from "../constants/Network.js";

export default class SessionsScreen extends React.Component {
	static navigationOptions = {
		title: "Sessions"
	};

	constructor(props) {
		super(props)
		this.state = { sessions: [], refreshing: false }
	}

	componentDidMount() {
		this.refresh_sessions()
	}

	async refresh_sessions() {
		if (this.state.refreshing)
			return
		this.setState({ refreshing: true })
		await fetch(Network.URL_BASE + "sessions/")
			.then(response => response.json())
			.then(json => this.setState({ sessions: json }))
			.catch(reason => Alert.alert(
				'Error',
				'There was an error connecting to the database\n' + reason,
				[{ text: 'OK' }],
				{ cancelable: false }))
		this.setState({ refreshing: false })
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<FlatList /* Maybe split these up by month? */
					style={{ flex: 1 }}
					refreshing={this.state.refreshing}
					onRefresh={() => { this.refresh_sessions() }}
					data={this.state.sessions /* TODO display something when there are no sessions available */}
					keyExtractor={item => String(item.id)}
					renderItem={({ item }) => (
						<ListItem onPress={() => { this.props.navigation.navigate('Flights', { session_id: item.id }) }}>
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
					title='New Session'
					onPress={() => { this.props.navigation.navigate('NewSession') }}
				/>
			</View>
		)
	}
}

