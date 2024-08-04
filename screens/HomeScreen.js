import {View, Text, KeyboardAvoidingView, StyleSheet, Pressable, Icon, ScrollView} from 'react-native';
import React, { useEffect } from 'react';
import { Card } from '@rneui/themed';
import { createStackNavigator } from '@react-navigation/stack';
import ZonesScreen from './ZonesScreen';
import HistoryScreen from './HistoryScreen';



const HomeScreen = ({navigation}) => {

const Stack = createStackNavigator();

    const zonesHandle = async() => {
       navigation.navigate('Zones'); 
    } 

    const historyHandle = async() => {
        navigation.navigate('History');
    }


    return(
                

        <KeyboardAvoidingView 
        style={styles.container} 
        behavior='padding'
        > 
        <Stack.Navigator>
        <Stack.Screen name="Zones" component={ZonesScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
        </Stack.Navigator>
        
        <ScrollView>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Welcome to FitXpert!</Text>
            </View>

            <Card>
          <Card.Title>HEART RATE ZONES</Card.Title>
          <Card.Divider />
            <Card.Image
                style={styles.icon}
                source={{uri:'https://cdn2.iconfinder.com/data/icons/smartphone-mobile-apps/48/app_mobile_love_heart-512.png'}}>
                
                </Card.Image>
          <Text>
            Check your heart rate zones before proceeding to training!
          </Text>

          <View style={styles.buttonContainer}>
            <Pressable onPress={zonesHandle} style={styles.button}>
                <Text style={styles.buttonText}>VIEW NOW</Text>
            </Pressable>
          </View>

        </Card>

        <Card>
          <Card.Title>HISTORY</Card.Title>
          <Card.Divider />
            <Card.Image
                style={styles.icon}
                source={{uri:'https://cdn4.iconfinder.com/data/icons/zeir-time-events-vol-1/25/history_recent_orders-512.png'}}>
                
                </Card.Image>
          <Text>
            Check your training history!
          </Text>

          <View style={styles.buttonContainer}>
            <Pressable onPress={historyHandle} style={styles.button}>
                <Text style={styles.buttonText}>VIEW NOW</Text>
            </Pressable>
          </View>

        </Card>
        </ScrollView>
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
    paddingBottom: 10,
    paddingTop: 100
},    
titleText:{
      fontFamily:'sans-serif-medium',
      fontSize: 25,
    },
button:{
    backgroundColor:'#24dbc9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
},
buttonText:{
      color:'white',
      fontFamily:'sans-serif-medium',
      fontSize: 18,
    },
buttonContainer:{
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 30,
    },
icon:{
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    paddingLeft: 320,   
}
});
export default HomeScreen;