import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { auth } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, updateDoc,getDoc} from "firebase/firestore"; 
import {db} from './firebase';
import { Button } from 'react-native-paper';


export default function AddFriends() {
  const [friendID, setFriendID] = useState("")

  async function verifyUserInput() {
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(db, "accounts", user.uid);
    const docSnap = await getDoc(docRef);
    let accountUsername = "";
    if (docSnap.exists()) {
      accountUsername = docSnap.data().username;
    } else {
      console.log("No such document!");
    }

    const accountsColRef = collection(db, "accounts"); 
    const querySnapshot = await getDocs(accountsColRef);
    if(friendID !== accountUsername){
    querySnapshot.forEach(doc => {
        if (friendID === doc.data().username){
          addFriendToUserDoc(doc.id)
          console.log("matches")
        }
      });
    }
  }

  //add friend UID to user doc
  async function addFriendToUserDoc(friendID) {
    const auth = getAuth()
    const user = auth.currentUser

    await setDoc(doc(db, "accounts", friendID, "requests", user.uid), {
      id: user.uid
    })
  }
  
  return (
    <View style={styles.container}>
     <TextInput
          style={styles.TextInput}
          placeholder="Friend ID"
          placeholderTextColor="#003f5c"
          onChangeText={(friendID) => setFriendID(friendID)}
        /> 
       <TouchableOpacity style={styles.loginBtn} onPress={verifyUserInput} >
        <Text style={styles.loginText}>ADD FRIEND</Text> 
      </TouchableOpacity> 
     </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#adc9db',
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