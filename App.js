import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";

//import * as RemoteAccess from './components/RemoteAccess';

import { Buttons, Colors } from "./styles/index";

import { LoginScreen } from "./components/LoginScreen";
import { HomeScreen } from "./components/HomeScreen";
import { RecordScreen } from "./components/RecordingScreen";
import { PersonalScreen } from "./components/PersonalScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { useLocationUpdates } from "./components/useLocationUpdates";

export default function App() {
  /*const clicked = () => {
        //RemoteAccess.loadPosts().then(value => console.log(value));
        //RemoteAccess.loadPost(1).then(value => console.log(value));
        //RemoteAccess.loadPostsByUser('my name').then(value => console.log(value));
        RemoteAccess.loadRoute(1).then(value => alert(value.points));
        //RemoteAccess.loadRoutesByUser('my name').then(value => console.log(value));
    };*/

  const [appState, setAppState] = useState("home");

  const mapRef = useRef();
  const [currentRoute, setCurrentRoute] = useState({
    state: "",
    locations: [],
  });
  const locationUpdates = useLocationUpdates();
  useEffect(() => {
    if (currentRoute.state === "recording") {
      setCurrentRoute((prevState) => ({
        state: prevState.state,
        locations: prevState.locations.concat(locationUpdates),
      }));
    }
  }, [locationUpdates]);

  const MyButton = ({ uri, onPress }) => (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <Image source={uri} style={styles.icon} />
    </TouchableHighlight>
  );

  const renderTopBar = (
    <View style={[styles.buttonBar, { justifyContent: "flex-end" }]}>
      {MyButton({
        uri: require("./assets/settings_icon.png"),
        onPress: () => setAppState("settings"),
      })}
    </View>
  );

  const renderBottomBar = (
    <View style={styles.buttonBar}>
      {MyButton({
        uri: require("./assets/home_icon.png"),
        onPress: () => setAppState("home"),
      })}
      {MyButton({
        uri: require("./assets/record_icon.png"),
        onPress: () => setAppState("record"),
      })}
      {MyButton({
        uri: require("./assets/hamburger_icon.png"),
        onPress: () => setAppState("personal"),
      })}
    </View>
  );

  const renderScreen = () => {
    switch (appState) {
      case "login":
        return LoginScreen();
      case "home":
        return HomeScreen();
      case "record":
        return RecordScreen({
          route: currentRoute,
          setRoute: setCurrentRoute,
          mapRef: mapRef,
        });
      case "personal":
        return PersonalScreen();
      case "settings":
        return SettingsScreen();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Conditionally render TopBar only when the state is NOT 'login' */}
      {appState !== "login" && renderTopBar}

      <View style={styles.screen}>
        {/* Render the screen based on the current state */}
        {renderScreen()}
      </View>

      {/* Conditionally render BottomBar only when the state is NOT 'login' */}
      {appState !== "login" && renderBottomBar}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  button: {
    ...Buttons.smallRounded,
    backgroundColor: Colors.menuBar,
  },
  icon: {
    width: 30,
    height: 30,
  },
  buttonBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    backgroundColor: Colors.menuBar,
  },
  screen: {
    flex: 10,
    width: "100%",
    backgroundColor: Colors.background,
  },
});
