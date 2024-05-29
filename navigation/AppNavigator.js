import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import  AuthStack  from './AuthStack';
import  AppStack  from './AppStack';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../app/context/FirebaseConfig';

export default function AppNavigator (){

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log("User: " + user);
            setUser(user);
        })
    }, [])

    return (

        <NavigationContainer>
        {user ? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
    );
};

