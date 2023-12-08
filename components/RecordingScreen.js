import {StyleSheet, View} from 'react-native';
import {Colors} from '../styles/index';
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location'
import {useEffect, useState} from "react";

export const RecordScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);


    return (
        <View style={styles.view}>
            <MapView style={styles.map}>
                <Marker coordinate={location !== null ? location.coords : {latitude: 0, longitude: 0}}/>
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