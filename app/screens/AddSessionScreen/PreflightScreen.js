import { Left, ListItem, Right, View } from "native-base"
import React from "react"
import { Alert, Button, FlatList, StyleSheet, Switch, Text } from "react-native"

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	constructor(props) {
		super(props)
		this.state = {
			switchValues: [
				{ key: 'Build the drone', value: false },
				{ key: 'Calibate the GPS', value: false },
				{ key: 'Reticulate the spline', value: false },
				{ key: 'Calculate the spleen', value: false },
				{ key: 'Eat the snozzberries', value: false },
				{ key: 'Recalibrate the GPS', value: false },
				{ key: 'Remove the appendix', value: false },
				{ key: 'Hang the net', value: false },
				{ key: 'Clear the zone', value: false },
			]
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.switchValues}
					renderItem={({ item, index }) => (
						<ListItem>
							<Left><Text>{item.key}</Text></Left>
							<Right><Switch value={this.state.switchValues[index].value}
								onValueChange={val => {
									let values = [...this.state.switchValues]
									values[index] = { ...values[index], value: val }
									this.setState({ switchValues: values })
								}} />
							</Right>
						</ListItem>
					)}
				/>
				<Button title='Let&apos;s Go!'
					disabled={this.state.switchValues.some(switches => !switches.value)}
					onPress={() => Alert.alert(
						'Let\'s Go!',
						'Are you ready to fly?',
						[
							{
								text: 'Nah',
								onPress: () => console.log('y\'ain\'t'),
								style: 'cancel',
							},
							{
								text: 'YE',
								onPress: () => console.log('nyoom'),
							},
						],
						{ cancelable: false },
					)} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: "#fff"
	}
})
