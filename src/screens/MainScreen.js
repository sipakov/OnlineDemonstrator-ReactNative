import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import I18n from '../localization/I18n';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import AppContext from '../../AppContext';

const getCount = async () => {
  try {
    let response = await fetch(
      'https://onlinedemonstrator.ru/demonstration/getDemonstrationCount'
    );
    let json = await response.json();
    if (response.status !== 200) {
      Alert.alert(
        I18n.t('notification'),
        json.message,
        [
          { text: I18n.t('OK') }
        ],
        { cancelable: false }
      )
    }
    return json;
  } catch (error) {
    Alert.alert(
      I18n.t('notification'),
      I18n.t('commonErrorMessage'),
      [
        { text: I18n.t('OK') }
      ],
      { cancelable: false }
    )
  }
}

const addDevice = async (uniqueDeviceId, baseOs, fcmToken) => {
  try {
      const url = 'https://onlinedemonstrator.ru/device/add';
      const locales = I18n.locale;
      const locale = locales.substring(0,2);
      const data = { DeviceId: uniqueDeviceId, BaseOs: baseOs, FcmToken: fcmToken, locale: locale}
      const body = JSON.stringify(data)
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: body
      })
      const result = await response.json();
      if (response.status !== 200) {
          Alert.alert(
              I18n.t('notification'),
              result.message,
              [
                  { text: I18n.t('OK') }
              ],
              { cancelable: false }
          )
      }
      return result;
  } catch (error) {
    console.log(error)
  }
}


const MainScreen = ({ navigation }) => {

  const uniqueDeviceId = DeviceInfo.getUniqueId();
  const [baseOs, setBaseOs] = React.useState('');
  const { fcmToken, setFcmToken } = useContext(AppContext);

  //useEffect(() => {    
    DeviceInfo.getBaseOs().then(res => setBaseOs(res));
    addDevice(uniqueDeviceId, baseOs, fcmToken).then(res => console.log(res));
//}, []);

const initialState = -1;
  const [demonstrationCount, setData] = useState({actualCount: initialState, expiredCount: initialState});
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCount().then(res => setData(res));
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView >
      <ImageBackground source={require('../asserts/images/mainScreen.png')} style={{ width: '100%', height: '100%' }} imageStyle={{ opacity: 0.7 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 70 }}>
          <TouchableOpacity onPress={() => navigation.navigate('DemonstrationsScreen')}>
            <View style={styles.itemLook}>
              <Text style={styles.text}>{I18n.t('lookForDemonstrations')}</Text>              
                  <View style={styles.itemLookCountContainer}>
                    <Text style={styles.itemLookCountText}>{demonstrationCount.actualCount === initialState ? <ActivityIndicator /> : demonstrationCount?.actualCount + ' '}</Text>
                    <Icon name="paper-plane-outline" size={18} cache='force-cache' color={'gray'}></Icon>
                    <Text style={styles.itemLookCountText}>{demonstrationCount.expiredCount === initialState ? <ActivityIndicator /> : '     ' + demonstrationCount?.expiredCount + ' '}</Text>
                    <Icon name="repeat-outline" size={18} cache='force-cache' color={'gray'}></Icon>
                  </View>            
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
            <View style={styles.itemAdd}>
              <Text style={styles.text}>{I18n.t('createNewDemonstration')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>)
}
export default MainScreen

const styles = StyleSheet.create({

  itemLook: {
    padding: 10,
    marginHorizontal: 1,
    width: 350,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50,
  },
  itemAdd: {
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 1,
    width: 350,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 50
  },
  itemLookCountContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: 5,
    color: '#222f64'
  },
  itemLookCountText: {
    fontSize: 18,
    color: 'gray'
  },
  text: {
    fontSize: 22,
    color: '#222f64',
  }
})