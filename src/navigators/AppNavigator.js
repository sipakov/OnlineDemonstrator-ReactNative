import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainNavigator from '../navigators/MainNavigator';
import I18n from '../localization/I18n';
import Icon from 'react-native-vector-icons/Ionicons';
import AboutNavigator from '../navigators/AboutNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = _ => {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBarOptions={{
                style: {
                    backgroundColor: '#373737',
                },
            }}>
                <Tab.Screen name={I18n.t('mainScreen')} component={MainNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="earth-outline" color={color} size={26} cache='force-cache' />
                        ),
                    }}>
                </Tab.Screen>
                <Tab.Screen name={I18n.t('aboutScreen')} component={AboutNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="information-circle-outline" color={color} size={26} cache='force-cache' />
                        ),
                    }}>
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigator