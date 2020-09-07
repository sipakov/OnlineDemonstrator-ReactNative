import * as React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import I18n from '../localization/I18n';

export default function AboutScreen({ navigation }) {
  console.log('about')
    return (
      <View style={styles.container} >
      <Button style={styles.button} title={I18n.t('contactsScreen')} onPress={()=> navigation.navigate('ContactsScreen')}></Button>
      <Button style={styles.button}  title={I18n.t('licenseScreen')}  onPress={()=> navigation.navigate('LicenseScreen')}></Button>
      <Button style={styles.button}  title={I18n.t('privacyPolicyScreen')}  onPress={()=> navigation.navigate('PrivacyPolicyScreen')}></Button>
    </View>)
  }

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      flex:1,
      }, 
    button:{
    }   
    })

