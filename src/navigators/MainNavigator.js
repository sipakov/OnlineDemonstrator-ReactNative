import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen'
import MapScreen from '../screens/MapScreen'
import AboutScreen from '../screens/AboutScreen'
import DemonstrationsScreen from '../screens/DemonstrationsScreen'
import CreateDemonstrationScreen from '../screens/CreateDemonstrationScreen'
import PostersScreen from '../screens/PostersScreen'
import PosterScreen from '../screens/PosterScreen'
import CreatePosterScreen from '../screens/CreatePosterScreen'


import I18n from '../localization/I18n';

const DemonstrationsStack = createStackNavigator();

export default function MainNavigator() {
    return (
        <DemonstrationsStack.Navigator >
            <DemonstrationsStack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{
                    headerShown: false,
                    headerTitle: I18n.t('mainScreen')
                }}
            />
             <DemonstrationsStack.Screen
                name='DemonstrationsScreen'
                component={DemonstrationsScreen}
                options={{
                    headerTitle: I18n.t('demonstrationsScreen')
                }}
            />
            <DemonstrationsStack.Screen
                name="PostersScreen"
                component={PostersScreen}
                options={{
                    headerTitle: I18n.t('postersScreen')
                }}
            />
            <DemonstrationsStack.Screen
                name="PosterScreen"
                component={PosterScreen}
                options={{
                    headerTitle: I18n.t('posterScreen')
                }}
            />
             <DemonstrationsStack.Screen
                name="CreatePosterScreen"
                component={CreatePosterScreen}
                options={{
                    headerTitle: I18n.t('createPosterScreen')
                }}
            />
            <DemonstrationsStack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{
                    headerTitle: I18n.t('mapScreen')
                }}
            />
             <DemonstrationsStack.Screen
                name="CreateDemonstrationScreen"
                component={CreateDemonstrationScreen}
                options={{
                    headerTitle: I18n.t('createDemonstrationScreen')
                }}
            />
           <DemonstrationsStack.Screen
                name="AboutScreen"
                component={AboutScreen}
            />
        </DemonstrationsStack.Navigator>
    );
}
