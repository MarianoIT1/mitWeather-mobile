import {REMOVE_CITY, GET_CITY, GET_CITY_SUCCESS, GET_CITY_FAILURE, GET_CITY_REPEATED, GET_CITY_NOT_STRING, REFRESH_DATA, REFRESH_DATA_SUCCESS, SUGGESTION_SUCCESS, CLEAR_SUGGESTIONS, CLEAR_ERROR, GET_CURRENT_SUCCESS, SET_CURRENT_RENDERED, REFRESH_CURRENT} from '../actions';

const initialState = { 
                       data: [],
                       isFetching: false,
                       isRefreshing: false,
                       error: false,
                       placeholder: "Enter location",
                       indexRep: false,
                       id: 0,
                       suggestions: [],
                       currentLocation: null,
                       currentWasRendered: false                  
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
                id: state.id + 1,
                
            }
            
        case GET_CURRENT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                placeholder: "Enter location",
                currentLocation: action.currentLocation,
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
                data: state.data.filter(oldCities => oldCities.id !== action.id)
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
                isRefreshing: false
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

        default: return state;
    }
}