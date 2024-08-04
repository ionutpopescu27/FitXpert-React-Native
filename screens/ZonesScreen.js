import {React, useState} from 'react';
import {View, Text, KeyboardAvoidingView, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { Card } from '@rneui/themed';


const ZonesScreen = () => {

    const calculateHeartRateZones = (age) => {
        const maxHeartRate = 220 - age;
        return {
            zone1: {
                range: "Zone1: Low Intensity",
                min: Math.round(maxHeartRate * 0.5),
                max: Math.round(maxHeartRate * 0.6)
            },
            zone2: {
                range: "Zone2: Weight Control",
                min: Math.round(maxHeartRate * 0.6),
                max: Math.round(maxHeartRate * 0.7)
            },
            zone3: {
                range: "Zone3: Aerobic",
                min: Math.round(maxHeartRate * 0.7),
                max: Math.round(maxHeartRate * 0.8)
            },
            zone4: {
                range: "Zone4: Anaerobic",
                min: Math.round(maxHeartRate * 0.8),
                max: Math.round(maxHeartRate * 0.9)
            },
            zone5: {
                range: "Zone5: Maximum /VO2 Max",
                min: Math.round(maxHeartRate * 0.9),
                max: Math.round(maxHeartRate)
            }
        };
    };
    


    const [age, setAge] = useState('');
    const [zones, setZones] = useState(null);
    const [error, setError] = useState(null);

    const handleCalculateZones = () => {
        const parsedAge = parseInt(age, 10);
        if (!isNaN(parsedAge) && parsedAge > 0 && parsedAge < 120) {
            setError(null);
            const calculatedZones = calculateHeartRateZones(parsedAge);
            setZones(calculatedZones);
        } else {
            setError('Please enter a valid age.');
            setZones(null);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.titleContainer}>
                     <Text style={styles.titleText}>Enter your age:</Text>
                </View>
                <TextInput
                    style={styles.inputText}
                    keyboardType="numeric"
                    value={age}
                    onChangeText={setAge}
                    placeholder="Age"
                />
                <View style={styles.buttonContainer}>    
                    <Pressable
                        onPress={handleCalculateZones}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            Submit
                        </Text>
                    </Pressable>
                </View>
                {error && <Text style={styles.error}>{error}</Text>}
            </View>

            {zones && (
                <View style={styles.zonesContainer}>
                    <Card>
                        <Card.Title style={{fontSize: 20}}>Your heart rate zones:</Card.Title>
                        <Card.Divider />
                        {Object.keys(zones).map((zoneKey) => (
                            <View key={zoneKey} style={styles.zone}>
                                <Text style={styles.zoneLabel}>{zones[zoneKey].range}</Text>
                                <Text style={styles.zoneRange}>
                                    {zones[zoneKey].min} - {zones[zoneKey].max} bpm
                                </Text>
                            </View>
                        ))}
                    </Card>
                </View>
            )}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container:{
        width:'100%',
        justifyContent: 'center',
        alignItems:'center', 
    },
    inputContainer: {
        marginBottom: 30,
        width: '80%',
        
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
    zonesContainer: {
        marginTop: 1,
        width: '80%',
        alignContent: 'center',
    },
    zone: {
        marginBottom: 15,
        alignSelf: 'center',    
    },
    zoneLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    zoneRange: {
        fontSize: 16,
        color: '#555',
        alignSelf: 'center',
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
titleContainer:{
    justifyContent: 'center',
    alignItems:'center',
    paddingBottom: 10,
   
},    
    titleContainer:{
        justifyContent: 'center',
        alignItems:'center',
        padding: 10,
    },
    titleText:{
      fontFamily:'sans-serif-medium',
      fontSize: 25,
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
});

export default ZonesScreen;
