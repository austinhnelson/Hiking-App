import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { Colors } from "../styles/index";

export const HomeScreen = () => {
  const hikeDetailsValues = {
    distance: 10,
    timeElapsed: 100,
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              source={require("../assets/user.png")}
              style={styles.userImage}
            />
            <Text style={styles.cardHeaderTitle}>John Doe</Text>
          </View>
          <Text style={styles.cardHeaderTitle}>
            December 8th at 8:00 PM, Boise, Idaho
          </Text>
          <Text style={styles.cardTitle}>
            This would be the name of a singular hike
          </Text>

          <Text style={styles.infoField}>
            Distance: {hikeDetailsValues.distance} miles
          </Text>
          <Text style={styles.infoField}>
            Time Elapsed: {hikeDetailsValues.timeElapsed} minutes
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              source={require("../assets/user.png")}
              style={styles.userImage}
            />
            <Text style={styles.cardHeaderTitle}>John Doe</Text>
          </View>
          <Text style={styles.cardHeaderTitle}>
            December 8th at 8:00 PM, Boise, Idaho
          </Text>
          <Text style={styles.cardTitle}>
            This would be the name of a singular hike
          </Text>

          <Text style={styles.infoField}>
            Distance: {hikeDetailsValues.distance} miles
          </Text>
          <Text style={styles.infoField}>
            Time Elapsed: {hikeDetailsValues.timeElapsed} minutes
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              source={require("../assets/user.png")}
              style={styles.userImage}
            />
            <Text style={styles.cardHeaderTitle}>John Doe</Text>
          </View>
          <Text style={styles.cardHeaderTitle}>
            December 8th at 8:00 PM, Boise, Idaho
          </Text>
          <Text style={styles.cardTitle}>
            This would be the name of a singular hike
          </Text>

          <Text style={styles.infoField}>
            Distance: {hikeDetailsValues.distance} miles
          </Text>
          <Text style={styles.infoField}>
            Time Elapsed: {hikeDetailsValues.timeElapsed} minutes
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              source={require("../assets/user.png")}
              style={styles.userImage}
            />
            <Text style={styles.cardHeaderTitle}>John Doe</Text>
          </View>
          <Text style={styles.cardHeaderTitle}>
            December 8th at 8:00 PM, Boise, Idaho
          </Text>
          <Text style={styles.cardTitle}>
            This would be the name of a singular hike
          </Text>

          <Text style={styles.infoField}>
            Distance: {hikeDetailsValues.distance} miles
          </Text>
          <Text style={styles.infoField}>
            Time Elapsed: {hikeDetailsValues.timeElapsed} minutes
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              source={require("../assets/user.png")}
              style={styles.userImage}
            />
            <Text style={styles.cardHeaderTitle}>John Doe</Text>
          </View>
          <Text style={styles.cardHeaderTitle}>
            December 8th at 8:00 PM, Boise, Idaho
          </Text>
          <Text style={styles.cardTitle}>
            This would be the name of a singular hike
          </Text>

          <Text style={styles.infoField}>
            Distance: {hikeDetailsValues.distance} miles
          </Text>
          <Text style={styles.infoField}>
            Time Elapsed: {hikeDetailsValues.timeElapsed} minutes
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              source={require("../assets/user.png")}
              style={styles.userImage}
            />
            <Text style={styles.cardHeaderTitle}>John Doe</Text>
          </View>
          <Text style={styles.cardHeaderTitle}>
            December 8th at 8:00 PM, Boise, Idaho
          </Text>
          <Text style={styles.cardTitle}>
            This would be the name of a singular hike
          </Text>

          <Text style={styles.infoField}>
            Distance: {hikeDetailsValues.distance} miles
          </Text>
          <Text style={styles.infoField}>
            Time Elapsed: {hikeDetailsValues.timeElapsed} minutes
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row", // Align children in a row
    alignItems: "center", // Center items vertically
    marginBottom: 8,
  },
  cardTitle: {
    color: Colors.black,
    fontSize: 24,
    marginBottom: 8,
  },
  cardHeaderTitle: {
    color: Colors.black,
    fontSize: 18,
    marginLeft: 8, // Add margin between the image and text
  },
  userImage: {
    width: 50,
    height: 50,
  },
  infoField: {
    fontSize: 16,
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    marginBottom: 8,
    overflow: "hidden",
  },
});
