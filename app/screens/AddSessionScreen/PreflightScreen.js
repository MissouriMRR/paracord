import { Container, Content, ListItem, Switch, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

class SwitchItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = { switchValue: false }
	}

	render() {
		return (
			<ListItem>
				<Switch value={this.state.switchValue} onValueChange={val => this.setState({ switchValue: val })} />
				<Text>{this.props.text}</Text>
			</ListItem>
		)
	}
}

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	render() {
		return (
			<Container>
				<Content>
					<SwitchItem text='Item 1' />
					<SwitchItem text='Item 2' />
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: "#fff"
	}
});
