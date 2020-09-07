import React, { useEffect, useState, } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import I18n from '../localization/I18n';
import DeviceInfo from 'react-native-device-info';

const CreatePoster = ({ addPoster, demonstrationId, isExpired, navigation }) => {

    const [typeTitle, setStateTitle] = React.useState('');
    const [typeMessage, setStateMessage] = React.useState('');
    const [typeName, setStateName] = React.useState('');
    const [baseOs, setBaseOs] = React.useState('');
    const [uniqueDeviceId, setUniqueDeviceId] = React.useState('');

    useEffect(() => {
        setUniqueDeviceId(() => DeviceInfo.getUniqueId());
        DeviceInfo.getBaseOs().then(res => setBaseOs(res));
    }, []);

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
            <TouchableOpacity onPress={() => addPoster(uniqueDeviceId, isExpired, typeTitle, typeName, typeMessage, demonstrationId, baseOs).then(() => navigation.goBack())}>
                <View style={styles.itemAdd}>
                    <Text style={styles.text}>{I18n.t('createPoster')}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default CreatePoster

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