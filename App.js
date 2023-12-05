import { StatusBar } from 'expo-status-bar';
import {Button, PermissionsAndroid, Platform, StyleSheet, Text, View} from 'react-native';
import * as RemoteAccess from './components/RemoteAccess';

export default function App() {
  const clicked = () => {
      //RemoteAccess.loadPosts().then(value => console.log(value));
      //RemoteAccess.loadPost(1).then(value => console.log(value));
      //RemoteAccess.loadPostsByUser('my name').then(value => console.log(value));
      RemoteAccess.loadRoute(1).then(value => alert(value.points));
      //RemoteAccess.loadRoutesByUser('my name').then(value => console.log(value));
  };
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='click me' onPress={clicked}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
