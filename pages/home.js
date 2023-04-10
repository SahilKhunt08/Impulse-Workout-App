// Tweak list
// - Change text based on time (Good Morning/Good Afternoon)

import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Card1 from "./components/card1";
import Card2 from "./components/card2";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, updateDoc,getDoc} from "firebase/firestore"; 
import {db} from './firebase';

import HomeCards from './homeCards';

export default function Home({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;

const [workoutQuery, setWorkoutQuery] = useState("")
const [currExercise, setCurrExercise] = useState("")
const [index, setIndex] = useState(0)
const [exercises, setExercises] = useState([]);
const [userID, setUserUID] = useState(user.email)



  async function queryWorkoutCols() {
    const exercisesTemp = []
    const auth = getAuth();
    const user = auth.currentUser;

    console.log(workoutQuery)
    const workoutRef = collection(db, "accounts", user.uid, workoutQuery); 
    const querySnapshot = await getDocs(workoutRef);
    querySnapshot.forEach(doc => {
        if (doc.id !== "temp") {
            exercisesTemp.push(doc.id)
        }
      });
    setExercises(exercisesTemp)
  }

  async function showExercise(num) {
    setIndex(index + num)
    if (index >= exercises.length - 1) { 
        setIndex(0)
    }
    setCurrExercise(exercises[index])
  }



  return (
    <View style={backgroundStyle.container}>
        <Text style={backgroundStyle.titleText}> Welcome, {userID.substring(0, userID.indexOf("@"))} </Text>
        <ScrollView horizontal={true} alignSelf={'left'} marginLeft={10}>
        
           <HomeCards></HomeCards>
           <HomeCards></HomeCards>
           <HomeCards></HomeCards>
           <HomeCards></HomeCards>
            
        </ScrollView>
       


     </View>
  )
}

const backgroundStyle = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#0d0d12',
  },

  titleText: {
    color: "#8e8efa",
    fontWeight: "500",
    fontSize: 25,
    alignSelf: "left",
    marginTop: 20,
    marginLeft: 10
  },

  cardView: {
    flex: 1,
  },

  //————————————————————————————————————————————————————————————————
  loginBtn: {
    width: "40%",
    borderRadius: 25,
    marginRight: 35,
    height: 40,
    borderRadius: 30,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
  },

  //————————————————————————————————————————————————————————————————

  playlist: {
    backgroundColor: "#7ab3d6",
    borderRadius: 5,
    borderWidth: 3,
    alignItems: "center",
    width: 350,
    height: 250,
    marginBottom: 155
  },
  playlistText: {
    fontSize: 20,
    marginTop: 10,
    marginHorizontal: 10,
  },
  playlistText1: {
    fontSize: 17,
    marginTop: 80,
    marginHorizontal: 10,
  },

  //————————————————————————————————————————————————————————————————

   exerciseWrap: {
    backgroundColor: "#618fab",
    borderRadius: 5,
    borderWidth: 3,
    alignItems: "center",
    marginTop: 40,
    width: 260,
    height: 90,
  },

    //————————————————————————————————————————————————————————————————

  buttons: {
    flexDirection: "row"
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 140,
    marginBottom: 20,
    borderRadius: 20,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 140,
    marginBottom: 20,    
  },

    //————————————————————————————————————————————————————————————————

    workoutLbl: {
      alignItems: 'center',
      marginLeft: 125,
      marginBottom: 20,
    }
   
    //————————————————————————————————————————————————————————————————


});
