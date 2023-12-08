import {useEffect, useState} from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {Accuracy, ActivityType} from 'expo-location';

export const useLocationUpdates = () => {
    const [locationUpdates, setLocationUpdates] = useState([]);

    useEffect(() => {
        const requestPermissions = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            } else {
                const {status: backgroundStatus} = await Location.requestBackgroundPermissionsAsync();
                if (backgroundStatus === 'granted') {
                    await Location.startLocationUpdatesAsync('background_location_task', {
                        accuracy: Accuracy.BestForNavigation,
                        timeInterval: 1000,
                        distanceInterval: 2,
                        activityType: ActivityType.Fitness,
                    });
                }
            }
        };

        TaskManager.defineTask('background_location_task', ({data: {locations: locationData}, error}) => {
            if (error) {
                console.log(error.message);
                return;
            }
            setLocationUpdates(locationData);
        });

        requestPermissions();
    }, []);

    return locationUpdates;
};
