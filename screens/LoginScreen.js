import { View, Text, TextInput, StyleSheet, Pressable, KeyboardAvoidingView, Image } from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import { FIREBASE_AUTH } from '../app/context/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SvgUri } from 'react-native-svg';

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;



    const signIn = async () => {
      setLoading(true);
      try{
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
        alert('Check your emails!');
      } catch (error){
          console.log(error);
          alert('Sign in failed: ' + error)
      } finally {
        setLoading(false);
      }
      }
    
    const goToRegister = async () => { 
        navigation.navigate('Register');
    }  


    return(
        <KeyboardAvoidingView
        style={styles.container}
        behaviour="padding"
        > 
       
          <SvgUri
          width="65%"
          height="50%"
          uri="https://www.svgrepo.com/show/530455/cloud-acceleration.svg"
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
              onPress={() => signIn()}
              style={[styles.loginButton]}>
              <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
          </View>

          <View style={styles.buttonContainer2}>
            <Pressable
              onPress={() => goToRegister()}
              style={[styles.registerButton]}>
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
        paddingVertical: 0,
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
      
    }
  })

export default LoginScreen;