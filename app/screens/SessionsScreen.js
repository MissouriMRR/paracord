import { Container, Content, Icon, Left, ListItem, Right, Text, Item } from "native-base";
import React from "react";
import Network from "../constants/Network.js"
import { FlatList, StyleSheet, Alert } from "react-native";

export default class SessionsScreen extends React.Component {
	static navigationOptions = {
		title: "Sessions"
	};

	constructor(props) {
		super(props)
		this.state = { sessions: [] }
		fetch(Network.URL_BASE + "sessions/")
			.then(response => response.json())
			.then(json => this.setState({ sessions: json }))
			.catch(reason => Alert.alert(
				'Error',
				`There was an error connecting to the database\n${reason}`,
				[{
					text: 'OK',
					onPress: () => { }
				}],
				{ cancelable: false }))
	}

	render() {
		return (
			<Container>
				<Content>
					<FlatList
						data={this.state.sessions}
						keyExtractor={item => `${item.id}`}
						renderItem={({ item }) => (
							<ListItem onPress={event => { /* TODO navigate to session screen */ }}>
								<Left>
									<Text>{item.start_time}</Text>
								</Left>
								<Right>
									<Icon name="arrow-forward" />
								</Right>
							</ListItem>
						)}
					/>
					{ /* TODO floating action button for new session */ }
				</Content>
			</Container>
		)
	}
}
