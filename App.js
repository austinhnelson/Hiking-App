import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import * as RemoteAccess from './components/RemoteAccess';
import {Buttons, Colors} from './styles/index'
import {useState} from "react";
import {HomeScreen} from "./components/HomeScreen";
import {RecordScreen} from "./components/RecordingScreen";
import {PersonalScreen} from "./components/PersonalScreen";
import {SettingsScreen} from "./components/SettingsScreen";

export default function App() {
    /*const clicked = () => {
        //RemoteAccess.loadPosts().then(value => console.log(value));
        //RemoteAccess.loadPost(1).then(value => console.log(value));
        //RemoteAccess.loadPostsByUser('my name').then(value => console.log(value));
        RemoteAccess.loadRoute(1).then(value => alert(value.points));
        //RemoteAccess.loadRoutesByUser('my name').then(value => console.log(value));
    };*/
    const [currentView, setCurrentView] = useState('home');

    const MyButton = ({text, onPress}) => (
        <TouchableHighlight style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableHighlight>
    );


    const renderTopBar = (
        <View style={[styles.buttonBar, {justifyContent: 'flex-end'}]}>
            {MyButton({text: 'T1', onPress: () => setCurrentView('settings')})}
        </View>
    );

    const renderBottomBar = (
        <View style={styles.buttonBar}>
            {MyButton({text: 'B1', onPress: () => setCurrentView('home')})}
            {MyButton({text: 'B2', onPress: () => setCurrentView('record')})}
            {MyButton({text: 'B3', onPress: () => setCurrentView('personal')})}
        </View>
    );

    const renderCurrentView = () => {
        switch (currentView) {
            case 'home':
                return HomeScreen();
            case 'record':
                return RecordScreen();
            case 'personal':
                return PersonalScreen();
            case 'settings':
                return SettingsScreen();
            default:
                return HomeScreen();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='default'/>
            {renderTopBar}
            <View style={styles.screen}>
                {renderCurrentView()}
            </View>
            {renderBottomBar}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    button: {
        ...Buttons.smallRounded,
        backgroundColor: Colors.menuBar,
    },
    text: {
        color: Colors.black,
        fontSize: 24,
    },
    buttonBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width: '100%',
        backgroundColor: Colors.menuBar,
    },
    screen: {
        flex: 10,
        width: '100%',
        backgroundColor: Colors.background,
    },
});
