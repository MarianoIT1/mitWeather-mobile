import * as Location from 'expo-location'
import { Alert } from 'react-native'


export default getCurrentLocation = async () => {
    const response = {status: false, location: null}
    let { status } = await Location.requestForegroundPermissionsAsync()
    if(status !== 'granted') {
        Alert.alert('You must accept the location permission')
        return response;
    }
    const position = await Location.getCurrentPositionAsync({})
    const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    }
    response.status = true
    response.location = location
    return response
}