import {useEffect, useState} from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {Accuracy, ActivityType} from 'expo-location';
import {waitFor} from "@babel/core/lib/gensync-utils/async";

export const useLocationUpdates = () => {
    const [locationUpdates, setLocationUpdates] = useState([]);

    useEffect(() => {
        TaskManager.defineTask('background_location_task', ({data: {locations: locationData}, error}) => {
            if (error) {
                console.log(error.message);
                return;
            }
            setLocationUpdates(locationData);
        });
        while(!TaskManager.isTaskDefined('background_location_task'));
        const requestPermissions = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            } else {
                const {status: backgroundStatus} = await Location.requestBackgroundPermissionsAsync();
                if (backgroundStatus === 'granted') {
                    await Location.startLocationUpdatesAsync('background_location_task', {
                        accuracy: Accuracy.BestForNavigation,
                        timeInterval: 500,
                        distanceInterval: 1,
                        activityType: ActivityType.Fitness,
                    });
                }
            }
        };

        requestPermissions();
    }, []);

    return locationUpdates;
};
