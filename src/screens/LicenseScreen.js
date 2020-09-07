import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Alert, Text } from 'react-native';
import I18n from '../localization/I18n';
import { TextInput } from 'react-native-gesture-handler';

const LicenseScreen = ({ navigation }) => {

    return (
        <SafeAreaView>
<TextInput multiline={true} numberOfLines={30}>{I18n.t('license')}</TextInput>
        </SafeAreaView>
    );
}

export default LicenseScreen