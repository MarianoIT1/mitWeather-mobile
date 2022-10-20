import { fetchCityAPIByCoordinates} from './index'
export const refreshCitiesAPI = (oldData) => {

    const citiesCoordinates = []

    for(let i = 0; i < oldData.length; i++) {
        citiesCoordinates.push({location: {latitude: oldData[i].lat, longitude: oldData[i].lon}, id: oldData[i].id})
    }

    const requests = citiesCoordinates.map(city => fetchCityAPIByCoordinates(city.location, city.id))
        
    return Promise.all(requests)
}