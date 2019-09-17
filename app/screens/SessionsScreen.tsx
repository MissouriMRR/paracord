import { Icon, Left, ListItem, Right, Text, View } from "native-base";
import React from "react";
import { Alert, Button, FlatList } from "react-native";
import { NavigationInjectedProps, NavigationParams } from "react-navigation";
import { Network } from "../constants/Network";
import { Styles } from "../constants/Styles";

type Session = { id: number, start_time: string }
type State = { sessions: Array<Session>, refreshing: boolean }

export class SessionsScreen extends React.Component<NavigationInjectedProps, State> {
	static navigationOptions = {
		title: "Sessions"
	}

	constructor(props: Readonly<NavigationInjectedProps<NavigationParams>>) {
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
		await fetch(Network.URL_BASE + "sessions/") // TODO GraphQL
			.then(response => response.json(), Network.onError)
			.then(json => this.setState({ sessions: json as Array<Session> }))
			.catch(reason => Alert.alert(
				'A JSON Error Has Occured',
				reason.toString(),
				[{ text: 'OK' }],
				{ cancelable: false }))
		this.setState({ refreshing: false })
	}

	render() {
		const { navigation } = this.props
		return (
			<View style={Styles.container}>
				<FlatList
					/* Maybe split these up by month? */
					/* TODO figure out why this is slow to load */
					/* TODO display something when there are no sessions available */
					style={Styles.list}
					refreshing={this.state.refreshing}
					onRefresh={() => this.refresh_sessions() /* onRefresh needs to be a lambda function due to weird 'this binding' behavior */}
					data={this.state.sessions}
					keyExtractor={item => String(item.id)}
					renderItem={({ item }) => (
						<ListItem onPress={() => { navigation.navigate('Flights', { session_id: item.id }) }}>
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
					onPress={() => { navigation.navigate('NewSession') }}
				/>
			</View>
		)
	}
}