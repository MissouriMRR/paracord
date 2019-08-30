import { createStackNavigator, createAppContainer } from 'react-navigation';
import SessionsScreen from '../screens/SessionsScreen.js'

export default createAppContainer(createStackNavigator(
	{
		Sessions: SessionsScreen
	},
	{
		initialRouteName: 'Sessions'
	}));