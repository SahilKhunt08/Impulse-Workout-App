// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, StatusBar } from "react-native";
import { auth } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, collection, getDoc, getDocs, deleteDoc } from "firebase/firestore"; 
import {db} from './firebase';
import { async } from "@firebase/util";
import Divider from 'react-native-divider';

async function newDoc() {
  
  const auth = getAuth();
  const user = auth.currentUser   
  const usernameString = auth.currentUser.email.substring(0, auth.currentUser.email.indexOf("@"));

  await setDoc(doc(db, "accounts", user.uid, "friends", "temp"), {
  });
  await setDoc(doc(db, "accounts", user.uid, "requests", "temp"), {
  });
  await setDoc(doc(db, "accounts", user.uid, "workouts", "temp"), {
    temp: 'temp'
  });
  await setDoc(doc(db, "accounts", user.uid), {
    username: usernameString,
    workouts: []
  })

}

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")  
  
  const handleRegister = () => {
    console.log("fd")

    createUserWithEmailAndPassword(auth, email, password).then(() => {
        newDoc();
      }).then(() => {
        console.log("userMade")
      }) 
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log("Correct")
      // navigation.replace('Impulse')
      navigation.navigate('Impulse') //Old version
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Not Correct");
    });
  }

  return (
    <View style={newStyles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={'light-content'} //['default', 'dark-content', 'light-content'];
        showHideTransition={'fade'} //['fade', 'slide', 'none'];
        hidden={false}
      />

      <View style={newStyles.loginContainer}>
        <Text style={newStyles.titleText}> Login to Impulse</Text>
        <Text style={newStyles.infoText}> Email </Text>
        <View style={newStyles.inputView}>
          <TextInput
            style={newStyles.inputText}
            placeholder="someone@example.com"
            placeholderTextColor="#cccccc"
            onChangeText={(email) => setEmail(email)}
          /> 
        </View> 
        <Text style={newStyles.infoText}> Password </Text>
        <View style={newStyles.inputView}>
          <TextInput
            style={newStyles.inputText}
            placeholder="Your Password"
            placeholderTextColor="#cccccc"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          /> 
        </View> 
        <TouchableOpacity style={newStyles.forgotView}>
          <Text style={newStyles.forgotText}> Forgot Password? </Text> 
        </TouchableOpacity> 
      </View>

      <TouchableOpacity style={newStyles.loginBtn} onPress={handleLogin}>
        <Text style={newStyles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 

      <TouchableOpacity style={newStyles.loginBtn} onPress={handleRegister}>
        <Text style={newStyles.loginText}>REGISTER</Text> 
      </TouchableOpacity> 

      <View style={newStyles.dividerView}>
        <Divider borderColor="#a3a3bf" color="#a3a3bf" orientation="center">
          OR
        </Divider>
      </View>

      <TouchableOpacity style={newStyles.extraView} >
        <Image source={require('./google1.png')} style={newStyles.googleImg}/>
        <Text style={newStyles.extraText}>Continue with Google</Text> 
      </TouchableOpacity> 

      <TouchableOpacity style={newStyles.extraView} >
        <Image source={require('./google1.png')} style={newStyles.googleImg}/>
        <Text style={newStyles.extraText}>Continue with Blank</Text> 
      </TouchableOpacity> 

    </View> 
  );
}

const newStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: '#0d0d12',
  },
  loginContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  titleText: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 30,
    alignSelf: "left",
    marginBottom: 50,
    marginTop: 50,
  },
  infoText: {
    color: "#ffffff",
    fontWeight: "350",
    fontSize: 16,
    marginBottom: 9,
    alignSelf: "left",
  },
  inputView: {
    borderColor: "#404057",
    borderWidth: 2,
    borderRadius: 5,
    height: 45,
    width: 340,
    marginBottom: 25,
    alignItems: "center",
  },
  inputText: {
    height: 50,
    width: "100%",
    flex: 1,
    padding: 15,
    color: "#ffffff",
  },
  forgotView: {
    alignSelf: "left",
    marginTop: 5,
    marginBottom: 35,
  },
  forgotText: {
    color: "#8e8efa",
    fontSize: 16,
  },

  loginBtn: {
    borderRadius:7,
    paddingHorizontal: 145,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(227, 227, 255, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset : { width: 1, height: 13},
  },
  loginText: {
    fontWeight: "600",
    fontSize: 16,
  },

  dividerView: {
    // backgroundColor: "white",
    width: "87%",
    margin: 25,
  },

  extraView: {
    borderColor: "#404057",
    borderWidth: 2,
    borderRadius: 5,
    height: 50,
    width: 340,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    // textAlign: "center",
    // alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  extraText: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 16,
    paddingHorizontal: 80,
    marginLeft: -20,
  },
  googleImg: {
    maxWidth: 25,
    maxHeight: 25, 
    // backgroundColor: "#fff",
  }
  
})
