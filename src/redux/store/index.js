import {createStore, applyMiddleware} from "redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['isFetching', 'isRefreshing', 'error', 'indexRep', 'allowRedirect']
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore( persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store)