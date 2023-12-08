import {StyleSheet, View} from 'react-native';
import {Colors} from '../styles/index';
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager';
import {useEffect, useState} from "react";
import {Accuracy, ActivityType} from "expo-location";

async function requestPermissions() {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission to access location was denied');
    } else {
        const {status: backgroundStatus} = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus === 'granted') {
            await Location.startLocationUpdatesAsync('background_location_task', {
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 5000,
                distanceInterval: 3,
                activityType: ActivityType.Fitness
            });
        }
    }
}

export const RecordScreen = () => {
    const [locations, setLocations] = useState([]);
    const [newLocations, setNewLocations] = useState([]);

    useEffect(() => {
        (async () => {
            TaskManager.defineTask('background_location_task', ({data: {locations: locationData}, error}) => {
                if (error) {
                    console.log(error.message);
                    return;
                }
                setNewLocations(locationData);
                console.log(locations.length);
            });
            await requestPermissions();
        })();
    }, []);

    useEffect(() => {
        setLocations(locations.concat(newLocations));
    }, [newLocations]);

    return (
        <View style={styles.view}>
            <MapView style={styles.map}>
                {locations.map((location, index) => (
                    <Marker key={index}
                            coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude}}/>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: Colors.background,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});