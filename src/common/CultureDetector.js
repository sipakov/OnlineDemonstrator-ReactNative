import * as React from 'react';
import { NativeModules, Platform } from 'react-native';

const defaultLocalization = 'en_US'
const CultureDetector = _ => {

        let deviceLanguage = Platform.OS === 'ios' ?
            NativeModules.SettingsManager.settings.AppleLocale :
            NativeModules.I18nManager.localeIdentifier;

        if (deviceLanguage === undefined) {
            // iOS 13 workaround, take first of AppleLanguages array 
            deviceLanguage = NativeModules.SettingsManager.settings.AppleLanguages[0]
            if (deviceLanguage == undefined) {
                return defaultLocalization
            }
        }
        return deviceLanguage
}
export default CultureDetector