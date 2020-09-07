import React, { useEffect, useState } from 'react';
import { SafeAreaView, Alert} from 'react-native';
import DemonstrationList from '../components/DemonstrationList';
import I18n from '../localization/I18n';

const getDemos = async () => {
    try {
        let response = await fetch(
            'https://onlinedemonstrator.ru/demonstration/getActualDemonstrations'
        );
        let json = await response.json();
        console.log(1)
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

const DemonstrationsScreen = ({ navigation }) => {
    const [demos, setData] = useState([]);

    const goToDemo = (id, currentCulture, isExpired) =>
        navigation.navigate('PostersScreen', { id: id, currentCulture: currentCulture, isExpired: isExpired })
      
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDemos().then(res => setData(res));
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView >
            <DemonstrationList
                demos={demos}
                goToDemo={goToDemo}
            />
        </SafeAreaView>
    );
}

export default DemonstrationsScreen

