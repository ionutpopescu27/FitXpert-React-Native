import React from 'react';  
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StartScreen from '../screens/StartScreen';
import LogoutScreen from '../screens/LogoutScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from '../screens/HomeStack';

export default function AppStack() {

    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    return (
            <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
            >
                <Tab.Screen 
                name="Home" 
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name={"home"} color={color} size={30} />
                    ),
                }}    
                />
                <Tab.Screen 
                name="Start" component={StartScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name={"dumbbell"} color={color} size={30} />
                    ),
                }}    
                />

                <Tab.Screen
                name="Profile" component={LogoutScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name={"account"} color={color} size={30} />
                    ),
                }} 
                />

            </Tab.Navigator>

                            
    );

}