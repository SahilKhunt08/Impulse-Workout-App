import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import Card1 from "./components/card1";
import Card2 from "./components/card2";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, updateDoc,getDoc} from "firebase/firestore"; 
import {db} from './firebase';

export default function Home({ navigation }) {

const [workoutQuery, setWorkoutQuery] = useState("")
const [currExercise, setCurrExercise] = useState("")
const [index, setIndex] = useState(0)
const [exercises, setExercises] = useState([]);

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
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
            style={styles.TextInput}
            placeholder="Workout Name"
            placeholderTextColor="#003f5c"
            onChangeText={(workoutQuery) => setWorkoutQuery(workoutQuery)}
        /> 
        <TouchableOpacity style={styles.loginBtn} onPress={queryWorkoutCols} >
          <Text style={styles.loginText}>Select</Text> 
        </TouchableOpacity> 
      </View>

      <View>
        <View style={styles.playlist}>
          
          <Text style={styles.playlistText}>Exercise</Text>

          <Text style={styles.playlistText1}>{currExercise}</Text>

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button1} onPress={() => showExercise(1)}>
                <Text> Next Exercise --{'>'} </Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>
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

  //————————————————————————————————————————————————————————————————

  search: {
    flexDirection: "row",
    marginBottom: 60,
    backgroundColor: "#7ab3d6",

  },
  TextInput: {
    height: 40,
    flex: 1,
    padding: 10,
    marginLeft: 40,
  },
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
