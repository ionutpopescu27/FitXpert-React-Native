import {View, Text, KeyboardAvoidingView, StyleSheet, Pressable, Icon, ScrollView} from 'react-native';
import React, { useEffect } from 'react';
import { Card } from '@rneui/themed';
import { createStackNavigator } from '@react-navigation/stack';
import ZonesScreen from './ZonesScreen';
import HistoryScreen from './HistoryScreen';
import HomeScreen from './HomeScreen';


const HomeStack = ({navigation}) => {

    const Stack = createStackNavigator();


    return(

        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} 
                options={{ 
                    headerTitle: '', 
                    headerStyle: {
                    backgroundColor: '#f8f8f8', 
                    },
                    headerTintColor: '#333',
                }} 
            />

            <Stack.Screen name="Zones" component={ZonesScreen} 
                options={{ 
                    headerTitle: 'Heart rate zones', 
                    headerStyle: {
                    backgroundColor: '#f8f8f8', 
                    },
                    headerTintColor: '#333',
                }} 
            />
            
            <Stack.Screen name="History" component={HistoryScreen}
                options={{ 
                        headerTitle: ' History', 
                        headerStyle: {
                        backgroundColor: '#f8f8f8', 
                        },
                        headerTintColor: '#333',
                    }}  
            />
        </Stack.Navigator>
    );


}

export default HomeStack;
