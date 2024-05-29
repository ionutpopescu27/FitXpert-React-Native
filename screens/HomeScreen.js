import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../app/context/FirebaseConfig';

const HomeScreen = () => {

   
         async () => {
       
       try{
        const db = FIREBASE_DB;
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        });
                console.log("~~~~~~~~~~~~~~" + usersData);
    } catch (error){console.log(error);}}
      


    return(
        <View>
            <Text>Pagina de Home</Text>
        </View>
    );
}

export default HomeScreen;