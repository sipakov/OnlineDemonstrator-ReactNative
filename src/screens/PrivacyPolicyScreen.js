import React, { useEffect, useState } from 'react';
import { SafeAreaView, Alert, Text, ScrollView } from 'react-native';
import I18n from '../localization/I18n';

const getPrivacyPolicy = async () => {
    try {
        let response = await fetch(
            'https://onlinedemonstrator.ru/metadata/getPrivacyPolicy'
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

const PrivacyPolicyScreen = _ => {

    const [privacyPolicy, setData] = useState([]);

    useEffect(() => {
        getPrivacyPolicy().then(res => setData(res));
    }, []);
    return (
        <SafeAreaView >
            <ScrollView>
                <Text >{privacyPolicy.value}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

export default PrivacyPolicyScreen