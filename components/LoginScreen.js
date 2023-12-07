import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const LoginScreen = () => {
  const [mode, setMode] = useState("login");

  const handleLoginView = () => {
    setMode("login");
  };

  const handleSignupView = () => {
    setMode("signup");
  };

  const renderContent = () => {
    if (mode == "login") {
      return (
        <>
          <Text style={styles.inputTitle}>Username</Text>
          <TextInput style={styles.input} />

          <Text style={styles.inputTitle}>Password</Text>
          <TextInput style={styles.input} secureTextEntry={true} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Login pressed")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.inputTitle}>Signup Username</Text>
          <TextInput style={styles.input} />

          <Text style={styles.inputTitle}>Signup Password</Text>
          <TextInput style={styles.input} secureTextEntry={true} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Login pressed")}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hiking Log App</Text>

      <View style={styles.loginContainer}>
        <TouchableOpacity
          style={[styles.loginBox, styles.loginLeft]}
          onPress={handleLoginView}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.loginBox, styles.loginRight]}
          onPress={handleSignupView}
        >
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    marginBottom: 125,
  },
  loginContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  loginBox: {
    flex: 1,
    backgroundColor: "lightgray",
    padding: 10,
  },
  loginLeft: {
    backgroundColor: "#343B3E",
  },
  loginRight: {
    backgroundColor: "#82969E",
  },
  loginText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  inputTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#D9D9D9",
  },
  button: {
    backgroundColor: "#82969E", // Green color (adjust as needed)
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginScreen;
