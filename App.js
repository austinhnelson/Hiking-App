import {StatusBar} from 'expo-status-bar';
import {Button, SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import * as RemoteAccess from './components/RemoteAccess';
import {Buttons, Colors} from './styles/index'

export default function App() {
    /*const clicked = () => {
        //RemoteAccess.loadPosts().then(value => console.log(value));
        //RemoteAccess.loadPost(1).then(value => console.log(value));
        //RemoteAccess.loadPostsByUser('my name').then(value => console.log(value));
        RemoteAccess.loadRoute(1).then(value => alert(value.points));
        //RemoteAccess.loadRoutesByUser('my name').then(value => console.log(value));
    };*/

    const doNothing = () => {};

    const MyButton = (text, onPress) => {
        return (
            <TouchableHighlight style={styles.button} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
            </TouchableHighlight>
        );
    };

    const TopBar = (
        <View style={styles.buttonBar}>
            {MyButton('T1', doNothing)}
            {MyButton('T2', doNothing)}
        </View>
    );

    const BottomBar = (
        <View style={styles.buttonBar}>
            {MyButton('B1', doNothing)}
            {MyButton('B2', doNothing)}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            {TopBar}
            <View style={styles.screen}></View>
            {BottomBar}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        ...Buttons.smallRounded,
    },
    text: {
        color: Colors.black,
    },
    buttonBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.menuBar,
    },
    screen:{
        flex: 10,
        backgroundColor: Colors.background,
    },
});
