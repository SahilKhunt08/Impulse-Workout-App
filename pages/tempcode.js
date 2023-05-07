//       <View style={styles.addExerciseView}>
//         <View style={{width: 200, flexDirection: "row"}}>
//         <TextInput
//           style={styles.addExerciseInput1}
//           placeholder="Name"
//           placeholderTextColor="#003f5c"
//           onChangeText={(exerciseInput1) => setExerciseInput1(exerciseInput1)}
//         /> 
//         <TextInput
//           style={styles.addExerciseInput2}
//           placeholder="Num"
//           placeholderTextColor="#003f5c"
//           onChangeText={(exerciseInput2) => setExerciseInput2(exerciseInput2)}
//         /> 
//         </View>
//         <TouchableOpacity style={styles.loginBtn} >
//           <Text style={styles.loginText} onPress={addExerciseSelf}>Add Exercise</Text> 
//         </TouchableOpacity> 
//       </View>






//       {/* <View style={styles.friendsContainer}>
//         <Text style={styles.friendsTitle}> Friends </Text>
//         <ScrollView style={styles.scrollStyle}>
//           <View style={{alignItems: "center"}}>
//           {friendsArr.map((info, index) => (
//             <View key={index}>
//               <TouchableOpacity onPress={() => {
//                 setModalVisible(true);
//                 // setModalDirections(info.instructions)
//                 setModalUser(info.name)
//                 }}>
//                 <View style={styles.friendNamesView}>
//                   <Text style={styles.friendNames}> {info.name} </Text>  
//                 </View>
//               </TouchableOpacity>
//             </View>
//           ))}
//           </View>
//         </ScrollView>
//       </View>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//         // Alert.alert('Modal has been closed.');
//         setModalVisible(!modalVisible);
//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalUserText}>{modalUser}</Text>

//             <View style={{flexDirection: "row", marginBottom: 20,}}>
//               <TouchableOpacity style={styles.workoutButton} onPress={() => loadFriendWorkout(1)}>
//                 <Text > Workout 1 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.workoutButton} onPress={() => loadFriendWorkout(2)}>
//                 <Text > Workout 2 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.workoutButton} onPress={() => loadFriendWorkout(3)}>
//                 <Text > Workout 3 </Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.modalBodyView}>
//               <Text style={styles.modalBodyText}>{ modalBody }</Text>
//             </View>

//               <Pressable
//                 style={[styles.modalButton, styles.buttonClose]}
//                 onPress={() => setModalVisible(!modalVisible)}>
//                 <Text style={styles.textStyle}>Close</Text>
//               </Pressable>

//           </View>  
//         </View>
//       </Modal> */}







// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: '#adc9db',
//   },
//   loginBtn: {
//     width: 120,
//     borderRadius: 5,
//     height: 45,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#507a94",
//     marginHorizontal: 5,
//   },
//   loginText: {
//     fontSize: 18,
//   },
//   addExerciseInput1: {
//     height: 65,
//     fontSize: 18,
//     width: "70%",
//     maxWidth: "70%"
//   },
//   addExerciseInput2: {
//     height: 65,
//     fontSize: 18,
//     width: "20%",
//     maxWidth: "20%"
//   },
// //—————————————————————————————————————————————————————
//   friendsContainer: {
//     marginTop: 100,
//     backgroundColor: "#91b6cf",
//     height: 300,
//     width: "100%",
//     borderWidth: 2,
//     alignItems: "center",
//   },
//   friendsTitle: {
//     fontSize: 22,
//     marginTop: 10,
//   },
//   friendNamesView: {
//     backgroundColor: "#7c9bb2",
//     width: 400,
//     alignItems: "center",
//     paddingVertical: 10,
//     borderBottomWidth: 0.5,
//     borderTopWidth: 0.5,
//   },
//   friendNames: {
//     fontSize: 20,
//   },
//   scrollStyle: {
//     height: "10%",
//     marginTop: 15,
//     width: "100%",
//   },
// //—————————————————————————————————————————————————————
//   addExerciseView: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#749cb5",
//     width: "100%",
//     // position: 'absolute', 
//     // bottom: 0,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
// },
// //—————————————————————————————————————————————————————
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalButton: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   modalUserText: {
//     marginBottom: 15,
//     textAlign: 'center',
//     fontSize: 25,
//     fontWeight: "bold",
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   workoutButton: {
//     alignItems: 'center',
//     backgroundColor: '#6b99c9',
//     padding: 10,
//     marginTop: 5,
//     marginHorizontal: 5,
//     borderRadius: 5,
//   },
//   modalBodyView: {
//     backgroundColor: "#cedceb",
//     marginTop: 15, 
//     marginBottom: 25,
//     minWidth: 250,
//     alignItems: "center",
//     borderRadius: 5,
//   },
//   modalBodyText: {
//     fontSize: 20,
//     marginVertical: 10,
//   },
// });



//     // for(var x = 0; x < tempArr.length; x++){

//     //   var currentMembersArr = tempArr[x].membersArr;
//     //   var currentScoreArr = tempArr[x].scoresArr;
//     //   var newMembersArr = [];
//     //   var newScoresArr = [];

//     //   for(var y = 0; y < tempArr[x].membersArr.length; y++){
//     //     var max = 0;
//     //     var index = 0;
//     //     var mainLength = currentScoreArr.length;

//     //     for(var z = 0; z < mainLength; z++){
//     //       if(currentScoreArr[z] >= max){
//     //         max = currentScoreArr[z];
//     //         index = z;
//     //       }
//     //     }
//     //     newMembersArr.push(currentMembersArr[index]);
//     //     newScoresArr.push(currentScoreArr[index]);
//     //     var tempArr1 = [];
//     //     var tempArr2 = [];

//     //     for(var j = 0; j < mainLength; j++){
//     //       if(currentScoreArr[j] != max){
//     //         tempArr1.push(currentScoreArr[j]);
//     //         tempArr2.push(currentMembersArr[j]);
//     //       }
//     //     }
//     //     currentScoreArr = tempArr1;
//     //     currentMembersArr = tempArr2;
//     //   }
//     //   var placement = 0;
//     //   for(var l = 0; l < newMembersArr.length; l++){
//     //     if(user.uid == newMembersArr[l]){
//     //       placement = l + 1; 
//     //     }
//     //   }
//     //   sortedLeaderboardsArr[x] = {place: placement, sortedMembersArr: newMembersArr, sortedScoresArr: newScoresArr}
//     //   settingFinalArr.push({
//     //     category: tempMyArr[x].category,
//     //     membersArr: tempMyArr[x].membersArr,
//     //     name: tempMyArr[x].name,
//     //     scoresArr: tempMyArr[x].scoresArr,
//     //     place: placement, 
//     //     sortedMembersArr: newMembersArr, 
//     //     sortedScoresArr: newScoresArr,
//     //   });
//     // }




//     //Issues
// //pass params between files


// import React, { useState } from 'react'
// import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Button, Modal, Settings} from "react-native";
// import Card1 from "./components/card1";
// import Card2 from "./components/card2";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// import { addDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, updateDoc,getDoc, deleteDoc} from "firebase/firestore"; 
// import {db} from './firebase';
// import { async } from "@firebase/util";

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Divider from 'react-native-divider';
// import { Icon } from '@rneui/themed';

// import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


// import HomeScroll from './homeScroll';

// import { BlurView } from 'expo-blur';



// export default function Home({route, navigation}) {
//   React.useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       loadWorkouts();     
//       initializeName()
//       initializeDailyWorkouts()
//       // console.log(lastSignin) 
//     });
//     return unsubscribe;
//   }, []);

//   const auth = getAuth();
//   const user = auth.currentUser;
//   // const {lastSigninTime} = route.params.lastSignin
//   const [userID, setUserUID] = useState(user.email)
//   const [userName, setUserName] = useState("")
  
//   //New Workout
//   const [openNewWorkoutPage, setOpenNewWorkoutPage] = useState(false)
//   const [but5, setBut5] = useState(newWorkout.breakButton)
//   const [but10, setBut10] = useState(newWorkout.breakButton)
//   const [but15, setBut15] = useState(newWorkout.breakButton)
//   const [but20, setBut20] = useState(newWorkout.breakButton)
//   const [but25, setBut25] = useState(newWorkout.breakButton)
//   const [but30, setBut30] = useState(newWorkout.breakButton)
//   const [but35, setBut35] = useState(newWorkout.breakButton)
//   const [but40, setBut40] = useState(newWorkout.breakButton)
//   const [but45, setBut45] = useState(newWorkout.breakButton)
//   const [but50, setBut50] = useState(newWorkout.breakButton)
//   const [but55, setBut55] = useState(newWorkout.breakButton)
//   const [but60, setBut60] = useState(newWorkout.breakButton)
//   const [breakTime, setBreakTime] = useState(0)
//   const [workoutName, setWorkoutName] = useState("")
//   const [workoutDesc, setWorkoutDesc] = useState("")

//   //All Workout Objects
//   const [totalWorkoutsArr, setTotalWorkoutsArr] = useState([])
//   const [totalFriendWorkoutsArr, setTotalFriendWorkoutsArr] = useState([])
//   const [totalImpulseWorkoutsArr, setTotalImpulseWorkoutsArr] = useState([])

//   //Timer
//   const [currExercisesArr, setCurrExercisesArr] = useState([])
//   const [timeConfigs, setTimeConfigs] = useState([])
//   const [nameConfigs, setNameConfigs] = useState([])
//   const [nextNameConfigs, setNextNameConfigs] = useState([])
//   const [currStep, setCurrStep] = useState(0)
//   const [openSpecWorkout, setOpenSpecWorkout] = useState(false)

//    //Edit Workout
//   const [openEditWorkoutPage, setOpenEditWorkoutPage] = useState(false)
//   const [selName, setSelName] = useState("")
//   const [selDesc, setSelDesc] = useState("")
//   const [selExercises, setSelExercises] = useState([])
//   //Edit Exercises
//   const setNumArr = [1, 2, 3, 4, 5, 6];
//   const timeArr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
//   const dailyWorkouts = ["Arms Killer", "Leg Burner"]
//   const [modalAddVisible, setModalAddVisible] = useState(false);
//   const [setting1, setSetting1] = useState(0);
//   const [setting2, setSetting2] = useState(0);
//   const [setting3, setSetting3] = useState(0);
//   const [settingStyleArr1, setSettingStyleArr1] = useState([]);
//   const [settingStyleArr2, setSettingStyleArr2] = useState([]);
//   const [settingStyleArr3, setSettingStyleArr3] = useState([]);
//   const [selExercise, setSelExercise] = useState("")
//   const [selWorkoutID, setSelWorkoutID] = useState("")
 
//   const [currDailyNum, setCurrDailyNum] = useState(0)

//   const [selDailyWorkout, setSelDailyWorkout] = useState("")

//   async function initializeName() {
//     const docSnap = await getDoc(doc(db, "accounts", user.uid));
//     const name = docSnap.data().username; 
//     setUserName(name) 
//   }

//   const initializeDailyWorkouts = () => {
//     let temp = currDailyNum;
//     var hours = new Date().getHours();
//     if (hours == 0) {
//       if (temp+1< dailyWorkouts.length) {
//         temp++
//       } else {
//         temp = 0;
//       }
//       setCurrDailyNum(temp)
//       loadDailyWorkout(dailyWorkouts[currDailyNum])
//     }
//   }


//   async function createWorkout() {
//     const auth = getAuth();
//     const user = auth.currentUser
//     setOpenNewWorkoutPage(false)
//     const uID = Math.random()
    
//     await setDoc(doc(db, "accounts", user.uid, "workouts", workoutName), {
//       description: workoutDesc,
//       breakTime: breakTime,
//       name: workoutName,
//       workoutID: uID,
//       type: "Self",
//       creator: userName,
//       creatorID: user.uid
      
//     });

//     const docSnap = await getDoc(doc(db, "accounts", user.uid));
//     const docRef1 = doc(db, "accounts", user.uid);
//     const tempArr1 = docSnap.data().workoutsArr;  
//     tempArr1.push(workoutName)
//     await updateDoc(docRef1, {
//       workoutsArr: tempArr1,
//     })
//     loadWorkouts()
//   }



//   async function loadWorkouts() {
//     const allSelfWorkoutsArr = []
//     const allFriendWorkoutArr = []
//     const allImpulseWorkoutArr = []
//       const workoutRef = collection(db, "accounts", user.uid, "workouts");
//       const workoutDocs = await getDocs(workoutRef);
//       workoutDocs.forEach(doc => {
//         if (doc.id != "temp" && doc.data().type == "Self") {
//           allSelfWorkoutsArr.push(doc.data())
//         } else if ((doc.id != "temp" && doc.data().type == "Friend")) {
//           allFriendWorkoutArr.push(doc.data())
//         }
//       })        

//       const impulseWorkoutRef = collection(db, "challenges");
//       const impulseWorkoutDocs = await getDocs(impulseWorkoutRef);
//       impulseWorkoutDocs.forEach(doc => {
//         if (doc.id != "temp" && doc.data().type == "Impulse") {
//           allImpulseWorkoutArr.push(doc.data())
//         }
//       })

//       //Self Workouts
//       setTotalWorkoutsArr(allSelfWorkoutsArr)
//       //Friend Workouts
//       setTotalFriendWorkoutsArr(allFriendWorkoutArr)

//       setTotalImpulseWorkoutsArr(allImpulseWorkoutArr)

//   }

//   async function temp () {
//   //   console.log("fdfd")
//   //   const workoutsDeleteArr = []
//   //   const deleteWorkoutRef = collection(db, "accounts", user.uid, "workouts");
//   //   const deleteWorkoutDocs = await getDocs(deleteWorkoutRef);
//   //   deleteWorkoutDocs.forEach(doc => {
//   //     if (doc.id != "temp" && doc.data().type == "Friend") {
//   //       workoutsDeleteArr.push(doc.data())
//   //     }
//   //   })  
//   //   console.log(workoutsDeleteArr.length)
//   //   deleteSelected(workoutsDeleteArr)

//   }

//   async function loadDailyWorkout(name) {
//     const allWorkoutsArr1 = []
//     const workoutRef = collection(db, "challenges");
//     const workoutDocs = await getDocs(workoutRef);
//     workoutDocs.forEach(doc => {
//       if (doc.id == name) {
//         allWorkoutsArr1.push(doc.data())
//       }
//     })        
//     setSelDailyWorkout(allWorkoutsArr1)
//   }

//   async function openSpecificWorkout(index, type) {
//     // need creator id and name
//     setCurrStep(0);
//     let creatorID = ""
//     let workoutName = ""
//     const exercises = []
//     if (type == 1) {
//       for (let i = 0; i < totalWorkoutsArr.length; i++) {
//         if (totalWorkoutsArr[i].workoutID == index) {
//           creatorID = totalWorkoutsArr[i].creatorID
//           workoutName = totalWorkoutsArr[i].name
//         }
//       }
//       //your workouts
//     } else if (type == 2) {
//       //impulse workouts
//     } else if (type == 3) {
//       //friend workouts
//     }
//     console.log(index.length)
//     if(index.type != 'Impulse') {
//       console.log("done")
      




//     const exerciseRef = collection(db, "accounts", index.creatorID, "workouts", index.name, "exercises");
//     const exerciseDocs = await getDocs(exerciseRef)
//     exerciseDocs.forEach(doc => {
//       exercises.push(doc.data());
//     })
//   }



//     setCurrExercisesArr(exercises)
//     setOpenSpecWorkout(true);
//     recieveBreakTimes(0)



//   let timerConfig = []
//   let nameConfig = []
//   let nextConfig = []
//     //config timing for timer
//     //all exercises
//     timerConfig.push(5)
//     nameConfig.push("Get Ready")
//     nextConfig.push("Get Ready")
//     for (let i = 0; i < exercises.length; i++) {
//       //specific exercise
//       for (let x = 0; x < exercises[i].setsNum; x++) {
//         timerConfig.push(exercises[i].activeNum)
//         nameConfig.push(exercises[i].name)
//         nextConfig.push(exercises[i].name)
//         timerConfig.push(exercises[i].restNum)
//         nameConfig.push("Rest")
//         nextConfig.push("Rest")
//       }
//       timerConfig.push(index.breakTime)
//       nameConfig.push("Rest")
//       nextConfig.push("Rest")
//     }
//     nextConfig.shift()
//     nextConfig.push("")
//     setTimeConfigs(timerConfig)
//     setNameConfigs(nameConfig)
//     setNextNameConfigs(nextConfig)
//   }

  
//   const selectSetting = (type, index) => {
//     if(type == 1){
//       setSetting1(setNumArr[index]);
//       for(var i = 0; i < setNumArr.length; i++){
//         settingStyleArr1[i] = modalAddStyles.timeButtonOff;
//       }
//       settingStyleArr1[index] = modalAddStyles.timeButtonOn;
//     } else if (type == 2) {
//       setSetting2(timeArr[index]);
//       for(var i = 0; i < timeArr.length; i++){
//         settingStyleArr2[i] = modalAddStyles.timeButtonOff;
//       }
//       settingStyleArr2[index] = modalAddStyles.timeButtonOn;
//     } else if (type == 3) {
//       setSetting3(timeArr[index]);
//       for(var i = 0; i < timeArr.length; i++){
//         settingStyleArr3[i] = modalAddStyles.timeButtonOff;
//       }
//       settingStyleArr3[index] = modalAddStyles.timeButtonOn;
//     }
//   }
 
//   async function editWorkout(index) {
//     //Workout Editing
//     setOpenEditWorkoutPage(true)
//     let selectedName = ""
//     let selectedRestTime = 0
//     let selectedDesc = ""
//     for (let i = 0; i < totalWorkoutsArr.length; i++) {
//       if (totalWorkoutsArr[i].workoutID == index) { 
//         selectedName = totalWorkoutsArr[i].name
//         selectedRestTime = totalWorkoutsArr[i].breakTime
//         selectedDesc = totalWorkoutsArr[i].description
//         setSelWorkoutID(totalWorkoutsArr[i].workoutID)
//       }
//     }
//     setSelName(selectedName)
//     setSelDesc(selectedDesc) 
//     loadExercises(selectedName);
//     recieveBreakTimes(selectedRestTime/5)
//     loadWorkouts()
//   }

//   async function loadExercises(workoutName) {

//     const exercises = []
//     const exerciseRef = collection(db, "accounts", user.uid, "workouts", workoutName, "exercises");
//     const exerciseDocs = await getDocs(exerciseRef)
//     exerciseDocs.forEach(doc => {
//       exercises.push(doc.data());
//     })
//     setSelExercises(exercises)
//   }

//   async function editExercises(name) {
//     let setsNum = 0
//     let activeNum = 0
//     let restNum = 0
    
//     // console.log(exerciseDocs)
//     for (let i = 0; i < selExercises.length; i++) {

//       if (selExercises[i].name == name) { 
//         setModalAddVisible(true)
//         setSelExercise(name)
//         setsNum = selExercises[i].setsNum
//         activeNum = selExercises[i].activeNum
//         restNum = selExercises[i].restNum
//       }
//     }
//     selectSetting(1, setNumArr.indexOf(setsNum))
//     selectSetting(2, timeArr.indexOf(activeNum))
//     selectSetting(3, timeArr.indexOf(restNum))
//   }

//   async function deleteExercise(name) {

//     await deleteDoc(doc(db, "accounts", user.uid, "workouts", selName, "exercises", name));
//     loadExercises(selName)
    
//   }

//   async function submitExerciseChanges() {
//     //Needed Variables
//     setModalAddVisible(false)
//     await setDoc(doc(db, "accounts", user.uid, "workouts", selName, "exercises", selExercise), {
//       setsNum: setting1,
//       restNum: setting3,
//       activeNum: setting2,
//       name: selExercise
//     });
//     loadExercises(selName)
//   }

//   async function submitWorkoutChanges() {
//     setOpenEditWorkoutPage(false)
//     //finish
//     await updateDoc(doc(db, "accounts", user.uid, "workouts", selName), {
//       breakTime: breakTime,
//       description: selDesc,
//       name: selName,
//       workoutID: selWorkoutID
      
  
//     });
//   }

//   async function deleteWorkout(index) {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     let deleteName = ""

//     for (let i = 0; i < totalWorkoutsArr.length; i++) {
//       if (totalWorkoutsArr[i].workoutID == index) { 
//         deleteName = totalWorkoutsArr[i].name
//       }
//     }

//     const docSnap = await getDoc(doc(db, "accounts", user.uid));
//     const docRef1 = doc(db, "accounts", user.uid);
//     const tempArr1 = docSnap.data().workoutsArr;  
//     const deleteIndex = tempArr1.indexOf(deleteName)

//     tempArr1.splice(deleteIndex, deleteIndex+1)
//     await updateDoc(docRef1, {
//       workoutsArr: tempArr1,
//     })

//     await deleteDoc(doc(db, "accounts", user.uid, "workouts", deleteName));
//     loadWorkouts()
//   }
  
//   const recieveBreakTimes = (input) => {
//     setBut5(newWorkout.breakButton)
//     setBut10(newWorkout.breakButton)
//     setBut15(newWorkout.breakButton)
//     setBut20(newWorkout.breakButton)
//     setBut25(newWorkout.breakButton)
//     setBut30(newWorkout.breakButton)
//     setBut35(newWorkout.breakButton)
//     setBut40(newWorkout.breakButton)
//     setBut45(newWorkout.breakButton)
//     setBut55(newWorkout.breakButton)
//     setBut60(newWorkout.breakButton)
//     if (input === 1) {
//       if (but5 == newWorkout.breakButton) {
//         setBut5(newWorkout.breakButtonClicked)
//         setBreakTime(5)
//       } else {
//         setBut5(newWorkout.breakButton)
//         setBreakTime(null)

//       }
//     } else if (input === 2) {
//       if (but10 == newWorkout.breakButton) {
//         setBut10(newWorkout.breakButtonClicked)
//         setBreakTime(10)

//       } else {
//         setBut10(newWorkout.breakButton)
//         setBreakTime(null)

//       }
//     } else if (input === 3) {
//       if (but15 == newWorkout.breakButton) {
//         setBut15(newWorkout.breakButtonClicked)
//         setBreakTime(15)

//       } else {
//         setBut15(newWorkout.breakButton)
//         setBreakTime(null)

//       }

//     } else if (input === 4) {
//       if (but20 == newWorkout.breakButton) {
//         setBut20(newWorkout.breakButtonClicked)
//         setBreakTime(20)

//       } else {
//         setBut20(newWorkout.breakButton)
//         setBreakTime(null)

//       }
//     } else if (input === 5) {
//       if (but25 == newWorkout.breakButton) {
//         setBut25(newWorkout.breakButtonClicked)
//         setBreakTime(25)

//       } else {
//         setBut25(newWorkout.breakButton)
//         setBreakTime(null)

//       }
//     } else if (input === 6) {
//       if (but30 == newWorkout.breakButton) {
//         setBut30(newWorkout.breakButtonClicked)
//         setBreakTime(30)

//       } else {
//         setBut30(newWorkout.breakButton)
//         setBreakTime(null)

//       }
//     } else if (input === 7) {
//       if (but35 == newWorkout.breakButton) {
//         setBut35(newWorkout.breakButtonClicked)
//         setBreakTime(35)

//       } else {
//         setBut35(newWorkout.breakButton)
//         setBreakTime(null)

//       }
//     } else if (input === 8) {
//       if (but40 == newWorkout.breakButton) {
//         setBut40(newWorkout.breakButtonClicked)
//         setBreakTime(40)

//       } else {
//         setBut40(newWorkout.breakButton)
//         setBreakTime(null)

//       }
//     } else if (input === 9) {
//       if (but45 == newWorkout.breakButton) {
//         setBut45(newWorkout.breakButtonClicked)
//         setBreakTime(45)
//       } else {
//         setBut45(newWorkout.breakButton)
//         setBreakTime(null)

//       }
//     } else if (input === 10) {
//       if (but50 == newWorkout.breakButton) {
//         setBut50(newWorkout.breakButtonClicked)
//         setBreakTime(50)

//       } else {
//         setBut50(newWorkout.breakButton)
//         setBreakTime(null)

//       }
//     } else if (input === 11) {
//       if (but55 == newWorkout.breakButton) {
//         setBut55(newWorkout.breakButtonClicked)
//         setBreakTime(55)

//       } else {
//         setBut55(newWorkout.breakButton)
//         setBreakTime(null)

//       }
//     } else if (input === 12) {
//       if (but60 == newWorkout.breakButton) {
//         setBut60(newWorkout.breakButtonClicked)
//         setBreakTime(60)

//       } else {
//         setBut60(newWorkout.breakButton)
//         setBreakTime(null)


//       }
//     }
//   }

//   return (
//     <View style={backgroundStyle.container}>
//         <View>
//         <View>
//           <View flexDirection='row'>
//             <Text style={backgroundStyle.titleText}> Welcome, {userName} </Text>

//             <TouchableOpacity style = {{marginLeft:330, marginTop:28, position: 'absolute'}} onPress={temp}>
//               <Image source={ require('../assets/person3.png') } style={ { width: 35, height: 35} } />
//             </TouchableOpacity>
//           </View> 
//           <Text style={backgroundStyle.timeText}> Last Sign in on 5/4 at 9:23 </Text>

//         </View>
          

//           <ScrollView horizontal={true} alignSelf={'left'} showsHorizontalScrollIndicator={false}>
            
//             {totalWorkoutsArr.map((info, index) => (
//               <View key={index} style={cardStyle.container}>
//                 <Text style={cardStyle.titleText}>{info.name}</Text>
//                 <TouchableOpacity style = {{position: 'absolute', paddingRight:10, marginTop: 12, marginLeft: 183}} onPress={() => editWorkout(info.workoutID)}>
//                         <Image source={ require('../assets/pencil1.png') } style={ { width: 25, height: 25 } } />
//                 </TouchableOpacity> 
//                 <TouchableOpacity style = {{position: 'absolute', paddingRight:10, marginTop: 10, marginLeft: 215}} onPress={() => deleteWorkout(info.workoutID)}>
//                         <Image source={ require('../assets/trashicon1.png') } style={ { width: 30, height: 30 } } />
//                 </TouchableOpacity> 

//                 <View style={cardStyle.image}>
//                     <TouchableOpacity style = {{paddingRight:10, marginLeft:205, marginTop: 90, position: 'absolute'}} onPress={() => openSpecificWorkout(info.workoutID, 1)}>
//                         <Image source={ require('../assets/arrow5.png') } style={ { width: 40, height: 40 } } />
//                     </TouchableOpacity>         
//                 </View>
//                 <View>
//                     <Text style={cardStyle.subText}>{info.description}</Text>
//                 </View>
//                 <Text style={cardStyle.arrowText}></Text>         
//               </View>
//             ))}  

//           </ScrollView>

//           <ScrollView horizontal={true} style={homeScrollMain.container} showsHorizontalScrollIndicator={false}>
//               <View style={homeScrollMain.scrollContainer}>

//               <Image source={ require('../assets/soloworkout.jpeg') } style={homeScrollMain.banner} />
//               <Text style={homeScrollMain.titleText1}>Impulse Workouts</Text>

//               <View style={homeScrollMain.scrollContainer1}>
//                   <ScrollView>
//                     {totalImpulseWorkoutsArr.map((info, index) => (
//                       <View key={index} style={homeScrollMain.workoutCard}>
//                         <Text  style={cardStyle.titleText} backgroundColor={'#FFFFFF'}>{info.name}</Text>
       
//                           <TouchableOpacity style = {{marginLeft: 260}} onPress={() => openSpecificWorkout(info.workoutID, 2)}>
//                           <Image source={ require('../assets/arrow5.png') } style={ { width: 20, height: 20 } } />
//                        </TouchableOpacity>
                           
//                       </View>
                      
//                     ))}  
//                   </ScrollView>
//               </View>
//               </View>
            
//             <View style={homeScrollMain.scrollContainer}>

//                 <Image source={ require('../assets/workingout.jpeg') } style={homeScrollMain.banner} />
//                 <Text style={homeScrollMain.titleText}>Friend Workouts</Text>
//                 <View style={homeScrollMain.scrollContainer1}>
//                   <ScrollView style={homeScrollMain.scrollContainer2}>
//                     <View style={homeScrollMain.scrollContainer3}>
//                       {totalFriendWorkoutsArr.map((info, index) => (
//                           <View key={index} style={homeScrollMain.workoutCard1}>
//                           <View flexDirection={'row'}>
//                             <Text style={cardStyle.titleText} backgroundColor={'#FFFFFF'}>{info.name}</Text>
//                             <Text style={homeScrollMain.friendName}>{info.creator}</Text>
//                           </View>
//                             <TouchableOpacity style = {{marginLeft: 260}} onPress={() => openSpecificWorkout(info.workoutID, 3)}>
//                           <Image source={ require('../assets/arrow5.png') } style={ { width: 20, height: 20 } } />
//                        </TouchableOpacity>
//                           </View>
//                           ))}  
//                     </View>
//                   </ScrollView>
//                 </View>
                
//             </View>
//         </ScrollView>
          
//           <TouchableOpacity style={backgroundStyle.plusButton} onPress={
//             () => {
//               recieveBreakTimes(0)
//               setOpenNewWorkoutPage(true)
//             }
//           }>
//             <Text style={backgroundStyle.plusText}>+</Text>
//           </TouchableOpacity>
//           {/* <View marginBottom={30}>
//             <RedirectCards></RedirectCards>         
//           </View> */}
//         </View> 

//         <Modal
//         animationType="slide"
//         visible={openNewWorkoutPage}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setOpenNewWorkoutPage(!openNewWorkoutPage);
//         }}>

//           <View style={newWorkout.container}>

//           <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 25}}>
           
//            </View>

//             <View style={newWorkout.headerBackground}>

//             <TouchableOpacity onPress={() => setOpenNewWorkoutPage(false)} >
//                 <Text style={newWorkout.returnText}>x</Text> 
//             </TouchableOpacity> 
//               <Text style={newWorkout.mainHeader}>Workout Creator</Text> 
//             </View>

//             <View style={newWorkout.subHeaderBackground}>
//               <Text style={newWorkout.header}>1. Name</Text> 
//             </View>

//            <View style={newWorkout.inputView}>
//             <TextInput
//               style={newWorkout.inputText}
//               placeholder="Workout Name"
//               placeholderTextColor="#ffffff"
//               onChangeText={(workoutName) => setWorkoutName(workoutName)}
//               keyboardAppearance="dark"
//             /> 
//           </View> 

          
//           <View style={newWorkout.subHeaderBackground}>
//               <Text style={newWorkout.header}>2. Describe </Text> 
//          </View>

//          <View style={newWorkout.inputView2}>
//             <TextInput
//               style={newWorkout.inputText1}
//               placeholder="Description"
//               placeholderTextColor="#ffffff"
//               fontSize={30}
//               maxLength={150}
//               onChangeText={(workoutDesc) => setWorkoutDesc(workoutDesc)}
//               keyboardAppearance="dark"
//             /> 
//          </View>
     
           


//          <View style={newWorkout.subHeaderBackground}>
//               <Text style={newWorkout.header}>3. Set Breaks</Text> 
//          </View>

//          <Text style={newWorkout.breakDesc}>  Select the time, in seconds, to rest between sets</Text> 


//          <ScrollView horizontal={true} style={{marginTop: 4}}>
//           <TouchableOpacity style={but5} onPress={() => recieveBreakTimes(1)}>
//                 <Text style={newWorkout.breakText}>5</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but10} onPress={() => recieveBreakTimes(2)}>
//                 <Text style={newWorkout.breakText}>10</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but15} onPress={() => recieveBreakTimes(3)}>
//                 <Text style={newWorkout.breakText}>15</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but20} onPress={() => recieveBreakTimes(4)}>
//                 <Text style={newWorkout.breakText}>20</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but25} onPress={() => recieveBreakTimes(5)}>
//                 <Text style={newWorkout.breakText}>25</Text> 
//             </TouchableOpacity>
//             <TouchableOpacity style={but30} onPress={() => recieveBreakTimes(6)}>
//                 <Text style={newWorkout.breakText}>30</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but35} onPress={() => recieveBreakTimes(7)}>
//                 <Text style={newWorkout.breakText}>35</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but40} onPress={() => recieveBreakTimes(8)}>
//                 <Text style={newWorkout.breakText}>40</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but45} onPress={() => recieveBreakTimes(9)}>
//                 <Text style={newWorkout.breakText}>45</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but50} onPress={() => recieveBreakTimes(10)}>
//                 <Text style={newWorkout.breakText}>50</Text> 
//             </TouchableOpacity>  
//             <TouchableOpacity style={but55} onPress={() => recieveBreakTimes(11)}>
//                 <Text style={newWorkout.breakText}>55</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but60} onPress={() => recieveBreakTimes(12)}>
//                 <Text style={newWorkout.breakText}>60</Text> 
//             </TouchableOpacity>  
//          </ScrollView>
     
//          <View style={newWorkout.subHeaderBackground}>
//               <Text style={newWorkout.header}>4. Finish</Text> 
//          </View>

//          <TouchableOpacity style={newWorkout.submitButton} onPress={createWorkout}>
//               <Text style={newWorkout.submitText}>Create</Text> 
//           </TouchableOpacity>  


//           </View>
        
//         </Modal>

//         <Modal
//         animationType="fade"
//         visible={openSpecWorkout}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setOpenNewWorkoutPage(!openNewWorkoutPage);
//         }}>
//           <View style={specWorkout.container}>
         
//           <View style={{flexDirection: 'row', marginTop: 50}}>           
//             <TouchableOpacity style={{marginTop: 0, marginRight: 25}} onPress={() => setOpenSpecWorkout(false)} >
//                   <Text style={newWorkout.returnText}>x</Text> 
//             </TouchableOpacity>        
//             <Text style={specWorkout.title}>Impulse</Text> 
//           </View>

//           <Divider borderColor="#a3a3bf" color="#a3a3bf" orientation="center">
//           Workout
//           </Divider>

//           <View marginTop={50}>
//               <Text style={specWorkout.header}>Current Exercise: {nameConfigs[currStep]}</Text> 

//           </View>
            
//           <View marginTop={40} >
//             <CountdownCircleTimer
//               key={currStep}
//               isPlaying
//               duration={timeConfigs[currStep]}
//               colors={['#004777','#F7B801', '#A30000', '#A30000 ']}   
//               colorsTime={[timeConfigs[currStep], timeConfigs[currStep]/2, timeConfigs[currStep]/3, 0]}
//               onComplete={() => setCurrStep(currStep+1)} 
//               updateInterval={1}>
//               {({remainingTime, color}) => (
//                 <Text style={{color, fontSize: 40}}>{remainingTime}</Text>
//               )}   
//             </CountdownCircleTimer>
//           </View>

//           <View>
//               <Text style={specWorkout.header}>Next Exercise: {nextNameConfigs[currStep]}</Text> 

//           </View>
//         </View>
           
//         </Modal>

//         <Modal 
//         animationType="fade"
//         visible={openEditWorkoutPage}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setOpenNewWorkoutPage(!openNewWorkoutPage);
//         }}>
//         <View style={editWorkouts.container}>

//         <View flexDirection={"row"}>
//             <TouchableOpacity style={{marginTop: 35, marginLeft: 15}} onPress={() => {
//               recieveBreakTimes(0)
//               setOpenEditWorkoutPage(false)
              
//               } 
//             }>
//                   <Text style={newWorkout.returnText}>x</Text> 
//           </TouchableOpacity> 
//           <Text style={editWorkouts.mainHeader}>Edit Workout</Text> 

//         </View>

//         <Divider borderColor="#a3a3bf" color="#a3a3bf" orientation="center">
//           Name & Description
//         </Divider>

//         <Text style={editWorkouts.name} >{selName}</Text>

//         <Text style={editWorkouts.desc}>{selDesc}</Text>

       
       
//         <Divider borderColor="#a3a3bf" color="#a3a3bf" orientation="center">
//           Break Times
//         </Divider>

//         <ScrollView horizontal={true} style={{marginLeft: 7}}>
//           <TouchableOpacity style={but5} onPress={() => recieveBreakTimes(1)}>
//                 <Text style={newWorkout.breakText}>5</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but10} onPress={() => recieveBreakTimes(2)}>
//                 <Text style={newWorkout.breakText}>10</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but15} onPress={() => recieveBreakTimes(3)}>
//                 <Text style={newWorkout.breakText}>15</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but20} onPress={() => recieveBreakTimes(4)}>
//                 <Text style={newWorkout.breakText}>20</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but25} onPress={() => recieveBreakTimes(5)}>
//                 <Text style={newWorkout.breakText}>25</Text> 
//             </TouchableOpacity>
//             <TouchableOpacity style={but30} onPress={() => recieveBreakTimes(6)}>
//                 <Text style={newWorkout.breakText}>30</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but35} onPress={() => recieveBreakTimes(7)}>
//                 <Text style={newWorkout.breakText}>35</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but40} onPress={() => recieveBreakTimes(8)}>
//                 <Text style={newWorkout.breakText}>40</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but45} onPress={() => recieveBreakTimes(9)}>
//                 <Text style={newWorkout.breakText}>45</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but50} onPress={() => recieveBreakTimes(10)}>
//                 <Text style={newWorkout.breakText}>50</Text> 
//             </TouchableOpacity>  
//             <TouchableOpacity style={but55} onPress={() => recieveBreakTimes(11)}>
//                 <Text style={newWorkout.breakText}>55</Text> 
//             </TouchableOpacity> 
//             <TouchableOpacity style={but60} onPress={() => recieveBreakTimes(12)}>
//                 <Text style={newWorkout.breakText}>60</Text> 
//             </TouchableOpacity>  
//         </ScrollView>

// <Divider marginTop={10} borderColor="#a3a3bf" color="#a3a3bf" orientation="center">
//           Exercises
//         </Divider>

//         </View>
         

        

//         <ScrollView style={mainScrollView.scrollContainer1} showsVerticalScrollIndicator={false}>
//         <View style={mainScrollView.scrollContainer2}>
//           {selExercises.map((info, index) => (
//             <View key={index} style={mainScrollView.cardComp}>
//               <View style={mainScrollView.cardTextView}>
//                 <Text style={mainScrollView.cardText1}> {info.name} </Text>
//               </View>
//               <View style={styles.buttonView}>
//                 <TouchableOpacity
//                   style={[mainScrollView.cardInfoBtn]}
//                   onPress={() => deleteExercise(info.name)}
//                 >
//                   <Icon
//                       style={{ alignContent: "end" }}
//                       color="#FF0000"
//                       name="delete"
//                       type="material"
//                       size="20"
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[mainScrollView.cardInfoBtn]}
//                   onPress={() => editExercises(info.name)}
//                 >
//                   <Icon
//                     style={{ alignContent: "end" }}
//                     color="#c8c5db"
//                     name="menu"
//                     type="material"
//                     size="20"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
        

//       <View backgroundColor={"#404057"}>
//         <TouchableOpacity style={editWorkouts.submitButton} onPress={submitWorkoutChanges}>
//               <Text style={editWorkouts.submitText}>Save</Text> 
//           </TouchableOpacity>
//       </View>
      

//       <Modal
//           animationType="fade"
//           transparent={true}
//           visible={modalAddVisible}
//           onRequestClose={
//             () => {Alert.alert('Modal has been closed.'); setModalAddVisible(!modalAddVisible); }
//             }>
//           <BlurView intensity={65} tint="dark" style={modalAddStyles.modalContainer}>
//             <View style={modalAddStyles.modalView}>
//               <View style={modalAddStyles.titleView1}>
//                 <View style={modalAddStyles.titleView2}>
//                   <Text style={modalAddStyles.titleText}>Exercise Settings</Text>
//                 </View>
//                 <Icon
//                   onPress={() => setModalAddVisible(!modalAddVisible)}
//                   style={modalAddStyles.closeButton}
//                   color="#8a7ed9"
//                   name="close-box-outline"
//                   type="material-community"
//                   size="40"
//                 />
//               </View>
//               <View style={modalAddStyles.dividerView}>
//                 <Divider borderColor="#8a7ed9" color="#e2deff" orientation="center">Time On</Divider>
//               </View>
//               <View style={modalAddStyles.scrollContainer1}>
//                 <ScrollView horizontal={true} style={modalAddStyles.scrollContainer2} showsHorizontalScrollIndicator={false}>
//                   <View style={modalAddStyles.scrollContainer3}> 
//                     {timeArr.map((info, index) => (
//                       <TouchableOpacity
//                         key={index} style={settingStyleArr3[index]} onPress={() => {selectSetting(3, index)}}>
//                         <Text style={modalAddStyles.timeButtonText}>{info}</Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </ScrollView>
//               </View> 
//               <View style={modalAddStyles.dividerView}>
//                 <Divider borderColor="#8a7ed9" color="#e2deff" orientation="center">Number of Sets</Divider>
//               </View>
//               <View style={modalAddStyles.scrollContainer1}>
//                 <ScrollView horizontal={true} style={modalAddStyles.scrollContainer2} showsHorizontalScrollIndicator={false}>
//                   <View style={modalAddStyles.scrollContainer3}> 
//                     {setNumArr.map((info, index) => (
//                       <TouchableOpacity key={index} style={settingStyleArr1[index]} onPress={() => {selectSetting(1, index)}}>
//                         <Text style={modalAddStyles.timeButtonText}>{info}</Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </ScrollView>
//               </View>
//               <View style={modalAddStyles.dividerView}>
//                 <Divider borderColor="#8a7ed9" color="#e2deff" orientation="center">Rest Per Set</Divider>
//               </View>
//               <View style={modalAddStyles.scrollContainer1}>
//                 <ScrollView horizontal={true} style={modalAddStyles.scrollContainer2} showsHorizontalScrollIndicator={false}>
//                   <View style={modalAddStyles.scrollContainer3}> 
//                     {timeArr.map((info, index) => (
//                       <TouchableOpacity
//                         key={index} style={settingStyleArr2[index]} onPress={() => {selectSetting(2, index)}}>
//                         <Text style={modalAddStyles.timeButtonText}>{info}</Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </ScrollView>
//               </View> 

//               <TouchableOpacity style={modalAddStyles.saveButton} onPress={() => submitExerciseChanges()}>
//                 <Text style={modalAddStyles.saveText}>SAVE</Text>
//               </TouchableOpacity>
//             </View>
//           </BlurView>

//         </Modal>
//         </Modal>
//     </View>
   
//   )
// }

// const styles = StyleSheet.create({

//   mainContainer:{
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: '#0d0d12',
//   },
  
//   playlist: {
//     backgroundColor: "#7ab3d6",
//     borderRadius: 5,
//     borderWidth: 3,
//     alignItems: "center",
//     width: "90%",
//     height: "30%"
//   },
//   playlistText: {
//     fontSize: 17,
//     marginTop: 10,
//     marginHorizontal: 10,
//   },

//   //————————————————————————————————————————————————————————————————
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: '#adc9db',
//   },
  
//   button1: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//     marginTop: 5,
//   },
//   button2: {
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: 10,
//     marginTop: 5,
//     marginHorizontal: 5,
//     borderRadius: 5,
//   },
// //————————————————————————————————————————————————————————————————
//   searchView: {
//     // width: "100%",
//     height: 45,
//     marginBottom: 20,
//     alignItems: "center",
//     flexDirection: "row",
//     marginTop: 20,
//   },
//   searchInput: {
//     backgroundColor: "#578bab",
//     borderRadius: 20,
//     maxWidth: "50%", 
//     marginRight: 5,
//     height: 50,
//     flex: 1,
//     padding: 10,
//     marginLeft: 5,
//     bordercolor: "black",
//     borderWidth: 3,
//   },
//   searchButton: {
//     backgroundColor: "white",
//     padding: 10,
//     bordercolor: "black",
//     borderRadius: 5,
//     bordercolor: "black",
//     borderWidth: 3,
//     marginRight: 5,
//   },
// //————————————————————————————————————————————————————————————————
//   workoutCard: {
//     marginTop: 10,
//     width: "90%",
//     backgroundColor: "white",
//     bordercolor: "black",
//     borderWidth: 2,
//     borderRadius: 5,
//     justifyContent: "center",
//     alignContent: "center",

//   }, 
//   buttonView: {
//     flexDirection: "row",
//     marginRight: 300,
//     marginTop: 10
//   },
//   cardButton: {
//     backgroundColor: "lightblue",
//     padding: 5,
//     width: "30%",
//     borderRadius: 5,
//     margin: 10,
//     height: 35,
//     alignContent: "center",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalButton: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
// //————————————————————————————————————————————————————————————————

//   playingSpace: {
//     backgroundColor: 'white',
//     borderColor: 'blue',
//     borderWidth: 3,
//   },
//   paragraph: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     padding: 20
//     },

//     centeredView: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 22,
//     },
//     modalView: {
//       margin: 20,
//       backgroundColor: 'white',
//       borderRadius: 20,
//       padding: 35,
//       alignItems: 'center',
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 4,
//       elevation: 5,
//     },
//     button: {
//       borderRadius: 20,
//       padding: 10,
//       elevation: 2,
//     },
//     textStyle: {
//       color: 'white',
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//     modalText: {
//       marginBottom: 15,
//       textAlign: 'center',
//     },
//     scrollStyle: {
//       marginTop: 10,
//       flex: 1,
//       // backgroundColor: "cyan",
//       maxHeight: 495,
//     }


// })

// const mainScrollView = StyleSheet.create({
//   scrollContainer1: {
//     width: "100%",
//     // marginBottom: 70,
    
//     backgroundColor: "#404057",
//     height: "50%",
//     maxHeight: "50%",

//   },
//   scrollContainer2: {
//     alignItems: "center",
//     width: "100%",
//     // backgroundColor: "red",
//     paddingBottom: 10,
//   },
//   cardComp: {
//     flexDirection: "row",
//     width: "97%",
//     backgroundColor: "#282838",
//     height: 70,
//     borderWidth: 0,
//     borderRadius: 7,
//     marginBottom: 5.5,
//     alignItems: "center",
    
//   },
//   cardTextView: {
//     marginLeft: 10,
//     width: "85%",
//   },
//   cardText1: {
//     color: "#e0e0e0",
//     fontSize: 16,
//   },
//   cardText2: {
//     color: "#a8a8a8",
//     fontSize: 15,
//     fontWeight: "300",
//   },
//   cardInfoBtn: {
//     height: 30,
//     // backgroundColor: "darkblue",
//     justifyContent: "flex-end",
//     alignSelf: "flex-end",
//   },
// })

// const backgroundStyle = StyleSheet.create({

//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: '#0d0d12',
//   },

//   plusButton: {
//       position: 'absolute',
//       right: 10,
//       bottom: 10,
//       // marginTop: 585,
//       // marginLeft: 287,
//       borderRadius:7,
//       paddingHorizontal: 10,
//       backgroundColor: '#8e8efa',
//       shadowColor: 'rgba(227, 227, 255, 0.2)',
//       shadowOpacity: 0.8,
//       elevation: 6,
//       shadowRadius: 15,
//       borderRadius: 100,
//       margin: 5,
//       shadowOffset : { width: 1, height: 13},
//       width: 50,
//       height: 50
//   },

//   plusText: {
//     fontWeight: "900",
//     fontSize: 40,
//     fontStyle: 'italic',
//     color: '#ffffff',
//   },


//   titleText: {
//     color: "#8e8efa",
//     fontWeight: "500",
//     fontSize: 27,
//     alignSelf: "left",
//     marginTop: 28,
//     marginBottom: 5,
//     marginLeft: 10
//   },

//   timeText: {
//     color: "#404057",
//     fontWeight: "500",
//     fontSize: 17,
//     marginBottom: 25,

//     alignSelf: "left",
//     marginLeft: 15,

    
//   },

//   cardView: {
//     flex: 1,
//   },

//   breakView: {
//     height: 100,
//     width: 100
//   },

//   //————————————————————————————————————————————————————————————————
//   loginBtn: {
//     width: "40%",
//     borderRadius: 25,
//     marginRight: 35,
//     height: 40,
//     borderRadius: 30,
//     borderWidth: 3,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#DDDDDD",
//   },

//   //————————————————————————————————————————————————————————————————

//   playlist: {
//     backgroundColor: "#7ab3d6",
//     borderRadius: 5,
//     borderWidth: 3,
//     alignItems: "center",
//     width: 350,
//     height: 250,
//     marginBottom: 155
//   },
//   playlistText: {
//     fontSize: 20,
//     marginTop: 10,
//     marginHorizontal: 10,
//   },
//   playlistText1: {
//     fontSize: 17,
//     marginTop: 80,
//     marginHorizontal: 10,
//   },

//   //————————————————————————————————————————————————————————————————

//    exerciseWrap: {
//     backgroundColor: "#618fab",
//     borderRadius: 5,
//     borderWidth: 3,
//     alignItems: "center",
//     marginTop: 40,
//     width: 260,
//     height: 90,
//   },

//     //————————————————————————————————————————————————————————————————

//   buttons: {
//     flexDirection: "row"
//   },
//   button1: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//     marginTop: 140,
//     marginBottom: 20,
//     borderRadius: 20,
//   },
//   button2: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//     marginTop: 140,
//     marginBottom: 20,    
//   },

//     //————————————————————————————————————————————————————————————————

//     workoutLbl: {
//       alignItems: 'center',
//       marginLeft: 125,
//       marginBottom: 20,
//     }
   
//     //————————————————————————————————————————————————————————————————


// });

// const newWorkout = StyleSheet.create({
//   container: {
//     backgroundColor: '#000000',
//     height: '100%'
//   }, 

//   returnText: {
//     fontWeight: "600",
//     fontSize: 35,
//     color: "#FF0101",
//     alignSelf: "left",
//     marginLeft: 15,
//     marginRight: 5

//   },

//   mainHeader: {
//     fontWeight: "600",
//     fontSize: 38,
//     color: "#ffffff",
//     alignSelf: "left",
//     marginLeft:4
//   },

//   header: {
//     fontWeight: "600",
//     fontSize: 38,
//     color: "#ffffff",
//     alignSelf: "left",
//     marginLeft: 20
//   },

//   breakButton: {
//     borderRadius:9,
//     borderWidth: 2,
//     borderColor: '#404057',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     backgroundColor: '#000000',
//     elevation: 6,
//     margin: 5,
//     height: 40,
  
//   },

//   breakButtonClicked: {
//     borderRadius:9,
//     borderWidth: 2,
//     borderColor: '#404057',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     backgroundColor: '#8e8efa',
//     elevation: 6,
//     margin: 5,
//     height: 40,
//   },

//   breakText: {
//     fontWeight: "600",
//     fontSize: 15,
//     color: "#ffffff"
//   },

//   breakDesc: {
//     fontWeight: "400",
//     fontSize: 15,
//     fontStyle:'italic',
//     paddingLeft: 4,
//     marginTop: 8,
//     backgroundColor: '#404057',
//     marginTop: 15
//   },

//   submitButton: {
//     borderRadius:9,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     width: 150,
//     marginLeft: 110,
//     marginBottom: 55.5 ,
//     marginTop:20,
//     backgroundColor: '#8e8efa',
//     shadowColor: 'rgba(227, 227, 255, 0.2)',
//     shadowOpacity: 0.8,
//     elevation: 6,
//     shadowRadius: 15,
//     shadowOffset : { width: 1, height: 13},
//   },

//   headerBackground: {
//     fontWeight: "600",
//     backgroundColor: "#404057",
//     alignSelf: "left",
//     marginTop: 45,
//     width: '100%',
//     flexDirection: 'row'
//   },

//   subHeaderBackground: {
//     fontWeight: "600",
//     backgroundColor: "#404057",
//     alignSelf: "left",
//     marginTop: 25,
//     width: '100%'

//   },

//   inputView: {
//     borderColor: "#404057",
//     borderWidth: 4,
//     borderRadius: 5,
//     height: 55,
//     width: 340,
//     marginTop: 25,
//     marginLeft: 17,
//     alignItems: "center",
//   },

//   inputView2: {
//     borderColor: "#404057",
//     borderWidth: 4,
//     borderRadius: 5,
//     height: 125,
//     width: 340,
//     marginTop: 25,
//     marginLeft: 17,
//     alignItems: "center",
//   },

//   inputText: {
//     height: 50,
//     width: "100%",
//     flex: 1,
//     fontSize: 25,
//     fontStyle: 'italic',
//     paddingLeft: 15,
//     color: "#ffffff",
//   },
//   inputText1: {
//     width: "100%",
//     flex: 1,
//     fontStyle: 'italic',
//     paddingLeft: 15,
//     paddingTop: 10,
//     paddingRight: 15,
//     color: "#ffffff",
//   },
  
//   submitText: {
//     fontWeight: "700",
//     fontSize: 22,
//     marginLeft: 22,
//     color: "#ffffff",
//   },
// })

// const cardStyle = StyleSheet.create({

//   container: {
//     backgroundColor: '#0d0d12',
//     // marginTop: 50,
//     height: '85%',
//     width: 255,
//     marginLeft: 5,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#404057',
//     borderBottomWidth:5,
//     borderBottomColor: '#FF0055',
//     elevation: 6,
 

//   },

//   image: {
//       position: 'absolute'
//   },

//   titleText: {
//       color: "#ffffff",
//       fontWeight: "500",
//       fontSize: 25,
//       maxWidth: 170,
//       alignSelf: "left",
//       marginTop: 12,
//       marginLeft: 12,
//       marginRight: 5
//   },

//   subText: {
//       color: "#ffffff",
//       marginTop: 10,
//       marginLeft: 12,
//       marginRight: 5,
//       fontSize: 15,
//   },

//   arrowText: {
//       color: "#8e8efa",
//       fontSize: 22,
//       fontWeight: '300%',
//       fontStyle: 'italic',
//       marginTop: 115,
//       marginLeft: 127,
//       marginRight: 30,
//   }

// })

// const specWorkout = StyleSheet.create({

//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: '#0d0d12',
//   },
  
//   title: {
//     fontSize: 62,
//     fontWeight: '900%',
//     color: "#8e8efa",
//     marginRight: 55,
//     marginTop: 10
//   }, 

//   header: {
//     fontSize: 22,
//     fontWeight: '900%',
//     color: "#ffffff",
//     marginTop: 40,
//   }

// })

// const editWorkouts = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#404057',
//   },
//   mainHeader: {
//     fontWeight: "600",
//     fontSize: 38,
//     color: "#ffffff",
//     alignSelf: "left",
//     marginLeft:22,
//     marginTop: 47
//   },
//   name: {
//     fontSize: 39,
//     marginLeft: 10,
//     color: '#A5A2A2'
//   },
//   desc: {
//     fontSize: 25,
//     marginLeft: 10,
//     color: '#A5A2A2'
//   },
//   submitText: {
//     fontWeight: "700",
//     fontSize: 22,
//     marginLeft: 34,
//     color: "#ffffff",
//   },
//   inputText: {
//     height: 50,
//     width: "100%",
//     flex: 1,
//     fontSize: 15,
//     fontStyle: 'italic',
//     paddingLeft: 15,
//     color: "#000000",
//   },
//   inputView: {
//     borderColor: "#000000",
//     borderWidth: 2,
//     borderRadius: 5,
//     height: 35,
//     width: 340,
//     marginTop: 25,
//     marginLeft: 17,
//     alignItems: "center",
//   },

//   inputView2: {
//     borderColor: "#000000",
//     borderWidth: 2,
//     borderRadius: 5,
//     height: 75,
//     width: 340,
//     marginTop: 10,
//     marginLeft: 17,
//     alignItems: "center",
//   },

//   submitButton: {
//     borderRadius:9,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     width: 150,
//     marginLeft: 110,
//     marginBottom: 15,
//     marginTop:10,
//     backgroundColor: '#8e8efa',
//     shadowColor: 'rgba(227, 227, 255, 0.2)',
//     shadowOpacity: 0.8,
//     elevation: 6,
//     shadowRadius: 15,
//     shadowOffset : { width: 1, height: 13},
//   },

// })

// const modalAddStyles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalView: {
//     alignItems: 'center',
//     height: "54%",
//     width: "70%",
//     backgroundColor: "#404057",//'#404057', //0d0d12 //26, 26, 41
//     borderRadius: 15,
//     borderWidth: 2,
//     borderColor: "#8a7ed9",
//   },
//   titleView1: {
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 7,
//   },
//   titleView2: {
//     width: 190,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   titleText: {
//     color: "#e2deff",
//     fontSize: 20,
//     fontWeight: "300",
//     letterSpacing: 1.5,
//   },
//   closeButton: {
//     // marginTop: 7,
//     // marginRight: 7,
//     marginLeft: 20,
//   },

//   scrollContainer1: {
//     flex: 1,
//     maxHeight: 45,
//     width: "90%",
//     backgroundColor: "#2b2b40",
//     paddingHorizontal: 5,
//     borderRadius: 3,
//   },
//   scrollContainer2: {
//     maxHeight: 45,
//   },
//   scrollContainer3: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "red",
//     paddingHorizontal: 5,
//     borderRadius: 3,
//     backgroundColor: "#2b2b40",
//   },
   
 
//   timeButtonOff: {
//     width: 40,
//     height: 30,
//     borderRightWidth: 1,
//     borderLeftWidth: 1,
//     borderColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   timeButtonOn : {
//     width: 40,
//     height: 30,
//     borderRightWidth: 1,
//     borderLeftWidth: 1,
//     borderColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#67678f",
//   },
//   timeButtonText: {
//     color: "white",
//     fontSize: 20,
//     fontWeight: "300",
//   },
//     dividerView: {
//     width: "92%",
//     marginVertical: 10,
//   },

//   saveButton: {
//     borderRadius: 5,
//     borderWidth: 3,
//     borderColor: "#8a7ed9",
//     backgroundColor: "#67678f",
//     marginTop: 22,
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//   },
//   saveText: {
//     letterSpacing: 2,
//     fontSize: 23,
//     fontWeight: "300",
//     color: "#f1f0fc",
//   },
// })

// const homeScrollMain = StyleSheet.create({
//   container: {
  
//     height: 380,
//     marginTop: 10,
//     marginBottom: 30,
   
//   },

//   friendName: {
//     color: '#404057',
//     fontWeight: '700',
//     position: 'absolute',
//     marginTop: 5,
//     marginLeft: 235,
//     maxWidth: 100,
//   },

  

//   scrollContainer: {
//       margin: 10,
//       // backgroundColor: "grey",
//     },

//     scrollContainer1: {
//       height: 200,
//       // backgroundColor: "red",
//     },
//   scrollContainer2: {
//     // minHeight: 200,
//   },
//   scrollContainer3: {
//     // height: 300,
//   },
//   banner: {
//       alignSelf: 'center',
//       height: 140,
//       width: 310,
//       borderRadius: 10,
//       shadowColor: '#000000',
//       shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//       shadowOpacity: 0.25,
//       shadowRadius: 4,
//       elevation: 5,
//     },
//     titleText: {
//       position:'absolute',
//       color: "#00B592",
//       paddingLeft: 5,
//       paddingRight: 5,

//       backgroundColor:' rgba(0, 0, 0, 0.5)',
//       fontWeight: "700",
//       fontSize: 24,
//       alignSelf: "left",
//       left: 0,
//       marginTop: 111

//     },
//     titleText1: {
//       position:'absolute',
//       color: "#FFA200",
//       fontWeight: "700",
//       fontSize: 24,
//       paddingLeft: 5,
//       paddingRight: 5,
//       alignSelf: "left",
//       backgroundColor:' rgba(0, 0, 0, 0.5)',
//       left: 0,
//       marginTop: 111

//     },

//     titleText2: {
//       position:'absolute',
//       color: "#ACA975",
//       fontWeight: "700",
//       fontSize: 20,
//       alignSelf: "left",
//       left: 10,
//       marginTop: 100

//     },

//     workoutCard1: {
//       marginTop:10, 
//       marginLeft:4,
//       height: 55,
//       width: 300,
//       backgroundColor: "#0d0d12",
//       borderRadius: 4,
//       borderWidth: 2,
//       borderColor: "#404057",
//       borderBottomWidth: 5,
//       borderBottomColor: "#00B592",
//     },

//     workoutCard: {
//       marginTop:10, 
//       marginLeft:4,
//       height: 55,
//       width: 300,
//       backgroundColor: "#0d0d12",
//       borderRadius: 4,
//       borderWidth: 2,
//       borderColor: "#404057",
//       borderBottomWidth: 5,
//       borderBottomColor: "#FFA200",  
//     },
// })
