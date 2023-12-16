import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {Colors} from "../styles";

export const LoginScreen = () => {
  const [mode, setMode] = useState("login");
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");

  const handleLoginView = () => {
    setMode("login");
  };

  /**
   * Handles the login for the database
   * 
   */

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.232.171.163:4567/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: enteredUsername,
          password: enteredPassword,
        }),
      });
  
      if (response.ok) {
        console.log("Login Successful");
      } else {
        console.log("Login Failed");
      }
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };
  
  /**
   * Handles the signup for the database
   * 
   */
  const handleSignup = async () => {
    try {
      const response = await fetch('http://172.232.171.163:4567/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: enteredUsername,
          password: enteredPassword,
          email: enteredEmail,
        }),
      });
  
      if (response.ok) {
        console.log("Signup Successful");
      } else {
        console.log("Signup Failed");
      }
    } catch (error) {
      console.error("Signup Error: ", error);
    }
  };
  

  const handleSignupView = () => {
    setMode("signup");
  };

  const renderContent = () => {
    if (mode === "login") {
      return (
        <>
          <Text style={styles.inputTitle}>Username</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={setEnteredUsername} 
            value={enteredUsername}
          />

          <Text style={styles.inputTitle}>Password</Text>
          <TextInput 
            style={styles.input} 
            secureTextEntry={true} 
            onChangeText={setEnteredPassword} 
            value={enteredPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.inputTitle}>Signup Username</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={setEnteredUsername} 
            value={enteredUsername}
          />

          <Text style={styles.inputTitle}>Signup Password</Text>
          <TextInput 
            style={styles.input} 
            secureTextEntry={true} 
            onChangeText={setEnteredPassword} 
            value={enteredPassword}
          />

          <Text style={styles.inputTitle}>Email</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={setEnteredEmail} 
            value={enteredEmail}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trail Tracker</Text>

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
    backgroundColor: Colors.background,
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
    padding: 10,
  },
  loginLeft: {
    backgroundColor: Colors.menuBar,
  },
  loginRight: {
    backgroundColor: Colors.accent,
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
    backgroundColor: Colors.menuOption, // Green color (adjust as needed)
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
