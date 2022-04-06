import React, {Component, useState } from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import app from './realmApp';
import Realm, { User } from 'realm';



const App = () => {
  const [userInfo, setUser] = useState(null);
  let accessToken;
  const getFacebookAccessToken = async () => {
    let data;

    try {
      data = await AccessToken.getCurrentAccessToken();
    } catch (error) {
      console.log(error);
    }

    return data.accessToken.toString();
  };
  return (
    <SafeAreaView>
      <LoginButton
        onLoginFinished={async (error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            // Get the access token from a client application using the Facebook SDK
            accessToken = await getFacebookAccessToken();
            // console.log(accessToken, 'accessToken')
            // Log the user in to your app
            const credentials = Realm.Credentials.facebook(accessToken);
            app.logIn(credentials).then(user => {
              setUser(user)
              console.log(`Logged in with id: ${user}`);
            });
          }
        }}
        onLogoutFinished={() => setUser(null)
        }
      />
              {userInfo ? (
          <Text style={{fontSize: 16, marginVertical: 16}}>
            You are logged in 
          </Text>
        ): (<Text style={{fontSize: 16, marginVertical: 16}}>
          You are logged out 
        </Text>)}
    </SafeAreaView>
  );
};

export default App;
