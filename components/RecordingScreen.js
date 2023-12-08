import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../styles/index';
import MapView, {Marker, Polyline} from "react-native-maps";

function calculateDistance(coords) {
    if (coords === null || coords.length < 2) return 0;
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
            * Math.pow(Math.sin((c2.longitude - c1.longitude) * Math.PI / 360), 2);
        distance += 2 * r * Math.asin(Math.sqrt(a));
    }
    return distance;
}

export const RecordScreen = ({route, setRoute, mapRef}) => {
    const locations = route.locations;
    let latestCoords;
    let distance = calculateDistance(locations.map(l => l.coords));
    let time = 0;
    let speed = 0;
    if (locations.length > 1) {
        time = (locations[locations.length - 1].timestamp - locations[0].timestamp) / 1000;
        speed = distance * 3600 / time;
    }

    if (locations.length > 0 && mapRef.current) {
        latestCoords = locations[locations.length - 1].coords;
        mapRef.current.animateToRegion({
            latitude: latestCoords.latitude,
            longitude: latestCoords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }, 1500);
    }

    const setRouteState = (state) => {
        setRoute({locations: locations, state: state});
        if(state==='saving') saveRoute();
    };

    const saveRoute = () => {
        // TODO save route here
        // reset locations
        alert('saved route');
        setRouteState('saved');
    };

    const renderButton = () => {
        let button = null;
        if (route.state === '' || route.state === 'saved') {
            button = (
                <TouchableOpacity style={styles.buttonContainer} onPress={() => {setRouteState('recording')}}>
                    <Image source={require('../assets/play_icon.png')} style={styles.icon}/>
                </TouchableOpacity>
            );
        } else if (route.state === 'recording'){
            button = (
                <TouchableOpacity style={styles.buttonContainer} onLongPress={() => {setRouteState('stopped')}}>
                    <Image source={require('../assets/stop_icon.png')} style={styles.icon}/>
                </TouchableOpacity>
            );
        } else if (route.state === 'stopped'){
            button = (
                <TouchableOpacity style={styles.buttonContainer} onLongPress={() => {setRouteState('saving')}}>
                    <Image source={require('../assets/save_icon.png')} style={styles.icon}/>
                </TouchableOpacity>
            );
        }
        return button;
    };
    return (
        <View style={styles.view}>
            <View style={{flex: 2}}>
                <Text style={styles.text}>
                    Distance: {calculateDistance(locations.map(l => l.coords)).toPrecision(3)}mi
                </Text>
                <Text style={styles.text}>
                    Time: {Math.floor(time / 3600)}:{Math.floor(time / 60)}:{(time % 60).toFixed(1)}
                </Text>
                <Text style={styles.text}>
                    Average Speed: {speed.toFixed(1)}mph
                </Text>
            </View>
            <View style={{flex: 10}}><MapView style={styles.map} ref={mapRef}>
                <Polyline
                    coordinates={locations.map((location, index) => ({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        key: index.toString(),
                    }))}
                    strokeColor={Colors.red}
                    strokeWidth={5}
                />
                {latestCoords && (
                    <Marker coordinate={latestCoords}>
                        <Image source={require('../assets/current_location.png')} style={styles.marker}/>
                    </Marker>
                )}
            </MapView></View>
            {renderButton()}
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
    },
    icon: {
        width: 30,
        height: 30,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: Colors.accent,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
});