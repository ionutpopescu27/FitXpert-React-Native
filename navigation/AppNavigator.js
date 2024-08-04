import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import  AuthStack  from './AuthStack';
import  AppStack  from './AppStack';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../app/context/FirebaseConfig';
import * as SecureStore from 'expo-secure-store';

export default function AppNavigator (){

    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
            if (user) {
              // User is signed in, save token
              const token = await user.getIdToken();
              await SecureStore.setItemAsync('userToken', token);
              setUser(user);
            } else {
              // User is signed out, remove token
              await SecureStore.deleteItemAsync('userToken');
              setUser(null);
            }
            setLoading(false);
          });
      
          return () => unsubscribe();

    }, [])

    return (

        <NavigationContainer>
        {user ? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
    );
};

