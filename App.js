import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import AppNavigator from './src/navigators/AppNavigator';
import SplashScreen from 'react-native-splash-screen'
import AppContext from './AppContext'

export default function App() {
  const [fcmToken, setFcmToken] = useState({ fcmToken: ''});
  const state = { fcmToken, setFcmToken };
  useEffect(() => {    
    SplashScreen.hide();  
    requestUserPermission().then(fcm=> {
      setFcmToken(fcm);
    }); 
    }, []);
  return (
    <AppContext.Provider value={state}>
    <AppNavigator/>
    </AppContext.Provider>
  );
}

  requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    const fcm = await getFcmToken();
    return fcm
  }
}

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    return fcmToken;
  } else {
   console.log("Failed", "No token received");
  }
}

