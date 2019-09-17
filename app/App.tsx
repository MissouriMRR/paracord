import { Ionicons } from "@expo/vector-icons"
import { AppLoading, Font } from "expo"
import React from "react"
import { Platform, StatusBar, View } from "react-native"
import { createAppContainer } from "react-navigation"
import { Styles } from "./constants/Styles"
import { AppNavigator } from "./navigation/AppNavigator"

const AppContainer = createAppContainer(AppNavigator)

const initialState = { isLoadingComplete: false }
type State = Readonly<typeof initialState>

export default class App extends React.Component {
	readonly state: State = initialState

	render() {
		if (!this.state.isLoadingComplete) {
			return (
				<AppLoading
					startAsync={this._loadResourcesAsync}
					onError={this._handleLoadingError}
					onFinish={this._handleFinishLoading}
				/>
			)
		} else {
			return (
				<View style={Styles.container}>
					{Platform.OS === "ios" && <StatusBar barStyle="default" />}
					<AppContainer />
				</View>
			)
		}
	}

	_loadResourcesAsync = async () => {
		Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			...Ionicons.font
		})
	}

	_handleLoadingError = (error: Error) => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn(error)
	}

	_handleFinishLoading = () => {
		this.setState({ isLoadingComplete: true })
	}
}

