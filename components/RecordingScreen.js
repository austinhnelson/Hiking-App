import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../styles/index';
import MapView from "react-native-maps";

export const RecordScreen = () => {
    return (
        <View style={styles.view}>
            <MapView style={styles.map}></MapView>
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