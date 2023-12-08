import {Image, StyleSheet, View} from 'react-native';
import {Colors} from '../styles/index';
import MapView, {Marker, Polyline} from "react-native-maps";

function calculateDistance(coords) {
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
    let distance = 0;

    if (locations.length > 0 && mapRef.current) {
        latestCoords = locations[locations.length - 1].coords;
        mapRef.current.animateToRegion({
            latitude: latestCoords.latitude,
            longitude: latestCoords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }, 1500);
        if(locations.length > 1){
            distance = calculateDistance(locations.map(l=>(l.coords)));
            console.log('distance: ' + distance.toPrecision(3) + 'mi');
        }
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