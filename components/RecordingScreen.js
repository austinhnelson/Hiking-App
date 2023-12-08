import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../styles/index';
import MapView, {Marker, Polyline} from "react-native-maps";

function calculateDistance(coords) {
    if(coords === null || coords.length < 2) return 0;
    let distance = 0;
    //// Haversine formula ////
    // Radius of earth in miles
    const r = 3959;
    for (let i = 0; i < coords.length - 1; i++) {
        let c1 = coords[i];
        let c2 = coords[i + 1];
        // convert latitudes to radians
        const lat1 = c1.latitude * Math.PI / 180;
        const lat2 = c2.latitude * Math.PI / 180;
        // magic math formula
        const dlat = lat2 - lat1;
        const a = Math.pow(Math.sin(dlat / 2), 2)
            + Math.cos(lat1) * Math.cos(lat2)
            * Math.pow(Math.sin((c2.longitude - c1.longitude) * Math.PI / 360),2);
        distance += 2 * r * Math.asin(Math.sqrt(a));
    }
    return distance;
}

export const RecordScreen = ({locations, mapRef}) => {
    let latestCoords;
    let distance;

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
            <View style={{flex: 1}}>
                <Text style={styles.text}>
                    Distance: {calculateDistance(locations.map(l=>l.coords)).toPrecision(3)}mi
                </Text>
            </View>
            <View style={{flex:10}}><MapView style={styles.map} ref={mapRef}>
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
            </MapView></View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: Colors.background,
        flexDirection: "column",
    },
    map: {
        width: '100%',
        height: '100%',
    },
    marker: {
        width: 20,
        height: 20,
    },
    text: {
        fontSize: 24,
    }
});