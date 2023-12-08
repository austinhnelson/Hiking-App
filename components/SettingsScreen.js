import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../styles/index";

export const SettingsScreen = () => {
  const personalDetailsValues = {
    username: "JohnDoe",
    password: "********",
  };

  const accountDetailsValues = {
    numberOfFriends: 10,
    totalActivity: 100,
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal Details</Text>
        <Text style={styles.settingsField}>
          Username: {personalDetailsValues.username}
        </Text>
        <Text style={styles.settingsField}>
          Password: {personalDetailsValues.password}
        </Text>
      </View>

      {/* Second Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account Details</Text>
        <Text style={styles.settingsField}>
          Number of Friends: {accountDetailsValues.numberOfFriends}
        </Text>
        <Text style={styles.settingsField}>
          Total Activity (miles): {accountDetailsValues.totalActivity}
        </Text>
      </View>
      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => handleLogout()}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cardTitle: {
    color: Colors.accent,
    fontSize: 24,
    marginBottom: 8,
  },
  settingsField: {
    fontSize: 16,
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    marginBottom: 8,
    overflow: "hidden",
  },
  logoutButton: {
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  logoutButtonText: {
    color: Colors.black,
    fontSize: 16,
    textAlign: "center",
  },
});
