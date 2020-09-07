import React from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import CreatePoster from '../components/CreatePoster'
import I18n from '../localization/I18n';

const addPoster = async (deviceId, isExpired, title, name, message, demonstrationId, baseOs) => {
    try {
        let url = ''
        if (isExpired) {
            url = 'https://onlinedemonstrator.ru/poster/addToExpiredDemonstration'
        }
        else {
            url = 'https://onlinedemonstrator.ru/poster/addToExistDemonstration'
        }
        const data = { Name: name.typeName.trim(), Title: title.typeTitle.trim(), Message: message.typeMessage.trim(), DeviceId: deviceId, DemonstrationId: demonstrationId, BaseOs: baseOs }
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

const CreatePosterScreen = ({ route, navigation }) => {
    return (
        <SafeAreaView >
            <ScrollView >
                <CreatePoster
                    addPoster={addPoster}
                    demonstrationId={route.params.demonstrationId}
                    isExpired={route.params.isExpired}
                    navigation={navigation}
                >
                </CreatePoster>
            </ScrollView>
        </SafeAreaView>
    )
}
export default CreatePosterScreen
