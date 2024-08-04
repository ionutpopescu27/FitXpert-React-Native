import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, Image } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH, FIREBASE_DB } from '../app/context/FirebaseConfig';
import { SvgUri } from 'react-native-svg';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { ref, set } from 'firebase/database';


const RegisterScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;

    const storeData = async (email, password) => {
      try {
        const db = FIREBASE_DB;
        const userRef = ref(db, 'users/' + email.replace('.', '_'));
        await set(userRef, {
          email: email,
          password: password,
        });
        console.log('User data stored in Realtime Database');
      } catch (error) {
        console.error('Error storing user data in Realtime Database: ', error);
      }
    };
    

    const signUp = async () => {
        setLoading(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Check your emails!');
            storeData(email, password);
        } catch (error){
            console.log(error);
            alert('Sign up failed: ' + error)
        } finally {
            setLoading(false);
        }
    }

    return(
        <KeyboardAvoidingView
        style={styles.container}
        behaviour="padding"
        > 
          <SvgUri
          width="65%"
          height="52%"
          uri="https://www.svgrepo.com/show/530453/mail-reception.svg"
          style={styles.image}
          />
       
          <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text) }
                style={styles.inputText}
              />
              <TextInput
                placeholder="Password"
                value={password }
                onChangeText={text => setPassword(text)}
                style={styles.inputText}
                secureTextEntry
              />
          </View>

          <View style={styles.buttonContainer1}>
            <Pressable
              onPress={() => signUp()}
              style={[styles.loginButton]}>
              <Text style={styles.buttonText}>Create Account</Text>
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
    titleContainer:{
        justifyContent: 'center',
        alignItems:'center',
        padding: 10,
    },
    inputContainer:{
        width: '80%',
    },
    inputText:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
        borderColor:'#d3d4d3',
        borderWidth: 1,
    },
    titleText:{
      fontFamily:'sans-serif-medium',
      fontSize: 20,
      textAlign: 'center'
    },
    buttonContainer1:{
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    buttonContainer2:{
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
  },
    loginButton:{
        backgroundColor:'#24dbc9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    registerButton:{
      backgroundColor:'#8e8e8e',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
  },
    buttonOutline:{
      backgroundColor:'white',
      marginTop: 5,
      borderColor: '#24dbc9',
      borderwidth: 2,
    },
    buttonText:{
      color:'white',
      fontFamily:'sans-serif-medium',
      fontSize: 14,
    },
    image:{
      paddingBottom: 20,
    }
  })

export default RegisterScreen;