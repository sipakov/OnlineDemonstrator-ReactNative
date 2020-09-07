import React, {useEffect} from 'react';
import AppNavigator from './src/navigators/AppNavigator';
import * as RNLocalize from "react-native-localize";
import SplashScreen from 'react-native-splash-screen'

export default function App() {
  useEffect(() => { 
    SplashScreen.hide();
    }, []);
  return (
    <AppNavigator/>
  );
}
