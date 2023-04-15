// Tweak list
// - Change text based on time (Good Morning/Good Afternoon)


//TO DO
//--Fix it so that the user uid col has fields for each workout, move friend requests and friends arrays in the field
//--Loop through all the collections in each user uid document 
//--Display in card

//--Start the jump in page with 

import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Button, Modal} from "react-native";
import Card1 from "./components/card1";
import Card2 from "./components/card2";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, updateDoc,getDoc} from "firebase/firestore"; 
import {db} from './firebase';
import { async } from "@firebase/util";

import HomeCards from './homeCards';
import RedirectCards from './RedirectCards';

export default function Home() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [workoutQuery, setWorkoutQuery] = useState("")
  const [currExercise, setCurrExercise] = useState("")
  const [index, setIndex] = useState(0)
  const [exercises, setExercises] = useState([]);
  const [userID, setUserUID] = useState(user.email)
  const [openNewWorkoutPage, setOpenNewWorkoutPage] = useState(false)

  const [but5, setBut5] = useState(newWorkout.breakButton)
  const [but10, setBut10] = useState(newWorkout.breakButton)
  const [but15, setBut15] = useState(newWorkout.breakButton)
  const [but20, setBut20] = useState(newWorkout.breakButton)
  const [but25, setBut25] = useState(newWorkout.breakButton)
  const [but30, setBut30] = useState(newWorkout.breakButton)
  const [but35, setBut35] = useState(newWorkout.breakButton)
  const [but40, setBut40] = useState(newWorkout.breakButton)
  const [but45, setBut45] = useState(newWorkout.breakButton)
  const [but50, setBut50] = useState(newWorkout.breakButton)
  const [but55, setBut55] = useState(newWorkout.breakButton)
  const [but60, setBut60] = useState(newWorkout.breakButton)
  
  const [breakTime, setBreakTime] = useState(0)
  const [workoutName, setWorkoutName] = useState("")
  const [workoutDesc, setWorkoutDesc] = useState("")

  const [totalWorkoutsArr, setTotalWorkoutsArr] = useState("")




  async function queryWorkoutCols() {
    const exercisesTemp = []
    const auth = getAuth();
    const user = auth.currentUser;
    const workoutRef = collection(db, "accounts", user.uid, workoutQuery); 
    const querySnapshot = await getDocs(workoutRef);
    querySnapshot.forEach(doc => {
        if (doc.id !== "temp") {
            exercisesTemp.push(doc.id)
        }
      });
    setExercises(exercisesTemp)
  }

  async function createWorkout() {
    const auth = getAuth();
    const user = auth.currentUser
    const usernameString = auth.currentUser.email.substring(0, auth.currentUser.email.indexOf("@"));
   
    setOpenNewWorkoutPage(false)
    await setDoc(doc(db, "accounts", user.uid, "workouts", workoutName, "exercises", "temp"));

    await setDoc(doc(db, "accounts", user.uid, "workouts", workoutName), {
      exercisesBreak: breakTime,
      workoutDesc: workoutDesc
    })


    const docRef = doc(db, "accounts", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const tempArr1 = docSnap.data().workouts;
      tempArr1.push(workoutName)
      const colRef = collection(db, "accounts", );
      setTotalWorkoutsArr()
      await setDoc(doc(db, "accounts", user.uid), {
        username: usernameString,
        workouts: tempArr1
      })
    }
    //Create Firebase Collection 
    //Add name to workout array
  
  }

  const recieveBreakTimes = (input) => {
    setBut5(newWorkout.breakButton)
    setBut10(newWorkout.breakButton)
    setBut15(newWorkout.breakButton)
    setBut20(newWorkout.breakButton)
    setBut25(newWorkout.breakButton)
    setBut30(newWorkout.breakButton)
    setBut35(newWorkout.breakButton)
    setBut40(newWorkout.breakButton)
    setBut45(newWorkout.breakButton)
    setBut55(newWorkout.breakButton)
    setBut60(newWorkout.breakButton)
    if (input === 1) {
      if (but5 == newWorkout.breakButton) {
        setBut5(newWorkout.breakButtonClicked)
        setBreakTime(5)
      } else {
        setBut5(newWorkout.breakButton)
        setBreakTime(null)

      }
    } else if (input === 2) {
      if (but10 == newWorkout.breakButton) {
        setBut10(newWorkout.breakButtonClicked)
        setBreakTime(5)

      } else {
        setBut10(newWorkout.breakButton)
        setBreakTime(null)

      }
    } else if (input === 3) {
      if (but15 == newWorkout.breakButton) {
        setBut15(newWorkout.breakButtonClicked)
        setBreakTime(5)

      } else {
        setBut15(newWorkout.breakButton)
        setBreakTime(null)

      }

    } else if (input === 4) {
      if (but20 == newWorkout.breakButton) {
        setBut20(newWorkout.breakButtonClicked)
        setBreakTime(5)

      } else {
        setBut20(newWorkout.breakButton)
        setBreakTime(null)

      }
    } else if (input === 5) {
      if (but25 == newWorkout.breakButton) {
        setBut25(newWorkout.breakButtonClicked)
        setBreakTime(5)

      } else {
        setBut25(newWorkout.breakButton)
        setBreakTime(null)

      }
    } else if (input === 6) {
      if (but30 == newWorkout.breakButton) {
        setBut30(newWorkout.breakButtonClicked)
        setBreakTime(5)

      } else {
        setBut30(newWorkout.breakButton)
        setBreakTime(null)

      }
    } else if (input === 7) {
      if (but35 == newWorkout.breakButton) {
        setBut35(newWorkout.breakButtonClicked)
        setBreakTime(5)

      } else {
        setBut35(newWorkout.breakButton)
        setBreakTime(null)

      }
    } else if (input === 8) {
      if (but40 == newWorkout.breakButton) {
        setBut40(newWorkout.breakButtonClicked)
        setBreakTime(5)

      } else {
        setBut40(newWorkout.breakButton)
        setBreakTime(null)

      }
    } else if (input === 9) {
      if (but45 == newWorkout.breakButton) {
        setBut45(newWorkout.breakButtonClicked)
        setBreakTime(5)

      } else {
        setBut45(newWorkout.breakButton)
        setBreakTime(null)

      }
    } else if (input === 10) {
      if (but50 == newWorkout.breakButton) {
        setBut50(newWorkout.breakButtonClicked)
        setBreakTime(5)

      } else {
        setBut50(newWorkout.breakButton)
        setBreakTime(null)

      }
    } else if (input === 11) {
      if (but55 == newWorkout.breakButton) {
        setBut55(newWorkout.breakButtonClicked)
        setBreakTime(5)

      } else {
        setBut55(newWorkout.breakButton)
        setBreakTime(null)

      }
    } else if (input === 12) {
      if (but60 == newWorkout.breakButton) {
        setBut60(newWorkout.breakButtonClicked)
        setBreakTime(5)

      } else {
        setBut60(newWorkout.breakButton)
        setBreakTime(null)


      }
    }
    
  }

  return (
    <View style={backgroundStyle.container}>
        <View>
          <View flexDirection='row'>
            <Text style={backgroundStyle.titleText}> Welcome, {userID.substring(0, userID.indexOf("@"))} </Text>
            <TouchableOpacity style = {{marginLeft:72, marginTop:13}}>
              <Image source={ require('../assets/person3.png') } style={ { width: 60, height: 60 } } />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} alignSelf={'left'} marginLeft={0} marginBottom={10}>
            <HomeCards></HomeCards>
            <HomeCards></HomeCards>
            <HomeCards></HomeCards>
            <HomeCards></HomeCards>          
          </ScrollView>

          
          <TouchableOpacity style={backgroundStyle.plusButton} onPress={() => setOpenNewWorkoutPage(true)}>
            <Text style={backgroundStyle.plusText}>
              +
            </Text>
          </TouchableOpacity>
          {/* <View marginBottom={30}>
            <RedirectCards></RedirectCards>         
          </View> */}
        </View> 

        <Modal
        animationType="slide"
        visible={openNewWorkoutPage}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setOpenNewWorkoutPage(!openNewWorkoutPage);
        }}>
          <View style={newWorkout.container}>

          <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 25}}>
           
           </View>

            <View style={newWorkout.headerBackground}>

            <TouchableOpacity onPress={() => setOpenNewWorkoutPage(false)} >
                <Text style={newWorkout.returnText}>x</Text> 
            </TouchableOpacity> 
              <Text style={newWorkout.mainHeader}>Workout Creator</Text> 
            </View>

            <View style={newWorkout.subHeaderBackground}>
              <Text style={newWorkout.header}>1. Name</Text> 
            </View>

           <View style={newWorkout.inputView}>
            <TextInput
              style={newWorkout.inputText}
              placeholder="Workout Name"
              placeholderTextColor="#8e8efa"
              onChangeText={(workoutName) => setWorkoutName(workoutName)}
            /> 
          </View> 

          
          <View style={newWorkout.subHeaderBackground}>
              <Text style={newWorkout.header}>2. Describe </Text> 
         </View>

         <View style={newWorkout.inputView2}>
            <TextInput
              style={newWorkout.inputText1}
              multiline
              placeholder="Description"
              placeholderTextColor="#8e8efa"
              numberOfLines={5}
              maxLength={150}
              onChangeText={(workoutDesc) => setWorkoutDesc(workoutDesc)}
            /> 
         </View>
     
           


         <View style={newWorkout.subHeaderBackground}>
              <Text style={newWorkout.header}>3. Set Breaks</Text> 
         </View>

         <Text style={newWorkout.breakDesc}>  Select the time, in seconds, to rest between sets</Text> 


         <ScrollView horizontal={true} style={{marginTop: 4}}>
          <TouchableOpacity style={but5} onPress={() => recieveBreakTimes(1)}>
                <Text style={newWorkout.breakText}>5</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={but10} onPress={() => recieveBreakTimes(2)}>
                <Text style={newWorkout.breakText}>10</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={but15} onPress={() => recieveBreakTimes(3)}>
                <Text style={newWorkout.breakText}>15</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={but20} onPress={() => recieveBreakTimes(4)}>
                <Text style={newWorkout.breakText}>20</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={but25} onPress={() => recieveBreakTimes(5)}>
                <Text style={newWorkout.breakText}>25</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={but30} onPress={() => recieveBreakTimes(6)}>
                <Text style={newWorkout.breakText}>30</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={but35} onPress={() => recieveBreakTimes(7)}>
                <Text style={newWorkout.breakText}>35</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={but40} onPress={() => recieveBreakTimes(8)}>
                <Text style={newWorkout.breakText}>40</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={but45} onPress={() => recieveBreakTimes(9)}>
                <Text style={newWorkout.breakText}>45</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={but50} onPress={() => recieveBreakTimes(10)}>
                <Text style={newWorkout.breakText}>50</Text> 
            </TouchableOpacity>  
            <TouchableOpacity style={but55} onPress={() => recieveBreakTimes(11)}>
                <Text style={newWorkout.breakText}>55</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={but60} onPress={() => recieveBreakTimes(12)}>
                <Text style={newWorkout.breakText}>60</Text> 
            </TouchableOpacity>  
         </ScrollView>
     
         <View style={newWorkout.subHeaderBackground}>
              <Text style={newWorkout.header}>4. Finish</Text> 
         </View>

         <TouchableOpacity style={newWorkout.submitButton} onPress={createWorkout}>
              <Text style={newWorkout.submitText}>Create</Text> 
          </TouchableOpacity>  


          </View>
        
      </Modal>
    </View>
   
  )
}

