import { Alert } from "react-native"

const URL_HOSTNAME = "192.168.99.100"

export const Network = {
	URL_HOSTNAME: URL_HOSTNAME,
	URL_BASE: "http://" + URL_HOSTNAME + "/api/v1/",
	onError: (reason: { toString: () => string }) => Alert.alert(
		'A Network Error Has Occured',
		reason.toString(),
		[{ text: 'OK' }],
		{ cancelable: false })
}