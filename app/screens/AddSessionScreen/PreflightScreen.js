import { Left, ListItem, Right, View, Picker } from "native-base";
import React from "react";
import Network from "../../constants/Network.js"
import { Alert, Button, FlatList, StyleSheet, Switch, Text, TextInput } from "react-native";

const post_session = (values) => {
	let body = {}
	values.forEach(val => body[val.key] = val.value)

	console.log(`sending POST:${JSON.stringify(body)} to ${URL_BASE}sessions/`)

	fetch(Network.URL_BASE + "sessions/", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	}).then(response => {
		//TODO
		console.log("HTTP POST RESPONSE::" + response.toString())
	}).catch(reason => Alert.alert(
		'Error',
		`There was an error creating the session\n${reason}`,
		[{
			text: 'OK',
			onPress: () => { },
		}],
		{ cancelable: false }
	))
}

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	constructor(props) {
		super(props)
		this.state = {
			inputValues: [

				// DUMMY VALUES //

				{ key: 'preparer', name: 'Prepared by', type: 'text', value: 'me', required: true },
				{ key: 'location', name: 'Location', type: 'text', value: 'here', required: true },
				{ key: 'air_frame', name: 'Drone', type: 'picker', options: [], value: -1, required: true },
				//{ key: 'airspace_notified' name: 'Airspace Notified', type: 'switch', value: false },
				{ key: 'test_purpose', name: 'Purpose', type: 'text', value: 'none', required: true },
				//{ name: 'Start Time', type: 'time', value: null},
				//{ name: 'End Time', type: 'time', value: null},
				{ key: 'pilot', name: 'Pilot', type: 'text', value: 'me', required: true },
				{ key: 'pilot_in_command', name: 'Pilot in Command', type: 'text', value: 'also me', required: false },
				//{ name: 'FCC Approved™', type: 'switch', value: false },
				{ key: 'weather', name: 'Weather', type: 'text', value: '', required: false }, // Dropdown?
				{ key: 'terrain', name: 'Terrain', type: 'text', value: '', required: false }, // Dropdown?
				{ key: 'populated_area', name: 'Populated', type: 'switch', value: false, required: false },
				{ key: 'extra_hazards', name: 'Extra Hazards', type: 'text', value: '', required: false },

				// Visual Inspection //
				{ key: 'pf_visual_frame', name: 'Frame', type: 'switch', value: true, required: true },
				{ key: 'pf_visual_motors', name: 'Motors', type: 'switch', value: true, required: true },
				{ key: 'pf_visual_props', name: 'Props', type: 'switch', value: true, required: true },
				{ key: 'pf_visual_batteries', name: 'Batteries', type: 'switch', value: true, required: true },
				{ key: 'pf_visual_sensors', name: 'Sensors', type: 'switch', value: true, required: true },

				// Systems //
				{ key: 'pf_systems_ground_control', name: 'Ground Control', type: 'switch', value: true, required: true },
				{ key: 'pf_systems_range_finder', name: 'Range Finder', type: 'switch', value: true, required: true },
				{ key: 'pf_systems_optical_flow', name: 'Optical Flow', type: 'switch', value: true, required: true },
				{ key: 'pf_systems_onboard_cpu', name: 'Onboard CPU', type: 'switch', value: true, required: true },
				{ key: 'pf_systems_flight_board', name: 'Flight Board', type: 'switch', value: true, required: true },
				{ key: 'pf_systems_voltage_alarm', name: 'Voltage Alarm', type: 'switch', value: true, required: true },
				{ key: 'pf_systems_failsafe', name: 'Failsafe', type: 'switch', value: true, required: true },
			]
		}
		fetch(Network.URL_BASE + "frames/")
			.then(response => response.json())
			.then(json => this.state.inputValues.find(a => a.key == 'air_frame').options = json)
			.catch(reason => Alert.alert(
				'Error',
				`There was an error connecting to the dataabase\n${reason}`,
				[{
					text: 'OK',
					onPress: () => { },
				}],
				{ cancelable: false }))
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.inputValues}
					renderItem={({ item, index }) => (
						<ListItem>
							<Left><Text>{item.name}</Text></Left>
							{
								item.type == 'switch' && (
									<Right>
										<Switch value={this.state.inputValues[index].value}
											onValueChange={value => {
												let values = [...this.state.inputValues]
												values[index] = { ...values[index], value: value }
												this.setState({ inputValues: values })
											}} />
									</Right>
								) || item.type == 'text' && (
									<TextInput value={this.state.inputValues[index].value}
										style={styles.textInput}
										onChangeText={text => {
											let values = [...this.state.inputValues]
											values[index] = { ...values[index], value: text }
											this.setState({ inputValues: values })
										}} />
								) || item.type == 'picker' && (
									<Picker prompt={item.name}
										selectedValue={this.state.inputValues[index].value}
										onValueChange={value => {
											let values = [...this.state.inputValues]
											values[index] = { ...values[index], value: value }
											this.setState({ inputValues: values })
											console.log(this.state.inputValues[index].options)
											console.log(value)
										}}>
										<Picker.Item label='Please Select' value={-1} />
										{this.state.inputValues[index].options.map(option => <Picker.Item key={option.id} label={option.name} value={option.id} />)}
									</Picker>
								)
							}
						</ListItem>
					)}
				/>
				<Button
					title='Let&apos;s Go!'
					disabled={this.state.inputValues.some(input => input.required && ((input.type == 'picker' && input.value == -1) || (!input.value)))}
					onPress={() => Alert.alert(
						'Let\'s Go!',
						'Are you ready to fly?',
						[{
							text: 'Cancel',
							onPress: () => { },
							style: 'cancel',
						},
						{
							text: 'OK',
							onPress: () => post_session(this.state.inputValues),
						}],
						{ cancelable: false },
					)}
				/>
			</View>
		)
	}
}




/*
for i in range(NUM_FLIGHTS):
    resp = requests.post(
        URL_BASE + "sessions/" + str(i % NUM_SESSIONS) + "/flights",
        json={
            "start_time": str(datetime.now()),
            "end_time":
            str(datetime.now() + timedelta(minutes=randint(1, 30))),
            "description": " ".join([rword() for _ in range(randint(6, 30))]),
            "success": True,
            "outcome": " ".join([rword() for _ in range(randint(6, 17))])
        })
*/
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
