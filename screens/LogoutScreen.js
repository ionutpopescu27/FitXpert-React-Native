import React from 'react';
import { View, Pressable, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../app/context/FirebaseConfig';
import * as SecureStore from 'expo-secure-store';
import { Svg, SvgUri } from 'react-native-svg';

export default function LogoutScreen({ navigation }) {

    const logout = async () => {
        await signOut(FIREBASE_AUTH);
        await SecureStore.deleteItemAsync('userToken');
        navigation.replace('LoginScreen'); // From AuthStack
    };

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'>
          <View style={styles.buttonContainer1}>
          <SvgUri 
          width="100%"
          height="100"
          uri="https://www.svgrepo.com/show/453388/person.svg"/>
            <Pressable
              onPress={() => logout()}
              style={[styles.registerButton]}>
                <Text style={styles.buttonText}>LOGOUT</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    container:{
    width:'100%',
    justifyContent: 'center',
    alignItems:'center', 
},      
    buttonContainer1:{
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    },
    registerButton:{
    backgroundColor:'#8e8e8e',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    },
    buttonText:{
    color:'white',
    fontFamily:'sans-serif-medium',
    fontSize: 14,
    },

})
