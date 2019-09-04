import { createStackNavigator, createAppContainer } from 'react-navigation';
import SessionsScreen from '../screens/SessionsScreen.js'
import FlightsScreen from '../screens/FlightsScreen.js'
import FlightDetailsScreen from '../screens/FlightDetailsScreen.js'
import NewSessionScreen from '../screens/NewSessionScreen.js'
import NewFlightScreen from '../screens/NewFlightScreen.js'

export default createAppContainer(createStackNavigator(
	{
		Sessions: SessionsScreen, 
		NewSession: NewSessionScreen,
		Flights: FlightsScreen,
		NewFlight: NewFlightScreen,
		FlightDetails: FlightDetailsScreen
	},
	{
		initialRouteName: 'Sessions'
	}));