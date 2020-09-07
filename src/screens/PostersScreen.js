import React, { useEffect, useState } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import PosterList from '../components/PosterList'
import I18n from '../localization/I18n';

const getPosters = async (id) => {
    try {
        let response = await fetch(
            `https://onlinedemonstrator.ru/poster/getPostersByDemonstrationId?demonstrationId=${id}`
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

const PostersScreen = ({ route, navigation }) => {
    const [posters, setData] = useState([]);

    const goToPoster = (deviceId, createdDate, demonstrationId) =>
        navigation.navigate('PosterScreen', { deviceId: deviceId, createdDate: createdDate, demonstrationId: demonstrationId })

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getPosters(route.params.id).then(res => setData(res));
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView>
            <PosterList
                posters={posters}
                goToPoster={goToPoster}
                navigation={navigation}
                currentCulture={route.params.currentCulture}
                demonstrationId={route.params.id}
                isExpired={route.params.isExpired}
            />
        </SafeAreaView>
    );
}

export default PostersScreen
