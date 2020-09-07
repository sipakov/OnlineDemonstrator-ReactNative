import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Alert } from "react-native";
import I18n from '../localization/I18n';

const getPostersForMarkers = async (posterCountPerDemo) => {
  try {
    let response = await fetch(
      `https://onlinedemonstrator.ru/poster/getFromActualDemonstrations?postersCountInDemonstration=${posterCountPerDemo}`
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

const createButtonAlert = () =>
    Alert.alert(
      null,
      I18n.t('mapAlertMessage'),
      [
        { text: I18n.t('OK') }
      ],
      { cancelable: false }
    );

const MapScreen = ({ navigation }) => {

  const [postersForMarkers, setData] = useState([]);
  const posterCountPerDemo = 3;

  useEffect(() => {
    createButtonAlert();
    const unsubscribe = navigation.addListener('focus', () => {
      getPostersForMarkers(posterCountPerDemo).then(res => setData(res));
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <MapView
      style={{ flex: 1 }}
      showsUserLocation={true}
      onPress={(e) => {
        if (e.nativeEvent.action !== 'marker-press') {
          console.log(e.nativeEvent.coordinate.longitude)
          navigation.navigate('CreateDemonstrationScreen', { longitude: e.nativeEvent.coordinate.longitude, latitude: e.nativeEvent.coordinate.latitude })
        }
      }}
    >
      {
        postersForMarkers?.map((poster) => <Marker
          pinColor={poster.isExpired ? '#8a9094' : 'red'}
          key={poster.deviceId.toString() + poster.createdDate.toString() + poster.demonstrationId.toString()}
          coordinate={{ latitude: poster.latitude, longitude: poster.longitude }}
          title={poster.title}
          description={poster.message}
        >
        </Marker >)
      }
    </MapView>
  )
}

export default MapScreen