import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AboutScreen from '../screens/AboutScreen'
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen'
import ContactsScreen from '../screens/ContactsScreen'
import LicenseScreen from '../screens/LicenseScreen'
import I18n from '../localization/I18n';

const AboutStack = createStackNavigator();

export default function AboutNavigator() {
    return (
        <AboutStack.Navigator >
            <AboutStack.Screen
                name="AboutScreen"
                component={AboutScreen}
                options={{
                    headerShown: false,
                    headerTitle: I18n.t('aboutScreen')
                }}
            />
             <AboutStack.Screen
                name='ContactsScreen'
                component={ContactsScreen}
                options={{
                    headerTitle: I18n.t('contactsScreen')
                }}
            />
            <AboutStack.Screen
                name="LicenseScreen"
                component={LicenseScreen}
                options={{
                    headerTitle: I18n.t('licenseScreen')
                }}
            />
             <AboutStack.Screen
                name="PrivacyPolicyScreen"
                component={PrivacyPolicyScreen}
                options={{
                    headerTitle: I18n.t('privacyPolicyScreen')
                }}
            />
            
        </AboutStack.Navigator>
    );
}
