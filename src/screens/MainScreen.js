import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,StyleSheet, ImageBackground, Alert } from 'react-native';
import I18n from '../localization/I18n';
import Icon from 'react-native-vector-icons/Ionicons';

const getCount = async () => {
  try {
      let response = await fetch(
          'https://onlinedemonstrator.ru/demonstration/getDemonstrationCount'
      );
      let json = await response.json();
      console.log('main')
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

const MainScreen = ({ navigation }) => {
  const [demonstrationCount, setData] = useState([]);

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
      getCount().then(res => setData(res));
  });
  return unsubscribe;
}, [navigation]);
  return (
    <View >
      <ImageBackground source={require('../asserts/images/mainScreen.png')} style={{width: '100%', height: '100%'}} imageStyle={{opacity: 0.7}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 70}}>
      <TouchableOpacity onPress={() => navigation.navigate('DemonstrationsScreen')}>
      <View style ={styles.itemLook}>
        <Text style ={styles.text}>{I18n.t('lookForDemonstrations')}</Text>
        <View style ={styles.itemLookCountContainer}>
        <Text style ={styles.itemLookCountText}>{demonstrationCount?.actualCount + ' '}</Text>
        <Icon name="paper-plane-outline" size={18} cache='force-cache' color={'gray'}></Icon>
        <Text style ={styles.itemLookCountText}>{'     ' + demonstrationCount?.expiredCount + ' '}</Text>
        <Icon name="repeat-outline" size={18} cache='force-cache' color={'gray'}></Icon>

        </View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
      <View style ={styles.itemAdd}>
        <Text style ={styles.text}>{I18n.t('createNewDemonstration')}</Text>
      </View>
      </TouchableOpacity>
      </View>
      </ImageBackground>
      
    </View>)
}
export default MainScreen

const styles = StyleSheet.create({
  
  itemLook: {
    padding: 10,
    //marginVertical: 20,
    marginHorizontal: 1,
    width:350,
    alignItems: 'center',
    //borderWidth:1,
    //borderWidth:1,
    //borderColor: '#222f64',
    backgroundColor:'rgba(255, 255, 255, 0.9)',
    borderRadius:50,
    
    
    //opacity:0.5 
  
    },
    itemAdd: {
      padding: 20,
      marginVertical: 20,
      marginHorizontal: 1,
      width:350,
      alignItems: 'center',
      //borderWidth:1,
      //borderColor: '#222f64',
      //backgroundColor:'#aec9f9',
      backgroundColor:'rgba(255, 255, 255, 0.9)',
      borderRadius:50
          },
      itemLookCountContainer: {
        flexDirection: 'row', 
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 5,
        color:'#222f64'
        },
        itemLookCountText: {
          fontSize: 18,
          color:'gray'
          },
  text: {
      fontSize: 22,
      color:'#222f64',
      //fontWeight:'bold'
  }
  })