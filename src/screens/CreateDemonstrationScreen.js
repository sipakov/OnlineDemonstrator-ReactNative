import React, { useEffect, useState, setState } from 'react';
import { Button, View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import CreateDemonstration from '../components/CreateDemonstration'
import I18n from '../localization/I18n';

const addPoster = async (deviceId, title, name, message, longitude, latitude) => {
    try {       
        const url = 'http://localhost:5100/poster/add'      
        const data = { DeviceId: deviceId, Title: title.typeTitle, Name: name.typeName, Message: message.typeMessage, Latitude: latitude, Longitude: longitude }
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

const CreateDemonstrationScreen = ({ route, navigation }) => {
    return (
        <SafeAreaView >
            <ScrollView >
                <CreateDemonstration
                    addPoster={addPoster}
                    latitude={route.params.latitude}
                    longitude={route.params.longitude} 
                    navigation ={navigation}
                    >                   
                </CreateDemonstration>
            </ScrollView>
        </SafeAreaView>
    )
}
export default CreateDemonstrationScreen
