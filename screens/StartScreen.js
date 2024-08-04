import {View, Text, KeyboardAvoidingView, StyleSheet, Pressable, Alert, Animated} from 'react-native';
import React, { useEffect, useState, useRef} from 'react';
import { ref, onValue, push } from 'firebase/database';
import { FIREBASE_DB } from '../app/context/FirebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { SvgUri } from 'react-native-svg';
import axios from 'axios';

const StartScreen = () => {

    const[bpm, setBpm] = useState('');
    const [bpmValues, setBpmValues] = useState([]);
    const [isRunning, setIsRunning] = useState(false); // To track if activity is running
    const [isPaused, setIsPaused] = useState(false); // To track if activity is paused
    const [isCompleted, setIsCompleted] = useState(false); // New state to track if activity is completed
    const [timer, setTimer] = useState(0); // To track the timer
    const timerRef = useRef(null); // To reference the timer interval
    const [userId, setUserId] = useState(null); // To store the user ID

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid); // Set the userId when the user is logged in
            } else {
                // Handle user not logged in
                console.log('No user is logged in');
            }
        });
    },[])

    useEffect(() => {
        if (isRunning && !isPaused) {
            // Fetch BPM data every second
            const bpmRef = ref(FIREBASE_DB, 'bpm');
            const unsubscribe = onValue(bpmRef, (snapshot) => {
                const data = snapshot.val();
                setBpm(data);
                setBpmValues((prevValues) => [...prevValues, data]);
            });

            // Start timer
            timerRef.current = setInterval(() => {
                setTimer((prevTime) => prevTime + 1);
            }, 1000);

            // Cleanup on component unmount
            return () => {
                clearInterval(timerRef.current);
                unsubscribe();
            };
        }   else if( isPaused) {
            // Stop timer
            clearInterval(timerRef.current);
        }
        else {
            // Stop timer
            clearInterval(timerRef.current);
        }
    }, [isRunning, isPaused]);
    
    const handleStart = async () => {
        try {

            const response = await axios.post('http://192.168.247.13:5000/run');
            console.log("Output: ", response.data.output);
            setIsRunning(true);
            setIsPaused(false);
            setIsCompleted(false);
            setTimer(0);
            setBpmValues([]);
           
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleStop = async () => {
        try {

            const response = await axios.post('http://192.168.247.13:5000/stop');
            console.log("Output: ", response.data.output);
            setIsRunning(false);
            setIsPaused(false);
            setIsCompleted(true);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handlePause = () => {
        setIsPaused(!isPaused); // Toggle the pause state
    }

    const calculateCalories = () => {
        return (bpm / 60) * timer * 0.1; 
    }

    const calculateAvgPulse = () => {
        if (bpmValues.length === 0) return 0;
        const sum = bpmValues.reduce((a, b) => a + b, 0);
        return sum / bpmValues.length;
    }

    const handleSave = async () => {
        try{

        const avgPulse = calculateAvgPulse().toFixed(2);
        const totalCalories = calculateCalories().toFixed(2);
        const duration = new Date(timer * 1000).toISOString().substr(11, 8);

        const activitiesRef = ref(FIREBASE_DB, `users/${userId}/activities`);
            await push(activitiesRef, {
                avgPulse: avgPulse,
                duration: duration,
                calories: totalCalories,
                timestamp: new Date().toISOString()    
            });
        Alert.alert("Activity saved!");
        setIsCompleted(false);
        }catch(error){
            console.error("Error:", error);
        }   
    }

    const handleDiscard = () => {

        Alert.alert("Activity discarded!");
        // Reset the states
        setIsCompleted(false);
    }

    const fadeIn = () => {
        Animated.timing(animated, {
          toValue: 0.4,
          duration: 100,
          useNativeDriver: true,
        }).start();
    };
      const fadeOut = () => {
        Animated.timing(animated, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
    };

    return(

        <KeyboardAvoidingView
        style={styles.container}
        behaviour="padding"
        > 
        <SvgUri
          width="65%"
          height="50%"
          uri="https://www.svgrepo.com/show/444214/camera-sports-mode.svg"
          />

        {isCompleted ? (
            <>
                <View style={styles.summaryContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Activity summary</Text>
                    </View>
                    <Text style={styles.dataText}>Avg Pulse: {calculateAvgPulse().toFixed(2)}</Text>
                    <Text style={styles.dataText}>Total Calories: {calculateCalories().toFixed(2)}</Text>
                    <Text style={styles.dataText}>Total Time: {new Date(timer * 1000).toISOString().substr(11, 8)}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={handleSave} style={styles.saveButton}>
                        <Text style={styles.buttonText}>Save Activity</Text>
                    </Pressable>
                
                    <Pressable onPress={handleDiscard} style={styles.discardButton}>
                        <Text style={styles.buttonText}>Discard</Text>
                    </Pressable>
                </View>
            </>    
        ) : isRunning?(
            <>  
                <View style={styles.dataContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Activity in progress</Text>
                        </View>
                        <Text style={styles.dataText}>BPM: {bpm}</Text>
                        <Text style={styles.dataText}>Time: {new Date(timer * 1000).toISOString().substr(11, 8)}</Text>
                        <Text style={styles.dataText}>Calories: {calculateCalories().toFixed(2)}</Text>
                </View>         
                <View style={styles.buttonContainer}>
                    {isPaused ? (
                                <Pressable onPress={handlePause} style={styles.resumeButton}>
                                    <Text style={styles.buttonText}>Resume</Text>
                                </Pressable>
                            ) : (
                                <Pressable onPress={handlePause} style={styles.pauseButton}>
                                    <Text style={styles.buttonText}>Pause</Text>
                                </Pressable>
                    )}
                    <Pressable
                    onPress={handleStop}
                    style={[styles.stopButton]}>
                        <Text style={styles.buttonText}>Stop activity</Text>
                    </Pressable>
                </View>
            </>
        ):( <>     
                <View style={styles.titleContainer}>
                     <Text style={styles.titleText}>Start your activity!</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                    onPress={handleStart}
                    style={[styles.startButton]}>
                        <Text style={styles.buttonText}>Start</Text>
                    </Pressable>
                </View>
            </>
        
    )}
        </KeyboardAvoidingView>  

    );
}
 
const styles = StyleSheet.create({

titleContainer:{
    justifyContent: 'center',
    alignItems:'center',
    paddingBottom: 10,
    paddingTop: 20
},    
titleText:{
      fontFamily:'sans-serif-medium',
      fontSize: 25,
    },
container:{
    width:'100%',
    justifyContent: 'center',
    alignItems:'center', 
},
dataContainer: {
    alignItems: 'center',
},
summaryContainer: {
        alignItems: 'center',
    },
dataText: {
    fontSize: 18,
    marginBottom: 10,
},
startButton:{
    backgroundColor:'#24dbc9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
},
stopButton:{
    backgroundColor:'#FF2400',
    width: '100%',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
},
pauseButton: {
        backgroundColor: '#FFA500',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
resumeButton: {
        backgroundColor: '#00BFFF',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
saveButton: {
    backgroundColor: '#4CAF50',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
},
discardButton: {
    backgroundColor: '#D32F2F',
    width: '100%',
    padding: 15,
    marginTop:10,
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
        marginTop: 30,
    },

})

export default StartScreen;