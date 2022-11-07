import getLocation from '../../services/getLocation'
import { getSuggestionsAPI } from '../../services/GetSuggestions'
import {fetchCityAPIByCoordinates, fetchCityAPIByName} from '../../services/index'
import { refreshCitiesAPI } from '../../services/refresh'

export const GET_CITY = "GET_CITY"
export const GET_CITY_SUCCESS = "GET_CITY_SUCCESS"
export const GET_CITY_FAILURE = "GET_CITY_FAILURE"
export const REMOVE_CITY = "REMOVE_CITY"
export const GET_CITY_REPEATED = "GET_CITY_REPEATED"
export const GET_CITY_NOT_STRING = "GET_CITY_NOT_STRING"
export const REFRESH_DATA = "REFRESH_DATA"
export const REFRESH_DATA_SUCCESS = "REFRESH_DATA_SUCCESS"
export const SUGGESTION_SUCCESS = "SUGGESTION_SUCCESS"
export const CLEAR_SUGGESTIONS = "CLEAR_SUGGESTIONS"
export const CLEAR_ERROR = "CLEAR_ERROR"
export const GET_CURRENT_SUCCESS = 'GET_CURRENT_SUCCESS'
export const SET_CURRENT_RENDERED = 'SET_CURRENT_RENDERED'
export const REFRESH_CURRENT = 'REFRESH_CURRENT'
export const ALLOW_REDIRECT = 'ALLOW_REDIRECT'
export const ALLOW_SCROLL = 'ALLOW_SCROLL'
export const CHANGE_UNIT = 'CHANGE_UNIT'

export const getCity = () => {
    return {
        type: GET_CITY
    }
}

export const getCitySuccess = (city) => {
    return {
        city,
        type: GET_CITY_SUCCESS
    }
}

export const getCurrentSuccess = (currentLocation) => {
    return {
        currentLocation,
        type: GET_CURRENT_SUCCESS
        
    }
}

export const getCityFailure = () => {
    return {
        type: GET_CITY_FAILURE
    }
}

export const getCityNotString = () => {
    return {
        type: GET_CITY_NOT_STRING
    }
}

export const getCityRepeated = (indexRep) => {
    return {
        type: GET_CITY_REPEATED,
        indexRep: indexRep
    }
}

export const fetchCityByName = (payload, id, currentState, currentLocation) => {
    return (dispatch) => {
        currentLocation = currentLocation === null ? {} : currentLocation
        dispatch(getCity())
        if(!/^[A-Z\s]+$/i.test(payload)) dispatch(getCityNotString());
        else fetchCityAPIByName(payload, id)
         .then(city => {
                let indexRep = currentState.findIndex(currentCity => currentCity.apiId == city.apiId)
                    if(indexRep >= 0 || currentLocation.apiId == city.apiId) {
                        dispatch(getCityRepeated(indexRep))
                    } else {
                        
                        dispatch(getCitySuccess(city))
                    }
                })
                .catch((err) => {console.log(err); dispatch(getCityFailure())})

    }
}

export const fetchCurrentCity = (currentState) => {
    return (dispatch) => {
        dispatch(getCity())
        getLocation()
        .then(response => fetchCityAPIByCoordinates(response.location, 'current'))
            .then(city => {

                let indexRep = currentState.findIndex(currentCity => currentCity.apiId == city.apiId)
                if(indexRep < 0) {
                    dispatch(getCurrentSuccess(city))
                } else {
                    dispatch(getCityRepeated(indexRep))
                }
            })
            .catch((err) => {console.log(err); dispatch(getCityFailure())})
    }
}

export const fetchCityByCoordinates = (location, id, currentState, currentLocation) => {
    return (dispatch) => {
        currentLocation = currentLocation === null ? {} : currentLocation
        dispatch(getCity())
        fetchCityAPIByCoordinates(location, id)
            .then(city => {
                let indexRep = currentState.findIndex(currentCity => currentCity.apiId == city.apiId)
                    if(indexRep >= 0 || currentLocation.apiId == city.apiId) {
                        dispatch(getCityRepeated(indexRep))
                    } else {
                        dispatch(getCitySuccess(city))
                    }
            })
            .catch((err) => {console.log(err); dispatch(getCityFailure())})
    }
}

export const removeCity = (payload) => {
    return {
        type: REMOVE_CITY,
        id: payload 
    }
}

export const refreshData = () => {
    return {
        type: REFRESH_DATA,
    }
}

export const refreshDataSuccess = (payload) => {
    return {
        type: REFRESH_DATA_SUCCESS,
        payload 
    }
}

export const refreshCurrent = (payload) => {
    return {
        type: REFRESH_CURRENT,
        payload 
    }
}

export const refreshCities = (payload, currentLocation) => {
    return (dispatch) => {
        dispatch(refreshData())
        if(currentLocation !== null) {
            getLocation()
                .then(response => fetchCityAPIByCoordinates(response.location, 'current'))
                .then(city => dispatch(getCurrentSuccess(city)))
                .then(() => refreshCitiesAPI(payload))
                .then(cities => dispatch(refreshDataSuccess(cities)))
        } else {
            refreshCitiesAPI(payload)
                .then(cities => dispatch(refreshDataSuccess(cities)))
        }
    }
}

export const suggestionsSuccess = (response) => {
    return {
        payload: response,
        type: SUGGESTION_SUCCESS
    }
}

export const getSuggestions = (cityName) => {
    return (dispatch) => {
        getSuggestionsAPI(cityName)
            .then(response => dispatch(suggestionsSuccess(response)))
    }
}

export const clearSuggestions = () => {
    return {
        type: CLEAR_SUGGESTIONS
    }
}

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
}

export const setCurrentRendered = () => {
    return {
        type: SET_CURRENT_RENDERED
    }
}

export const changeAllowRedirect = (payload) => {
    return {
        type: ALLOW_REDIRECT,
        payload
    }
}

export const changeAllowScroll = (payload) => {
    return {
        type: ALLOW_SCROLL,
        payload
    }
}

export const changeUnit = () => {
    return {
        type: CHANGE_UNIT,
    }
}