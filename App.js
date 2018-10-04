/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Navigator} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

const initialState = {
  userName : 'PROPS',
  userImage : ''
}

const reducer = (state = initialState, action) => {
  switch(action.type)
  {
    case 'LOG_IN':
      return(
        { ...state,
        userName: action.dispatchName,
        userImage: action.dispatchImage}
      );
      break;
    case 'LOG_OUT':
      return(
        { ...state,
        userName: '',
        userImage: ''}
      );
      break;
        default: {
          return {
            ...state
          }
    }
  }
}

const store = createStore(reducer);

type Props = {};
export default class App extends Component<Props> {

  _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
      if (result.isCancelled) {
        console.log('Login Success');
      } else {
        console.log("Login failed" + result.grantedPermissions.toString());
      }
    }, function(error) {
      console.log('An error occured' + error);
    })
  }

  render() {
    return (
      <Provider store={store}>
        <AppStackNavigator/>
      </Provider>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
