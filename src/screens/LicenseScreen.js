import React, { useEffect, useState } from 'react';
import { SafeAreaView, Alert, Text, ScrollView } from 'react-native';
import I18n from '../localization/I18n';

const getLicense = async () => {
    try {
        let response = await fetch(
            'https://onlinedemonstrator.ru/metadata/getLicense'
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

const LicenseScreen = _ => {

    const [license, setData] = useState([]);

    useEffect(() => {
        getLicense().then(res => setData(res));
    }, []);
    console.log(license)
    return (
        <SafeAreaView >
            <ScrollView>
                <Text >{license.value}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

export default LicenseScreen