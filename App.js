import React, {useEffect, useState } from 'react';
import { Text, SafeAreaView} from 'react-native';
import {
  LoginButton,
  AccessToken,
} from 'react-native-fbsdk-next';
import {Settings} from 'react-native-fbsdk-next';
import Realm from 'realm';

import app from './realmApp';



const App = () => {

  useEffect(() => {
    Settings.setAdvertiserTrackingEnabled(true);
    Settings.initializeSDK();
  }, []);

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
            // Log the user in to your app
            const credentials = Realm.Credentials.facebook(accessToken);
            app.logIn(credentials).then(user => {
              setUser(user)
            });
          }
        }}
        onLogoutFinished={() =>  setUser(null)
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
