# FBLoginApp

<img src="https://media.giphy.com/media/FCAf4VqYnLOvq9J1BS/giphy.gif" height="400" />

Deliverables

Create and setting up the Facebook app configuration in https://developers.facebook.com/

react-native-fbsdk https://github.com/facebook/react-native-fbsdk

I use https://github.com/facebook/react-native-fbsdk instead of https://github.com/magus/react-native-facebook-login .

configuring the native projects in Android in `MainActivity.java`.
Then using the `LoginButton` to access the token
```
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
```

function inside the `componentDidMount` will also check whether the token is still valid or not. If it is still valid, it will pass the user's data to the state and automatically navigate to the HomeScreen. If there is no data, the state will be return to initial state, this is used when the user is logged out from the app. (Later they will return to this screen after the user logged out and again, it will check whether the data is there or not)

`loginFB` pass the result to the dispatcher which will triggers an action to create a new object which is username and the image link to reducer.
Then navigate to HomeScreen by using `this.props.navigation.navigate('Home')`

`HomeScreen` will retrieve the data saved in redux which is the name as well as the profile picture and assign it to its element.

`App.js` contains a simple redux usage where reducer will return a new object and pass it when it is necessary. Provider will wrap the components so it'll be able to store any state in redux.
```
<Provider store={store}>
        <AppStackNavigator/>
      </Provider>
```
`react-navigation` is used to navigate to another *page*
```
const AppStackNavigator = createStackNavigator({
  Login: LoginScreen,
  Home: HomeScreen
})
```
