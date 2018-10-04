/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Navigator, Image} from 'react-native';
import FBSDK, {LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import {StackNavigator} from 'react-navigation';
import {connect} from 'react-redux'


type Props = {};
class LoginScreen extends Component<Props> {
    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount() {
        AccessToken.getCurrentAccessToken().then(
            (data) => {console.log(data);
                if (data != null) {
                    console.log("Token is here")
                    
                    let accessToken = data.accessToken
                    console.log(accessToken.toString())
                    
                    const responseInfoCallback = (error, result) => {
                        if (error) {
                            console.log(error)
                            alert('Error fetching data: ' + error.toString());
                        } else {
                            console.log(result)
                            alert('Welcome back: ' + result.name.toString());                                     
                            this.loginFB(result);
                        }
                    }
                    
                    const infoRequest = new GraphRequest('/me',
                    {
                        accessToken: accessToken,
                        parameters: {
                            fields: {
                                string: 'name,picture.type(large)'
                            }
                        }
                    },responseInfoCallback);
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start()

                    this.props.navigation.navigate('Home')
                } else {
                    this.props.logOut();
                }}
        );
    }

  static navigationOptions = {
      header: null
  }
  
loginFB(result) {
    let uName = result.name
    this.props.logIn(result);
    console.log(uName)
    this.props.navigation.navigate('Home')
}

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
            readPermissions={['public_profile']}
            onLoginFinished={
                (error, result)=> {
                    if(error) {
                        console.log("login error" + result.error);
                    } else if(result.isCancelled) {
                        console.log("login is cancelled");
                    } else {
                        AccessToken.getCurrentAccessToken().then(
                            (data) => 
                            {
                                let accessToken = data.accessToken
                                console.log(accessToken.toString())
                    
                                const responseInfoCallback = (error, result) => {
                                  if (error) {
                                    console.log(error)
                                    alert('Error fetching data: ' + error.toString());
                                  } else {
                                    console.log(result)
                                    alert('Success fetching data: ' + result.name.toString());                                     
                                    this.loginFB(result);
                                  }
                                }
                    
                                const infoRequest = new GraphRequest(
                                  '/me',
                                  {
                                    accessToken: accessToken,
                                    parameters: {
                                      fields: {
                                        string: 'name,picture.type(large)'
                                      }
                                    }
                                  },
                                  responseInfoCallback
                                );
                                // Start the graph request.
                                new GraphRequestManager().addRequest(infoRequest).start()
                              }
                        )
                    }
                }
            }></LoginButton>
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
        logIn : (result) => dispatch({ type: 'LOG_IN',
                                    dispatchName : result.name,
                                    dispatchImage : result.picture.data.url}),
        logOut : () => dispatch({ type: 'LOG_OUT',}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

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
