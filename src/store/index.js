import {AsyncStorage} from 'react-native';

import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';

import reducers from '../reducers'

import {persistReducer,persistStore} from 'redux-persist';

const persistConfig={

    key:'root',
    storage:AsyncStorage,
   // whiteList:['']

}

const persistedReducer=persistReducer(persistConfig,reducers);

export const  store = createStore(
    persistedReducer,
    {},applyMiddleware(thunk)

);

export const persistedStore=persistStore(store)
persistedStore.purge()

