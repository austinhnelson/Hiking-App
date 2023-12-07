import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../styles/index';

export const HomeScreen = () => {
    return (
        <View style={styles.view}>
            <Text style={styles.text}>HOME</Text>
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