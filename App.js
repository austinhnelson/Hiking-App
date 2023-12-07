import {SafeAreaView, StatusBar, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {useState} from "react";

//import * as RemoteAccess from './components/RemoteAccess';

import {Buttons, Colors} from './styles/index'

import {LoginScreen} from './components/LoginScreen';
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

    const [appState, setAppState] = useState('login');
    const MyButton = ({text, onPress}) => (
        <TouchableHighlight style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableHighlight>
    );



    const renderTopBar = (
        <View style={[styles.buttonBar, {justifyContent: 'flex-end'}]}>
            {MyButton({text: 'T1', onPress: () => setAppState('settings')})}
        </View>
    );

    const renderBottomBar = (
        <View style={styles.buttonBar}>
            {MyButton({text: 'B1', onPress: () => setAppState('home')})}
            {MyButton({text: 'B2', onPress: () => setAppState('record')})}
            {MyButton({text: 'B3', onPress: () => setAppState('personal')})}
        </View>
    );

    const renderScreen = () => { 
      switch(appState) {
        case 'login':
          return LoginScreen();
        case 'home':
            return HomeScreen();
        case 'record':
            return RecordScreen();
        case 'personal':
            return PersonalScreen();
        case 'settings':
            return SettingsScreen();
        default: 
          return null;
      }
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
  
        {/* Conditionally render TopBar only when the state is NOT 'login' */}
        {appState !== 'login' && renderTopBar}
  
        <View style={styles.screen}>
          {/* Render the screen based on the current state */}
          {renderScreen()}
        </View>
  
        {/* Conditionally render BottomBar only when the state is NOT 'login' */}
        {appState !== 'login' && renderBottomBar}
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