const backgroundStyle = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#0d0d12',
  },

  plusButton: {
      marginBottom: 9,
      marginLeft: 317,
      borderRadius:7,
      paddingHorizontal: 10,
      backgroundColor: '#8e8efa',
      shadowColor: 'rgba(227, 227, 255, 0.2)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15,
      borderRadius: 100,
      margin: 5,
      shadowOffset : { width: 1, height: 13},
      width: 50,
      height: 50
  },

  plusText: {
    fontWeight: "900",
    fontSize: 40,
    fontStyle: 'italic',
    color: '#ffffff',
  },


  titleText: {
    color: "#8e8efa",
    fontWeight: "500",
    fontSize: 27,
    alignSelf: "left",
    marginTop: 28,
    marginLeft: 10
  },

  cardView: {
    flex: 1,
  },

  breakView: {
    height: 100,
    width: 100
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

const newWorkout = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  }, 

  returnText: {
    fontWeight: "600",
    fontSize: 35,
    color: "#FF0101",
    alignSelf: "left",
    marginLeft: 15,
    marginRight: 5

  },

  mainHeader: {
    fontWeight: "600",
    fontSize: 38,
    color: "#ffffff",
    alignSelf: "left",
    marginLeft:4
  },

  header: {
    fontWeight: "600",
    fontSize: 38,
    color: "#ffffff",
    alignSelf: "left",
    marginLeft: 20
  },

  breakButton: {
    borderRadius:9,
    borderWidth: 2,
    borderColor: '#8e8efa',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(227, 227, 255, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    margin: 5,
    shadowOffset : { width: 1, height: 13},
  },

  breakButtonClicked: {
    borderRadius:9,
    borderWidth: 2,
    borderColor: '#8e8efa',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#8e8efa',
    shadowColor: 'rgba(227, 227, 255, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    margin: 5,
    shadowOffset : { width: 1, height: 13},
  },

  breakText: {
    fontWeight: "600",
    fontSize: 15,
  },

  breakDesc: {
    fontWeight: "400",
    fontSize: 15,
    fontStyle:'italic',
    paddingLeft: 4,
    marginTop: 8,
    backgroundColor: '#cccccc'
  },

  submitButton: {
    borderRadius:9,
    paddingHorizontal: 15,
    paddingVertical: 8,
    width: 150,
    marginLeft: 110,
    marginTop: 20,
    backgroundColor: '#8e8efa',
    shadowColor: 'rgba(227, 227, 255, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    margin: 5,
    shadowOffset : { width: 1, height: 13},
  },


  breakButtonClicked: {
    borderRadius:9,
    borderWidth: 2,
    borderColor: '#8e8efa',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#8e8efa',
    shadowColor: 'rgba(227, 227, 255, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    margin: 5,
    shadowOffset : { width: 1, height: 13},
  },


  headerBackground: {
    fontWeight: "600",
    backgroundColor: "#8e8efa",
    alignSelf: "left",
    marginTop: 45,
    width: '100%',
    flexDirection: 'row'
  },

  subHeaderBackground: {
    fontWeight: "600",
    backgroundColor: "#404057",
    alignSelf: "left",
    marginTop: 25,
    width: '100%'

  },

  inputView: {
    borderColor: "#404057",
    borderWidth: 4,
    borderRadius: 5,
    height: 55,
    width: 340,
    marginTop: 25,
    marginLeft: 17,
    alignItems: "center",
  },

  inputView2: {
    borderColor: "#404057",
    borderWidth: 4,
    borderRadius: 5,
    height: 125,
    width: 340,
    marginTop: 25,
    marginLeft: 17,
    alignItems: "center",
  },

  inputText: {
    height: 50,
    width: "100%",
    flex: 1,
    fontSize: 25,
    fontStyle: 'italic',
    paddingLeft: 15,
    color: "#000000",
  },
  inputText1: {
    width: "100%",
    flex: 1,
    fontStyle: 'italic',
    paddingLeft: 15,
    paddingTop: 10,
    paddingRight: 15,
    color: "#000000",
  },
  
  submitText: {
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 20,
    color: "#ffffff",
  },
})
