import { createStackNavigator, createAppContainer } from 'react-navigation';
import SessionsScreen from '../screens/SessionsScreen.js'
import FlightsScreen from '../screens/FlightsScreen.js'
import FlightDetailsScreen from '../screens/FlightDetailsScreen.js'

export default createAppContainer(createStackNavigator(
	{
		Sessions: SessionsScreen,
		Flights: FlightsScreen,
		FlightDetails: FlightDetailsScreen
	},
	{
		initialRouteName: 'Sessions'
	}));