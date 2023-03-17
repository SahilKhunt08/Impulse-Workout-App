import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import { auth } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, collection, getDoc, getDocs, deleteDoc } from "firebase/firestore"; 
import {db} from './firebase';
import { async } from "@firebase/util";

async function newDoc() {
  const auth = getAuth();
  const user = auth.currentUser   
  const usernameString = auth.currentUser.email.substring(0, auth.currentUser.email.indexOf("@"));
  const friendsRef = await setDoc(doc(db, "accounts", user.uid, "friends", "temp"), {
  });
  const requestsRef = await setDoc(doc(db, "accounts", user.uid, "requests", "temp"), {
  });
  const workout1Ref = await setDoc(doc(db, "accounts", user.uid, "workout1", "temp"), {
  });
  const workout2Ref = await setDoc(doc(db, "accounts", user.uid, "workout2", "temp"), {
  });
  const workout3Ref = await setDoc(doc(db, "accounts", user.uid, "workout3", "temp"), {
  });
  const setTempField = await setDoc(doc(db, "accounts", user.uid), {
    username: usernameString,
  })

}

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")  
  const handleRegister = () => {

    createUserWithEmailAndPassword(auth, email, password).then(() => {
        newDoc();
      }).then(() => {
        console.log("userMade")
      }) 
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={styles.forgot_button}></Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 

      <TouchableOpacity style={styles.loginBtn} onPress={handleRegister} >
        <Text style={styles.loginText}>REGISTER</Text> 
      </TouchableOpacity> 
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#f5fbff',
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#7ab3d6",
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
    backgroundColor: "#578bab",
  },

});