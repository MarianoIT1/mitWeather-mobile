import {REMOVE_CITY, GET_CITY, GET_CITY_SUCCESS, GET_CITY_FAILURE, GET_CITY_REPEATED, GET_CITY_NOT_STRING, REFRESH_DATA, REFRESH_DATA_SUCCESS, SUGGESTION_SUCCESS, CLEAR_SUGGESTIONS, CLEAR_ERROR, GET_CURRENT_SUCCESS, SET_CURRENT_RENDERED, REFRESH_CURRENT, ALLOW_REDIRECT, ALLOW_SCROLL, CHANGE_UNIT} from '../actions';

const initialState = { 
                        saveData: [],
                        data: [],
                        isFetching: false,
                        isRefreshing: false,
                        error: false,
                        placeholder: "Enter location",
                        indexRep: false,
                        id: 0,
                        suggestions: [],
                        currentLocation: null,
                        currentWasRendered: false,
                        allowRedirect: false,
                        allowScroll: 0,
                        unit: 'celsius'           
                     }

export default function rootReducer(state = initialState, action) {
    switch (action.type) {

        case GET_CITY:
            return {
                ...state,
                isFetching: true,
                error: false,
                indexRep: false,
                placeholder: "Searching..",
                suggestions: []
            }

        case GET_CITY_SUCCESS:
            return {
                ...state,
                data: [
                    ...state.data,
                    action.city
                ],
                isFetching: false,
                placeholder: "Enter location",
                saveData: [...state.saveData, {location: {latitude: action.city.lat, longitude: action.city.lon}, id: action.city.id}],
                id: state.id + 1,
                allowScroll: 2
                
            }
            
        case GET_CURRENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                placeholder: "Enter location",
                currentLocation: action.currentLocation,
                saveData:[...state.saveData.filter(s => s.id !== 'current'), {location: {latitude: action.currentLocation.lat, longitude: action.currentLocation.lon}, id: 'current'}],
                allowScroll: 1
            }

        case REFRESH_CURRENT:
            return {
                ...state,
                currentLocation: action.currentLocation,
            }

        case GET_CITY_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                placeholder: 'Wrong city, please try again'
            }

        case GET_CITY_NOT_STRING:
            return {
                ...state,
                isFetching: false,
                error: true,
                placeholder: 'Invalid entry, please try again'
            }

        case GET_CITY_REPEATED:
            return {
                ...state,
                isFetching: false,
                error: true,
                placeholder: action.indexRep === -1 ? 'This city is your current location' : 'This city was already searched',
                indexRep: action.indexRep
            }

        case REMOVE_CITY:
            return {
                ...state,
                data: state.data.filter(oldCities => oldCities.id !== action.id),
                saveData: state.saveData.filter(oldSaveData => oldSaveData.id !== action.id)
            }
        
        case REFRESH_DATA:
            return {
                ...state,
                isRefreshing: true
            }

        case REFRESH_DATA_SUCCESS:
            return {
                ...state,
                data: [ ...action.payload],
                isRefreshing: false,
            }

        case SUGGESTION_SUCCESS:
            return {
                ...state,
                suggestions: action.payload.length === 0 ? state.suggestions : action.payload
            }

        case CLEAR_SUGGESTIONS:
            return {
                ...state,
                suggestions: []
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: false,
                placeholder: "Enter location",
            }

        case SET_CURRENT_RENDERED:
            return {
                ...state,
                currentWasRendered: true
            }

        case ALLOW_REDIRECT: 
            return {
                ...state,
                allowRedirect: action.payload 
        }

        case ALLOW_SCROLL: 
            return {
                ...state,
                allowScroll: action.payload 
        }

        case CHANGE_UNIT:
            return {
                ...state,
                unit: state.unit === 'celsius' ? 'fahrenheit' : 'celsius'
            }
        
        default: return state;
    }
}