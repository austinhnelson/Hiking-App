import {StyleSheet, View} from 'react-native';
import {Colors} from '../styles/index';
import MapView, {Polyline} from "react-native-maps";

export const RecordScreen = (locations) => {
    return (
        <View style={styles.view}>
            <MapView style={styles.map}>
                <Polyline
                    coordinates={locations.map((location, index) => ({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        key: index.toString(),
                    }))}
                    strokeColor='#000' // Line color
                    strokeWidth={3}    // Line width
                />
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