import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Linking } from 'react-native';

const ContactsScreen = _ => {

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.horizontal}>
          <Text style={styles.textCommon}>Email: </Text>
          <Text style={styles.textLink} onPress={() => Linking.openURL('https://sipakov1987@gmail.com')}>sipakov1987@gmail.com</Text>
        </View>
        <View style={styles.horizontal}>
          <Text style={styles.textCommon}>GitHub: </Text>
          <Text style={styles.textLink} onPress={() => Linking.openURL('https://github.com/sipakov')}>github.com/sipakov</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ContactsScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  horizontal: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  textCommon: {
    fontSize: 16,
    fontWeight: '500'
  },
  textLink: {
    fontSize: 16,
    color: 'blue',
  }
})
