import React, { useEffect, useState, setState } from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import I18n from '../localization/I18n';
import DeviceInfo from 'react-native-device-info';

const CreateDemonstration = ({ addPoster, latitude, longitude, navigation }) => {

    const [typeTitle, setStateTitle] = React.useState('');
    const [typeMessage, setStateMessage] = React.useState('');
    const [typeName, setStateName] = React.useState('');

    const uniqueDeviceId = DeviceInfo.getUniqueId();

    return (
        <View>
            <Text style={styles.title}>{I18n.t('title')}</Text>
            <TextInput
                autoFocus={true}
                fontSize={18}
                padding={5}
                placeholder={I18n.t('title')}
                onChangeText={(text => { setStateTitle(() => { return { typeTitle: text } }) })}
                style={styles.inputTitle} maxLength={100}
            />
            <Text style={styles.title}>{I18n.t('name')}</Text>
            <TextInput
                fontSize={18}
                padding={5}
                style={styles.inputTitle} maxLength={30}
                onChangeText={(text => { setStateName(() => { return { typeName: text } }) })}
                placeholder={I18n.t('name')}
            />
            <Text style={styles.title}>{I18n.t('message')}</Text>
            <TextInput
                fontSize={18}
                padding={5}
                style={styles.inputMessage} multiline={true} maxLength={1000} numberOfLines={30}
                onChangeText={(text => { setStateMessage(() => { return { typeMessage: text } }) })}
                placeholder={I18n.t('message')}
            />
            <TouchableOpacity onPress={() =>
                {
                 if(typeTitle.length < 1 || typeMessage.length < 1) 
                 {
                    Alert.alert(
                        I18n.t('notification'),
                        I18n.t('requiredFieldTitleAndMessage'),
                        [
                            { text: I18n.t('OK') }
                        ],
                        { cancelable: false }
                    )
                 } 
                else
                {
                    addPoster(uniqueDeviceId, typeTitle, typeName, typeMessage, longitude, latitude).then(() => navigation.goBack())
                }
                }}>
                <View style={styles.itemAdd}>
                    <Text style={styles.text}>{I18n.t('createPoster')}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default CreateDemonstration

const styles = StyleSheet.create({
     title: {
        fontSize: 18,
        padding: 20
    },
    inputTitle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white'
    },
    inputMessage: {
        height: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        marginBottom: 20
    },
    itemAdd: {
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aec9f9',
    },
    text: {
        fontSize: 18,
        color: '#007AFF'
    }
});