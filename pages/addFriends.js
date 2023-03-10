import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { auth } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, updateDoc,getDoc} from "firebase/firestore"; 
import {db} from './firebase';
import { Button } from 'react-native-paper';

//check user input
async function verifyUserInput(friendIDInput) {
  const accountsColRef = collection(db, "accounts"); 
  
  const querySnapshot = await getDocs(accountsColRef);
  querySnapshot.forEach(doc => {
    if (friendIDInput === doc.id.substring(0,5)){
      addFriendToUserDoc(doc.id)
    }
  });
}

//add friend UID to user doc
async function addFriendToUserDoc(friendID) {
  const auth = getAuth()
  const user = auth.currentUser

  //Add Friend UID to user document
  const userDocRef = doc(db, "accounts", user.uid)
  const currFriends = await getDoc(userDocRef); 
  await updateDoc(userDocRef, {
    friendsID: currFriends.data().friendsID + friendID + ","
  });


  const friendDocRef = doc(db, "accounts", friendID)
  const currentRequests = await getDoc(friendDocRef); 
  await updateDoc(friendDocRef, {
    requests: currentRequests.data().requests + user.uid + ","
  });

}



export default function AddFriends() {
  const [friendID, setFriendID] = useState("")

  const checkFriendID = () => {
    verifyUserInput(friendID);
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <TextInput
          style={styles.TextInput}
          placeholder="Friend ID"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(friendID) => setFriendID(friendID)}
        /> 
       <TouchableOpacity style={styles.loginBtn} onPress={checkFriendID} >
        <Text style={styles.loginText}>REGISTER</Text> 
      </TouchableOpacity> 
     </View>
  )
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