import { View } from "native-base";
import React from "react";
import { NavigationInjectedProps, NavigationParams } from "react-navigation";
import { Styles } from "../constants/Styles";

type State = {}

export class NewFlightScreen extends React.Component<NavigationInjectedProps, State> {
	static navigationOptions = {
		title: "New Flight"
	}

	constructor(props: Readonly<NavigationInjectedProps<NavigationParams>>) {
		super(props)
		this.state = {}
	}

	render() {
		return (
			<View style={Styles.container}>
			</View>
		)
	}
}

