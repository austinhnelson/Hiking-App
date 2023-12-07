import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../styles/index';

export const RecordScreen = () => {
    return (
        <View style={styles.view}>
            <Text style={styles.text}>RECORD</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: Colors.background,
    },
    text: {
        color: Colors.accent,
        fontSize: 36,
    },
});