import {React,useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ref, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { FIREBASE_DB } from '../app/context/FirebaseConfig';
import { Card } from '@rneui/themed';


const HistoryScreen = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state


    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setLoading(true); // Start loading
                const user = getAuth().currentUser; 
                if (user) {

                    console.log(`Logged in as: ${user.email}`); // Log user info
                    const activitiesPath = `users/${user.uid}/activities`; // Construct the path string
                    console.log(`Fetching activities from: ${activitiesPath}`); // Log the constructed path
                    const activitiesRef = ref(FIREBASE_DB, activitiesPath); 
                    const snapshot = await get(activitiesRef);
                    if (snapshot.exists()) {
                        console.log('Data snapshot exists:', snapshot.val()); // Log data
                        const activitiesData = snapshot.val();
                        const activitiesList = Object.keys(activitiesData).map(key => ({
                            id: key,
                            ...activitiesData[key],
                        }));
                        setActivities(activitiesList);
                    } else {
                        console.log('No data available', activitiesPath);
                    }
                } else {
                    console.log('No user is logged in');
                }
            } catch (err) {
                console.error('Error fetching activities:', err);
                setError(err); 
                setLoading(false); 
            }
        };

        fetchActivities();
    }, []);

    const renderActivity = ({ item }) => (
        <Card>
            <Card.Title>Activity at {new Date(item.timestamp).toLocaleString()}</Card.Title>
            <Card.Divider />
            <Text style={styles.text}>Duration: {item.duration}</Text>
            <Text style={styles.text}>Average Pulse: {item.avgPulse}</Text>
            <Text style={styles.text}>Calories Burnt: {item.calories}</Text>
        </Card>
    );
    
    return (

        <View style={styles.container}>
            <FlatList
                data={activities}
                renderItem={renderActivity}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    text: {
        fontSize: 16,
        marginVertical: 5,
    },
});

export default HistoryScreen;
