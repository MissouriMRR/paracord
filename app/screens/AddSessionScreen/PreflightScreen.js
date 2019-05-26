import { Left, ListItem, Right, View } from "native-base";
import React from "react";
import { Alert, Button, FlatList, StyleSheet, Switch, Text, TextInput } from "react-native";

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	constructor(props) {
		super(props)
		this.state = {
			inputValues: [
				{ key: 'Prepared by', type: 'text', value: '' },
				{ key: 'Location', type: 'text', value: '' },
				{ key: 'Drone', type: 'text', value: '' },
				{ key: 'Airspace Notified', type: 'switch', value: false },
				{ key: 'Purpose', type: 'text', value: '' },
				//{ key: 'Start Time', type: 'time', value: null},
				//{ key: 'End Time', type: 'time', value: null},
				{ key: 'Pilot', type: 'text', value: '' },
				{ key: 'Pilot in Command', type: 'text', value: '' },
				{ key: 'FCC Approved™', type: 'switch', value: false },
				{ key: 'Weather', type: 'text', value: '' },
				{ key: 'Terrain', type: 'text', value: '' },
				{ key: 'Populated', type: 'switch', value: false },
				{ key: 'Extra Hazards', type: 'text', value: '' },
				/* Visual Inspection */
				{ key: 'Frame', type: 'switch', value: false },
				{ key: 'Motors', type: 'switch', value: false },
				{ key: 'Props', type: 'switch', value: false },
				{ key: 'Batteries', type: 'switch', value: false },
				{ key: 'Sensors', type: 'switch', value: false },
				/* Systems */
				{ key: 'Ground Control', type: 'switch', value: false },
				{ key: 'Range Finder', type: 'switch', value: false },
				{ key: 'Optical Flow', type: 'switch', value: false },
				{ key: 'Onboard CPU', type: 'switch', value: false },
				{ key: 'Flight Board', type: 'switch', value: false },
				{ key: 'Voltage Alarm', type: 'switch', value: false },
				{ key: 'Failsafe', type: 'switch', value: false },
			]
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.inputValues}
					renderItem={({ item, index }) => (
						<ListItem>
							<Left><Text>{item.key}</Text></Left>
							{
								/* if */ item.type == 'switch' && (
									<Right>
										<Switch value={this.state.inputValues[index].value}
											onValueChange={value => {
												let values = [...this.state.inputValues]
												values[index] = { ...values[index], value: value }
												this.setState({ inputValues: values })
											}} />
									</Right>
								) /* else if */ || item.type == 'text' && (
									<TextInput value={this.state.inputValues[index].value}
										style={styles.textInput}
										onChangeText={text => {
											let values = [...this.state.inputValues]
											values[index] = { ...values[index], value: text }
											this.setState({ inputValues: values })
										}} />
								)
							}
						</ListItem>
					)}
				/>
				<Button title='Let&apos;s Go!'
					disabled={this.state.inputValues.some(input => input.type === 'switch' && !input.value)}
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
		backgroundColor: "#fff"
	},
	textInput: {
		textAlign: 'right',
		flex: 1
	}
})
