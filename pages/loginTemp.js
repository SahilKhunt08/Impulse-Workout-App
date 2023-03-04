import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";


const handleLogin = () => {
  console.log("fdd");
}


export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const [boolean1, setboolean1] = useState(true);
  const handleTemp = () => {
    setboolean1(!boolean1);
    console.log("345");
  }

  const handleSignUp = () => {
    console.log("yuh14");
  }

  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} />  */}
      <StatusBar style="auto" />

      {/* <TouchableOpacity style={styles.loginBtn} onPress={handleTemp}>
        <Text style={styles.loginText}>Click Me</Text> 
      </TouchableOpacity> 
      { boolean1 && <Text>Random Text</Text>} */}

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('MyTabs')}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 

      <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp} >
        <Text style={styles.loginText}>SIGN UP</Text> 
      </TouchableOpacity> 
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#f6f3f9',
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    width: 260,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});