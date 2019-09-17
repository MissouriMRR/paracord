import { createStackNavigator } from 'react-navigation';
import { SessionsScreen } from '../screens/SessionsScreen'
import { FlightsScreen } from '../screens/FlightsScreen'
import { FlightDetailsScreen } from '../screens/FlightDetailsScreen'
import { NewSessionScreen } from '../screens/NewSessionScreen'
import { NewFlightScreen } from '../screens/NewFlightScreen'

export const AppNavigator = createStackNavigator(
	{
		Sessions: SessionsScreen,
		NewSession: NewSessionScreen,
		Flights: FlightsScreen,
		NewFlight: NewFlightScreen,
		FlightDetails: FlightDetailsScreen
	},
	{
		initialRouteName: 'Sessions'
	})
