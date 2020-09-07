import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import Poster from '../components/Poster'
import I18n from '../localization/I18n';

const getPoster = async (deviceId, createdDate, demonstrationId) => {
    try {
        const url = 'https://onlinedemonstrator.ru/poster/getPosterById'
        const data = { DeviceId: deviceId, CreatedDate: createdDate, DemonstrationId: demonstrationId }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
        return result
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

const PosterScreen = ({ route, navigation }) => {
    const [poster, setData] = useState([]);

    useEffect(() => {
        getPoster(route.params.deviceId, route.params.createdDate, route.params.demonstrationId).then(res => setData(res));
    }, []);

    return (
        <SafeAreaView >
            <View>
                <Poster
                    poster={poster}
                />
            </View>
        </SafeAreaView>
    );
}
export default PosterScreen
