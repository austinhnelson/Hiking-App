import {Image, StyleSheet, View} from 'react-native';
import {Colors} from '../styles/index';
import MapView, {Marker, Polyline} from "react-native-maps";

export const RecordScreen = ({locations, mapRef}) => {
    let latestCoords;
    if (locations.length > 0 && mapRef.current) {
        latestCoords = locations[locations.length - 1].coords;
        mapRef.current.animateToRegion({
            latitude: latestCoords.latitude,
            longitude: latestCoords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }, 1500);
    }
    return (
        <View style={styles.view}>
            <MapView style={styles.map} ref={mapRef}>
                <Polyline
                    coordinates={locations.map((location, index) => ({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        key: index.toString(),
                    }))}
                    strokeColor={Colors.red} // Line color
                    strokeWidth={5}    // Line width
                />
                {latestCoords ? (
                    <Marker coordinate={latestCoords}>
                        <Image source={require('../assets/current_location.png')} style={styles.marker}/>
                    </Marker>
                ): ''}
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
    marker: {
        width: 20,
        height: 20,
    },
});