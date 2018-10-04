/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Navigator, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import FBSDK, {LoginManager, LoginButton, AccessToken} from 'react-native-fbsdk';
import {connect} from 'react-redux'

type Props = {};
class HomeScreen extends Component<Props> {
  constructor() {
    super()
    this.state = {
    }
}

static navigationOptions = {
  header: null
}

render() {
return (
  <View style={styles.container}>
    <Text>{this.props.userName} @ HomeScreen</Text>
      <Image source={{uri: this.props.userImage}}
      style={{width: 150, height: 150, margin:10}} ></Image>
    <LoginButton
        readPermissions={['public_profile']} 
        onLogoutFinished={()=> this.props.navigation.push('Login')}></LoginButton>
  </View>
);
}
}

function mapStateToProps(state) {
return {
    userName : state.userName,
    userImage : state.userImage,
}
}

function mapDispatchToProps(dispatch) {
return {
    logIn : () => dispatch({ type: 'LOG_IN' }),
    logOut : () => dispatch({ type: 'LOG_OUT' }),
}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

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
