import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './src/routes/Navigator';
import {Provider} from 'react-redux'
import {store,persistedStore} from './src/store';
import {PersistGate} from 'redux-persist/integration/react'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <Navigator  ></Navigator>
        
      </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
 
});
