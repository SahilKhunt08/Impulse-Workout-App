//Pass States from parent to child
//Create child states that equal parent states in child
//Pass linked functions to child
//Use linked functions to manipulate states in parent


import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Modal, Pressable, ScrollView, Image} from 'react-native';
import { Button } from 'react-native-paper';
import axios from "axios";
import { Card } from 'react-native-paper';
import { auth } from './firebase';
import {db} from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, query} from "firebase/firestore"; 
import { Icon } from '@rneui/themed';
import FlipCard from 'react-native-flip-card'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { makeStyles } from "@rneui/base";
import { isEmpty } from "@firebase/util";
<<<<<<< HEAD

const Stack = createNativeStackNavigator();


export default function Workout () {
=======
import Divider from 'react-native-divider';
import { BlurView } from 'expo-blur';

var modalMusclePath1 = require("./muscleImages/default1.png");
var modalMusclePath2 = require("./muscleImages/default2.png");

export default function Workout({ navigation }) {
  const [counter, setCount] = useState(3);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const [exerciseArr, setExerciseArr] = useState([]) // {id: "0", equipment: 'equipment1', muscle: "muscle1"}
  const [modalIndex, setModalIndex] = useState(0);
  const [fixModalIndex, setFixModalIndex] = useState(true);
  const [workoutNameArr, setWorkoutNameArr] = useState([]);
  const [workoutSelected, setWorkoutSelected] = useState("");
  const [workoutBtnStyleArr, setWorkoutBtnStyleArr] = useState([]);
  const [searchBarText, setSearchBarText] = useState([]);
  const [modalAddVisible, setModalAddVisible] = useState(false);

  const [setting1, setSetting1] = useState(0);
  const [setting2, setSetting2] = useState(0);
  const [setting3, setSetting3] = useState(0);
  const [settingStyleArr1, setSettingStyleArr1] = useState([]);
  const [settingStyleArr2, setSettingStyleArr2] = useState([]);
  const [settingStyleArr3, setSettingStyleArr3] = useState([]);
  const setNumArr = [1, 2, 3, 4, 5, 6];
  const timeArr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  const auth = getAuth();
  const user = auth.currentUser;
  
//Filter PAGE
>>>>>>> 3a30e1f6196a8ead00ca3f64ac64abaddb005dc7

  const [filterModalVis, setfilterModalVis] = useState(false)
  const [styleBeginner, setStyleBeginner] = useState(newStyles.loginBtn);
  const [styleIntermediate, setStyleIntermediate] = useState(newStyles.loginBtn);
  const [styleExpert, setStyleExpert] = useState(newStyles.loginBtn);

  const [styleAbdom, setStyleAbdom] = useState(newStyles.loginBtn);
  const [styleAbduct, setStyleAbduct] = useState(newStyles.loginBtn);
  const [styleAdd, setStyleAdd] = useState(newStyles.loginBtn);
  const [styleBiceps, setStyleBiceps] = useState(newStyles.loginBtn);
  const [styleTriceps, setStyleTriceps] = useState(newStyles.loginBtn);
  const [styleLats, setStyleLats] = useState(newStyles.loginBtn);
  const [styleFore, setStyleFore] = useState(newStyles.loginBtn);
  const [styleTraps, setStyleTraps] = useState(newStyles.loginBtn);
  const [styleChest, setStyleChest] = useState(newStyles.loginBtn);
  const [styleNeck, setStyleNeck] = useState(newStyles.loginBtn);
  const [styleLowBack, setStyleLowBack] = useState(newStyles.loginBtn);
  const [styleMidBack, setStyleMidBack] = useState(newStyles.loginBtn);
  const [styleCalves, setStyleCalves] = useState(newStyles.loginBtn);
  const [styleGlutes, setStyleGlutes] = useState(newStyles.loginBtn);
  const [styleHams, setStyleHams] = useState(newStyles.loginBtn);
  const [styleQuads, setStyleQuads] = useState(newStyles.loginBtn);

  const [styleCardio, setStyleCardio] = useState(newStyles.loginBtn);
  const [styleOly, setStyleOly] = useState(newStyles.loginBtn);
  const [stylePlyo, setStylePlyo] = useState(newStyles.loginBtn);
  const [stylePower, setStylePower] = useState(newStyles.loginBtn);
  const [styleStrength, setStyleStrength] = useState(newStyles.loginBtn);
  const [styleStretch, setStyleStretch] = useState(newStyles.loginBtn);
  const [styleStrong, setStyleStrong] = useState(newStyles.loginBtn);

  const [difficulty, setDifficulty] = useState(""); 
  const [muscles, setMuscles] = useState("")
  const [type, setType] = useState("")
<<<<<<< HEAD
  

//make all these vedant styles
  const recieveButtonClicks = (input) => {

    if (input < 4) {
      setStyleBeginner(newStyles.loginBtn)
      setStyleIntermediate(newStyles.loginBtn)
      setStyleExpert(newStyles.loginBtn)
      if (input == 1) {
        if(styleBeginner == newStyles.loginBtn) {
          setStyleBeginner(newStyles.loginBtnClicked)
          setDifficulty("beginner")
        } else { 
          setStyleBeginner(newStyles.loginBtn)
          setDifficulty(null)
         }
      } else if (input == 2) {
        if(styleIntermediate == newStyles.loginBtn) {
          setStyleIntermediate(newStyles.loginBtnClicked)
          setDifficulty("intermediate")
        } else { 
          setStyleIntermediate(newStyles.loginBtn)
          setDifficulty(null)
        }
      } else if (input == 3) {
        if(styleExpert == newStyles.loginBtn) {
          setStyleExpert(newStyles.loginBtnClicked)
          setDifficulty("expert")
        } else { 
          setStyleExpert(newStyles.loginBtn)
          setDifficulty(null)
        }
      }
  
   } else if (input < 20) {
    setStyleAbdom(newStyles.loginBtn)
    setStyleAbduct(newStyles.loginBtn)
    setStyleAdd(newStyles.loginBtn)
    setStyleBiceps(newStyles.loginBtn)
    setStyleTriceps(newStyles.loginBtn)
    setStyleLats(newStyles.loginBtn)
    setStyleFore(newStyles.loginBtn)
    setStyleTraps(newStyles.loginBtn)
    setStyleChest(newStyles.loginBtn)
    setStyleNeck(newStyles.loginBtn)
    setStyleLowBack(newStyles.loginBtn)
    setStyleMidBack(newStyles.loginBtn)
    setStyleCalves(newStyles.loginBtn)
    setStyleGlutes(newStyles.loginBtn)
    setStyleHams(newStyles.loginBtn)
    setStyleQuads(newStyles.loginBtn)


      if (input == 4) { 
        if (styleAbdom == newStyles.loginBtn ) {
          setStyleAbdom(newStyles.loginBtnClicked)
          setMuscles("abdominals")
        } else {
          setMuscles(null)
          setStyleAbdom(newStyles.loginBtn)
        }
      } else if (input == 5) { 
        if (styleAbduct == newStyles.loginBtn) {
          setStyleAbduct(newStyles.loginBtnClicked)
          setMuscles("abductors")
        } else {
          setMuscles(null)
          setStyleAbduct(newStyles.loginBtn)
        }        
      } else if (input == 6) { 
        if (styleAdd == newStyles.loginBtn) {
          setStyleAdd(newStyles.loginBtnClicked)
          setMuscles("adductors")
        } else {
          setMuscles(null)
          setStyleAdd(newStyles.loginBtn)
        }   
      } else if (input == 7) { 
        if (styleBiceps == newStyles.loginBtn) {
          setStyleBiceps(newStyles.loginBtnClicked)
          setMuscles("biceps")
        } else {
          setMuscles(null)
          setStyleBiceps(newStyles.loginBtn)
        }  
      } else if (input == 8) { 
        if (styleTriceps == newStyles.loginBtn) {
          setStyleTriceps(newStyles.loginBtnClicked)
          setMuscles("triceps")
        } else {
          setMuscles(null)
          setStyleTriceps(newStyles.loginBtn)
        }
      } else if (input == 9) { 
        if (styleLats == newStyles.loginBtn) {
          setStyleLats(newStyles.loginBtnClicked)
          setMuscles("lats")
        } else {
          setMuscles(null)
          setStyleLats(newStyles.loginBtn)
        }
      } else if (input == 10) { 
        if (styleFore == newStyles.loginBtn) {
          setStyleFore(newStyles.loginBtnClicked)
          setMuscles("forearms")
        } else {
          setMuscles(null)
          setStyleFore(newStyles.loginBtn)
        }
      } else if (input == 11) { 
        if (styleTraps == newStyles.loginBtn) {
          setStyleTraps(newStyles.loginBtnClicked)
          setMuscles("traps")
        } else {
          setMuscles(null)
          setStyleTraps(newStyles.loginBtn)
        }
      } else if (input == 12) { 
        if (styleChest == newStyles.loginBtn) {
          setStyleChest(newStyles.loginBtnClicked)
          setMuscles("chest")
        } else {
          setMuscles(null)
          setStyleChest(newStyles.loginBtn)
        }
      } else if (input == 13) { 
        if (styleNeck == newStyles.loginBtn) {
          setStyleNeck(newStyles.loginBtnClicked)
          setMuscles("neck")
        } else {
          setMuscles(null)
          setStyleNeck(newStyles.loginBtn)
        }
      } else if (input == 14) { 
        if (styleLowBack == newStyles.loginBtn) {
          setStyleLowBack(newStyles.loginBtnClicked)
          setMuscles("lower_back")
        } else {
          setMuscles(null)
          setStyleLowBack(newStyles.loginBtn)
        }
      } else if (input == 15) { 
        if (styleMidBack == newStyles.loginBtn) {
          setStyleMidBack(newStyles.loginBtnClicked)
          setMuscles("middle_back")
        } else {
          setMuscles(null)
          setStyleMidBack(newStyles.loginBtn)
        }
      } else if (input == 16) { 
        if (styleCalves == newStyles.loginBtn) {
          setStyleCalves(newStyles.loginBtnClicked)
          setMuscles("calves")
        } else {
          setMuscles(null)
          setStyleCalves(newStyles.loginBtn)
        }
      } else if (input == 17) { 
        if (styleGlutes == newStyles.loginBtn) {
          setStyleGlutes(newStyles.loginBtnClicked)
          setMuscles("glutes")
        } else {
          setMuscles(null)
          setStyleGlutes(newStyles.loginBtn)
        }
      } else if (input == 18) { 
        if (styleHams == newStyles.loginBtn) {
          setStyleHams(newStyles.loginBtnClicked)
          setMuscles("hamstrings")
        } else {
          setMuscles(null)
          setStyleHams(newStyles.loginBtn)
        }
      } else if (input == 19) { 
        if (styleQuads == newStyles.loginBtn) {
          setStyleQuads(newStyles.loginBtnClicked)
          setMuscles("quadriceps")
        } else {
          setMuscles(null)
          setStyleQuads(newStyles.loginBtn)
        }
      }
    } else {
      setStyleCardio(newStyles.loginBtn)
      setStyleOly(newStyles.loginBtn)
      setStylePlyo(newStyles.loginBtn)
      setStylePower(newStyles.loginBtn)
      setStyleStrength(newStyles.loginBtn)
      setStyleStretch(newStyles.loginBtn)
      setStyleStrong(newStyles.loginBtn)
      if (input == 20) { 
        if (styleCardio == newStyles.loginBtn) {
          setStyleCardio(newStyles.loginBtnClicked)
          setType("cardio")
        } else {
          setStyleCardio(newStyles.loginBtn)
          setType(null)
        }
      } else if (input == 21) { 
        if (styleOly == newStyles.loginBtn) {
          setStyleOly(newStyles.loginBtnClicked)
          setType("olympic_weightlifting")
        } else {
          setStyleOly(newStyles.loginBtn)
          setType(null)
        }
      } else if (input == 22) { 
        if (stylePlyo == newStyles.loginBtn) {
          setStylePlyo(newStyles.loginBtnClicked)
          setType("plyometrics")
        } else {
          setStylePlyo(newStyles.loginBtn)
          setType(null)
        }
      } else if (input == 23) { 
        if (stylePower == newStyles.loginBtn) {
          setStylePower(newStyles.loginBtnClicked)
          setType("powerlifting")
        } else {
          setStylePower(newStyles.loginBtn)
          setType(null)
        }
      } else if (input == 24) { 
        if (styleStrength == newStyles.loginBtn) {
          setStyleStrength(newStyles.loginBtnClicked)
          setType("strength")
        } else {
          setStyleStrength(newStyles.loginBtn)
          setType(null)
        }
      } else if (input == 25) { 
        if (styleStretch == newStyles.loginBtn) {
          setStyleStretch(newStyles.loginBtnClicked)
          setType("stretching")

        } else {
          setStyleStretch(newStyles.loginBtn)
=======

  React.useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      loadWorkouts();
    });
    return listener;
  }, []);

  async function loadWorkouts() {
    const docRef = doc(db, "accounts", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      var tempArr1 = docSnap.data().workoutsArr;
      setWorkoutNameArr(tempArr1);
      setWorkoutSelected(tempArr1[0]);
      var tempArr2 = [buttonRowStyles.buttonOn];
      for(var i = 1; i < tempArr1.length; i++){
        tempArr2[i] = buttonRowStyles.buttonOff;
      }
      setWorkoutBtnStyleArr(tempArr2);
    } else {
      console.log("loadWorkouts function error");
    }
  }

  const recieveButtonClicks = (input) => {

    if (input < 4) {
      setStyleBeginner(vedantStyles.loginBtn)
      setStyleIntermediate(vedantStyles.loginBtn)
      setStyleExpert(vedantStyles.loginBtn)
      if (input == 1) {
        if(styleBeginner == vedantStyles.loginBtn) {
          setStyleBeginner(vedantStyles.loginBtnClicked)
          setDifficulty("beginner")
        } else { 
          setStyleBeginner(vedantStyles.loginBtn)
          setDifficulty(null)
         }
      } else if (input == 2) {
        if(styleIntermediate == vedantStyles.loginBtn) {
          setStyleIntermediate(vedantStyles.loginBtnClicked)
          setDifficulty("intermediate")
        } else { 
          setStyleIntermediate(vedantStyles.loginBtn)
          setDifficulty(null)
        }
      } else if (input == 3) {
        if(styleExpert == vedantStyles.loginBtn) {
          setStyleExpert(vedantStyles.loginBtnClicked)
          setDifficulty("expert")
        } else { 
          setStyleExpert(vedantStyles.loginBtn)
          setDifficulty(null)
        }
      }
    

   } else if (input < 20) {
    setStyleAbdom(vedantStyles.loginBtn)
    setStyleAbduct(vedantStyles.loginBtn)
    setStyleAdd(vedantStyles.loginBtn)
    setStyleBiceps(vedantStyles.loginBtn)
    setStyleTriceps(vedantStyles.loginBtn)
    setStyleLats(vedantStyles.loginBtn)
    setStyleFore(vedantStyles.loginBtn)
    setStyleTraps(vedantStyles.loginBtn)
    setStyleChest(vedantStyles.loginBtn)
    setStyleNeck(vedantStyles.loginBtn)
    setStyleLowBack(vedantStyles.loginBtn)
    setStyleMidBack(vedantStyles.loginBtn)
    setStyleCalves(vedantStyles.loginBtn)
    setStyleGlutes(vedantStyles.loginBtn)
    setStyleHams(vedantStyles.loginBtn)
    setStyleQuads(vedantStyles.loginBtn)

      if (input == 4) { 
        if (styleAbdom == vedantStyles.loginBtn ) {
          setStyleAbdom(vedantStyles.loginBtnClicked)
          setMuscles("abdominals")
        } else {
          setMuscles(null)
          setStyleAbdom(vedantStyles.loginBtn)
        }
      } else if (input == 5) { 
        if (styleAbduct == vedantStyles.loginBtn) {
          setStyleAbduct(vedantStyles.loginBtnClicked)
          setMuscles("abductors")
        } else {
          setMuscles(null)
          setStyleAbduct(vedantStyles.loginBtn)
        }        
      } else if (input == 6) { 
        if (styleAdd == vedantStyles.loginBtn) {
          setStyleAdd(vedantStyles.loginBtnClicked)
          setMuscles("adductors")
        } else {
          setMuscles(null)
          setStyleAdd(vedantStyles.loginBtn)
        }   
      } else if (input == 7) { 
        if (styleBiceps == vedantStyles.loginBtn) {
          setStyleBiceps(vedantStyles.loginBtnClicked)
          setMuscles("biceps")
        } else {
          setMuscles(null)
          setStyleBiceps(vedantStyles.loginBtn)
        }  
      } else if (input == 8) { 
        if (styleTriceps == vedantStyles.loginBtn) {
          setStyleTriceps(vedantStyles.loginBtnClicked)
          setMuscles("triceps")
        } else {
          setMuscles(null)
          setStyleTriceps(vedantStyles.loginBtn)
        }
      } else if (input == 9) { 
        if (styleLats == vedantStyles.loginBtn) {
          setStyleLats(vedantStyles.loginBtnClicked)
          setMuscles("lats")
        } else {
          setMuscles(null)
          setStyleLats(vedantStyles.loginBtn)
        }
      } else if (input == 10) { 
        if (styleFore == vedantStyles.loginBtn) {
          setStyleFore(vedantStyles.loginBtnClicked)
          setMuscles("forearms")
        } else {
          setMuscles(null)
          setStyleFore(vedantStyles.loginBtn)
        }
      } else if (input == 11) { 
        if (styleTraps == vedantStyles.loginBtn) {
          setStyleTraps(vedantStyles.loginBtnClicked)
          setMuscles("traps")
        } else {
          setMuscles(null)
          setStyleTraps(vedantStyles.loginBtn)
        }
      } else if (input == 12) { 
        if (styleChest == vedantStyles.loginBtn) {
          setStyleChest(vedantStyles.loginBtnClicked)
          setMuscles("chest")
        } else {
          setMuscles(null)
          setStyleChest(vedantStyles.loginBtn)
        }
      } else if (input == 13) { 
        if (styleNeck == vedantStyles.loginBtn) {
          setStyleNeck(vedantStyles.loginBtnClicked)
          setMuscles("neck")
        } else {
          setMuscles(null)
          setStyleNeck(vedantStyles.loginBtn)
        }
      } else if (input == 14) { 
        if (styleLowBack == vedantStyles.loginBtn) {
          setStyleLowBack(vedantStyles.loginBtnClicked)
          setMuscles("lower_back")
        } else {
          setMuscles(null)
          setStyleLowBack(vedantStyles.loginBtn)
        }
      } else if (input == 15) { 
        if (styleMidBack == vedantStyles.loginBtn) {
          setStyleMidBack(vedantStyles.loginBtnClicked)
          setMuscles("middle_back")
        } else {
          setMuscles(null)
          setStyleMidBack(vedantStyles.loginBtn)
        }
      } else if (input == 16) { 
        if (styleCalves == vedantStyles.loginBtn) {
          setStyleCalves(vedantStyles.loginBtnClicked)
          setMuscles("calves")
        } else {
          setMuscles(null)
          setStyleCalves(vedantStyles.loginBtn)
        }
      } else if (input == 17) { 
        if (styleGlutes == vedantStyles.loginBtn) {
          setStyleGlutes(vedantStyles.loginBtnClicked)
          setMuscles("glutes")
        } else {
          setMuscles(null)
          setStyleGlutes(vedantStyles.loginBtn)
        }
      } else if (input == 18) { 
        if (styleHams == vedantStyles.loginBtn) {
          setStyleHams(vedantStyles.loginBtnClicked)
          setMuscles("hamstrings")
        } else {
          setMuscles(null)
          setStyleHams(vedantStyles.loginBtn)
        }
      } else if (input == 19) { 
        if (styleQuads == vedantStyles.loginBtn) {
          setStyleQuads(vedantStyles.loginBtnClicked)
          setMuscles("quadriceps")
        } else {
          setMuscles(null)
          setStyleQuads(vedantStyles.loginBtn)
        }
      }
    } else {
      setStyleCardio(vedantStyles.loginBtn)
      setStyleOly(vedantStyles.loginBtn)
      setStylePlyo(vedantStyles.loginBtn)
      setStylePower(vedantStyles.loginBtn)
      setStyleStrength(vedantStyles.loginBtn)
      setStyleStretch(vedantStyles.loginBtn)
      setStyleStrong(vedantStyles.loginBtn)
      if (input == 20) { 
        if (styleCardio == vedantStyles.loginBtn) {
          setStyleCardio(vedantStyles.loginBtnClicked)
          setType("cardio")
        } else {
          setStyleCardio(vedantStyles.loginBtn)
          setType(null)
        }
      } else if (input == 21) { 
        if (styleOly == vedantStyles.loginBtn) {
          setStyleOly(vedantStyles.loginBtnClicked)
          setType("olympic_weightlifting")
        } else {
          setStyleOly(vedantStyles.loginBtn)
          setType(null)
        }
      } else if (input == 22) { 
        if (stylePlyo == vedantStyles.loginBtn) {
          setStylePlyo(vedantStyles.loginBtnClicked)
          setType("plyometrics")
        } else {
          setStylePlyo(vedantStyles.loginBtn)
          setType(null)
        }
      } else if (input == 23) { 
        if (stylePower == vedantStyles.loginBtn) {
          setStylePower(vedantStyles.loginBtnClicked)
          setType("powerlifting")
        } else {
          setStylePower(vedantStyles.loginBtn)
          setType(null)
        }
      } else if (input == 24) { 
        if (styleStrength == vedantStyles.loginBtn) {
          setStyleStrength(vedantStyles.loginBtnClicked)
          setType("strength")
        } else {
          setStyleStrength(vedantStyles.loginBtn)
          setType(null)
        }
      } else if (input == 25) { 
        if (styleStretch == vedantStyles.loginBtn) {
          setStyleStretch(vedantStyles.loginBtnClicked)
          setType("stretching")

        } else {
          setStyleStretch(vedantStyles.loginBtn)
>>>>>>> 3a30e1f6196a8ead00ca3f64ac64abaddb005dc7
          setType(null)
        }
      } 
      else if (input == 26) { 
<<<<<<< HEAD
        if (styleStrong == newStyles.loginBtn) {
          setStyleStrong(newStyles.loginBtnClicked)
          setType("strongman")
        } else {
          setStyleStrong(newStyles.loginBtn)
=======
        if (styleStrong == vedantStyles.loginBtn) {
          setStyleStrong(vedantStyles.loginBtnClicked)
          setType("strongman")
        } else {
          setStyleStrong(vedantStyles.loginBtn)
>>>>>>> 3a30e1f6196a8ead00ca3f64ac64abaddb005dc7
          setType(null)
        }
      } else if (input == 27) { 
        console.log(muscles)
      } 
    }
  }

<<<<<<< HEAD
//WORKOUT PAGE

const [userUID, setUserUID] = useState("");
const [workoutNum, setWorkoutNum] = useState(1);

const [workoutString, setWorkoutString] = useState("Workouts Here");
const [modalVisible, setModalVisible] = useState(false);
const [modalDirections, setModalDirections] = useState("");
const [modalInfo, setModalInfo] = useState("");

const [exerciseArr, setExerciseArr] = useState([]);
const [apiResponseArr, setApiResponseArr] = useState([]);

  //Search
=======
  async function saveExercise(name) {
    var index = -1;
    for(var i = 0; i < exerciseArr.length; i++){
      if(name == exerciseArr[i].name){
        index = exerciseArr[i].id;
        i = exerciseArr.length;
      }
    }
    const temp1 = exerciseArr.filter(a => a.id === index);
    const docRef = await setDoc(doc(db, "exercises", temp1[0].name), {
      difficulty: temp1[0].difficulty,
      equipment: temp1[0].equipment,
      muscle: temp1[0].muscle,
      name: temp1[0].name,
      type: temp1[0].type,
      instructions: temp1[0].instructions,
    });
  
    const newExerciseArr = exerciseArr.filter(a => a.id !== index);
    setExerciseArr(newExerciseArr);
    // console.log("Save Exercise")

    console.log(temp1[0].name + " ||| " + workoutSelected);
    const docRef2 = await setDoc(doc(db, "accounts", user.uid, workoutSelected, temp1[0].name), {
    });
  }

  async function saveExercise2() {
    const name = modalInfo.name;

    setModalAddVisible(false);
    var index = -1;
    for(var i = 0; i < exerciseArr.length; i++){
      if(name == exerciseArr[i].name){
        index = exerciseArr[i].id;
        i = exerciseArr.length;
      }
    }

    const temp1 = exerciseArr.filter(a => a.id === index);
    const docRef = await setDoc(doc(db, "exercises", temp1[0].name), {
      difficulty: temp1[0].difficulty,
      equipment: temp1[0].equipment,
      muscle: temp1[0].muscle,
      name: temp1[0].name,
      type: temp1[0].type,
      instructions: temp1[0].instructions,
    });

    const newExerciseArr = exerciseArr.filter(a => a.id !== index);
    setExerciseArr(newExerciseArr);

    const docRef2 = await setDoc(doc(db, "accounts", user.uid, "workouts", workoutSelected, "exercises", temp1[0].name), {
      setsNum: setting1,
      restNum: setting2, 
      activeNum: setting3,
      name: temp1[0].name
    });
  }

  const addInfo = () => {
    // console.log("Adding Info");
    // fruits.push({
    //   id: counter, equipment: "tools", muscle: "lats",
    // });
    setExerciseArr([...exerciseArr, {id: counter, equipment: "tools", muscle: "lats",}])
    setCount(counter + 1)
    // console.log(counter);
  }
 
>>>>>>> 3a30e1f6196a8ead00ca3f64ac64abaddb005dc7
  const submitInput = () => {
    setApiResponseArr([])
        const options = {
          method: 'GET',
          url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
          params: { muscle: muscles,
                    difficulty: difficulty,
                    type: type
                  },
          headers: {
            'X-RapidAPI-Key': 'd1b21c7c74msh10859b8b93cc3adp10d1c8jsncacbeda663df',
            'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
          }
        };
        axios.request(options).then(function (response) {
          collectExerciseData(response.data);
        }).catch(function (error) {
          console.error(error);
        });
    }
   

  const openFilterPage = () => {
    setfilterModalVis(true)
  }

  const closeFilterPage = () => {
    setfilterModalVis(false)
  }

  const collectExerciseData = (data) => {
    for (let i = 0; i < data.length; i++) {
      setApiResponseArr(apiResponseArr => [...apiResponseArr, data[i]])
    }
  }


  return (
    <View style={newStyles.container}>
      <View style={styles.searchView}>

      {/* Open Filter Page Stuff */}
      <TouchableOpacity style = {{paddingRight:10}} onPress={openFilterPage}>
          <Image source={ require('../assets/filter1.png') } style={ { width: 35, height: 35 } } />
      </TouchableOpacity>

<<<<<<< HEAD
      <View style={newStyles.inputView}>
        <TextInput
          style={newStyles.inputText}
          placeholder="Search"
          placeholderTextColor="#cccccc"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      
   
      <TouchableOpacity style = {{paddingLeft:6}} onPress={submitInput}>
          <Image source={ require('../assets/search.png') } style={ { width: 40, height: 40 } } />
      </TouchableOpacity>
    </View> 
    {/* __________________________________________________________________________________________________________________________________________________________*/}
    
    {/* Display Calls */}
    <ScrollView style={newStyles.scrollContainer1}>
  
      <View style={newStyles.scrollContainer2}>
        {apiResponseArr.map((info, index) => (
          <View key={index} style={newStyles.cardComp}>
            <View style={newStyles.cardTextView}>
              <Text style={newStyles.cardText1}> {info.name} </Text>
              <Text style={newStyles.cardText2}> {info.difficulty} </Text>
            </View>
            <View style={newStyles.buttonView}>
              <TouchableOpacity
                style={[newStyles.cardInfoBtn]}
                onPress={() => {
                setModalVisible(true);
                setModalDirections(info.instructions)
                setModalInfo(
                  "Name: " + info.name + " \n" + 
                  "Muscle: " + info.muscle + " \n " + 
                  "Equipment: " + info.equipment + " \n " +
                  "Type: " + info.type + " — " + info.difficulty)
                }}>
                <Icon style={{alignContent: "end",}}
                  color='#ffffff'   
                  name="information-outline"
                  type="material-community"
                  size="30"
                />
              </TouchableOpacity>
            </View>
          </View>
          ))}
      </View>
    {/* __________________________________________________________________________________________________________________________________________________________*/}


      <Modal
        animationType="slide"
=======
      <View style={buttonRowStyles.container}>
        <ScrollView horizontal={true} style={buttonRowStyles.scrollView} showsHorizontalScrollIndicator={false}>
          <View style={buttonRowStyles.buttonsView}>
            {workoutNameArr.map((info, index) => (
              <TouchableOpacity key={index} style={workoutBtnStyleArr[index]} onPress={() => selectWorkout(index)}>
                <Text style={buttonRowStyles.buttonText}> {info} </Text>
              </TouchableOpacity>
          ))}
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {Alert.alert("Modal has been closed."); setModalVisible(!modalVisible); }}>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{alignItems: "center"}}>
                <View style={modalStyles.titleView}>
                  <Text style={modalStyles.titleText}>{modalInfo.name}</Text>
                </View>

                <View style={modalStyles.mainContentView}>
                  <View style={modalStyles.modalInfoView}>
                    <View style={modalStyles.infoTextContainer}>
                      <View style={modalStyles.infoTextView1}>
                        <Text style={modalStyles.infoText1}> Difficulty </Text>
                      </View>
                      <Text style={modalStyles.infoText2}>{ modalInfo.difficulty }</Text>
                    </View>
                    <View style={modalStyles.infoTextContainer}>
                      <View style={modalStyles.infoTextView1}>
                        <Text style={modalStyles.infoText1}> Category </Text>
                      </View>
                      <Text style={modalStyles.infoText2}>{ modalInfo.type }</Text>
                    </View>
                    <View style={[modalStyles.infoTextContainer, modalStyles.infoTextViewTweak]}>
                      <View style={modalStyles.infoTextView1}>
                        <Text style={modalStyles.infoText1}> Equipment </Text>
                      </View>
                      <Text style={modalStyles.infoText2}>{ modalInfo.equipment }</Text>
                    </View>
                  </View>

                  <View style={modalStyles.flipCardView1}>
                    <View style={modalStyles.flipCardView2}>
                      <FlipCard style={modalStyles.flipCard}
                        friction={6}
                        perspective={100000}
                        flipHorizontal={true}
                        flipVertical={false}
                        flip={false}
                        clickable={true}>
                        <View style={modalStyles.flipContainers}>
                          <Image source={ modalMusclePath1 } style={modalStyles.imageStyle} />
                        </View>
                        <View style={modalStyles.flipContainers}>
                          <Image source={ modalMusclePath2 } style={modalStyles.imageStyle} />
                        </View>
                      </FlipCard>
                      <View style={modalStyles.flipMuscleView}>
                        <Text style={modalStyles.flipMuscleText}>{ modalInfo.muscle }</Text>
                      </View>
                    </View>
                  </View>  
                </View>
                <View style={modalStyles.controlView}>
                  <TouchableOpacity style={modalStyles.controlButtons} onPress={() => modalButtons("LEFT")}>
                    <Icon 
                      name="arrow-left-drop-circle"
                      type="material-community"
                      size={55}
                      color="#fff"
                    />
                  </TouchableOpacity> 
                  <TouchableOpacity style={modalStyles.controlButtons} onPress={() => modalButtons("ADD")}>
                    <Icon
                      name="plus-circle"
                      type="material-community"
                      size={70}
                      color="#fff"
                    />
                  </TouchableOpacity> 
                  <TouchableOpacity style={modalStyles.controlButtons} onPress={() => modalButtons("RIGHT")}>
                    <Icon
                      name="arrow-right-drop-circle"
                      type="material-community"
                      size={55}
                      color="#fff"
                    />
                  </TouchableOpacity> 
                </View>
                
                <TouchableOpacity style={modalStyles.returnButton} onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={modalStyles.returnText}>Return</Text>
                </TouchableOpacity>

                <View style={modalStyles.directionsView}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                      <Text style={modalStyles.directionsTitle}>Directions</Text>
                      <Text style={modalStyles.directionsBody}>{modalInfo.instructions}</Text>
                    </View>
                  </ScrollView>
                </View>

              </View>
            </ScrollView>
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalAddVisible}
          onRequestClose={() => {Alert.alert('Modal has been closed.'); setModalAddVisible(!modalAddVisible); }}>
          <BlurView intensity={65} tint="dark" style={modalAddStyles.modalContainer}>
            <View style={modalAddStyles.modalView}>
              <View style={modalAddStyles.titleView1}>
                <View style={modalAddStyles.titleView2}>
                  <Text style={modalAddStyles.titleText}>Exercise Settings</Text>
                </View>
                <Icon
                  onPress={() => setModalAddVisible(!modalAddVisible)}
                  style={modalAddStyles.closeButton}
                  color="#8a7ed9"
                  name="close-box-outline"
                  type="material-community"
                  size="40"
                />
              </View>
              <View style={modalAddStyles.dividerView}>
                <Divider borderColor="#8a7ed9" color="#e2deff" orientation="center">Time On</Divider>
              </View>
              <View style={modalAddStyles.scrollContainer1}>
                <ScrollView horizontal={true} style={modalAddStyles.scrollContainer2} showsHorizontalScrollIndicator={false}>
                  <View style={modalAddStyles.scrollContainer3}> 
                    {timeArr.map((info, index) => (
                      <TouchableOpacity
                        key={index} style={settingStyleArr3[index]} onPress={() => {selectSetting(3, index)}}>
                        <Text style={modalAddStyles.timeButtonText}>{info}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View> 
              <View style={modalAddStyles.dividerView}>
                <Divider borderColor="#8a7ed9" color="#e2deff" orientation="center">Number of Sets</Divider>
              </View>
              <View style={modalAddStyles.scrollContainer1}>
                <ScrollView horizontal={true} style={modalAddStyles.scrollContainer2} showsHorizontalScrollIndicator={false}>
                  <View style={modalAddStyles.scrollContainer3}> 
                    {setNumArr.map((info, index) => (
                      <TouchableOpacity key={index} style={settingStyleArr1[index]} onPress={() => {selectSetting(1, index)}}>
                        <Text style={modalAddStyles.timeButtonText}>{info}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View style={modalAddStyles.dividerView}>
                <Divider borderColor="#8a7ed9" color="#e2deff" orientation="center">Rest Per Set</Divider>
              </View>
              <View style={modalAddStyles.scrollContainer1}>
                <ScrollView horizontal={true} style={modalAddStyles.scrollContainer2} showsHorizontalScrollIndicator={false}>
                  <View style={modalAddStyles.scrollContainer3}> 
                    {timeArr.map((info, index) => (
                      <TouchableOpacity
                        key={index} style={settingStyleArr2[index]} onPress={() => {selectSetting(2, index)}}>
                        <Text style={modalAddStyles.timeButtonText}>{info}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View> 

              <TouchableOpacity style={modalAddStyles.saveButton} onPress={saveExercise2}>
                <Text style={modalAddStyles.saveText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </BlurView>

        </Modal>
      </Modal>

      <Modal
        animationType="slide"
>>>>>>> 3a30e1f6196a8ead00ca3f64ac64abaddb005dc7
        visible={filterModalVis}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>

    <View style={newStyles.container}>
     <View style={{marginTop:75}}>
      <View style={{marginRight:210, flexDirection: 'row'}}>
        <Text style={newStyles.titleText}>Filters</Text>
            <Image source={ require('../assets/filter1.png') } style={ { width: 35, height: 35, paddingRight:10, marginTop:5 } } />
      </View>
    </View>
      <View style={newStyles.filterContainer}>
      
        <Text style={newStyles.filterHeader}>Difficulty</Text>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <View> 
          <TouchableOpacity style={styleBeginner} onPress={() => recieveButtonClicks(1)} >
              <Text style={newStyles.loginText}>Beginner</Text> 
          </TouchableOpacity>
          </View> 
          <TouchableOpacity style={styleIntermediate} onPress={() => recieveButtonClicks(2)}>
              <Text style={newStyles.loginText}>Intermediate</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleExpert} onPress={() => recieveButtonClicks(3)}>
              <Text style={newStyles.loginText}>Expert</Text> 
          </TouchableOpacity> 
        </View>

        <Text style={newStyles.filterHeader}>Muscle Group</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleAbdom} onPress={() => recieveButtonClicks(4)}>
              <Text style={newStyles.loginText}>Abdominals</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleAbduct} onPress={() => recieveButtonClicks(5)}>
              <Text style={newStyles.loginText}>Abductors</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleAdd} onPress={() => recieveButtonClicks(6)}>
              <Text style={newStyles.loginText}>Adductors</Text> 
          </TouchableOpacity> 
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleBiceps} onPress={() => recieveButtonClicks(7)}>
              <Text style={newStyles.loginText}>Biceps</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleTriceps} onPress={() => recieveButtonClicks(8)}>
              <Text style={newStyles.loginText}>Triceps</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleLats} onPress={() => recieveButtonClicks(9)}>
              <Text style={newStyles.loginText}>Lats</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleFore} onPress={() => recieveButtonClicks(10)}>
              <Text style={newStyles.loginText}>Forearms</Text> 
          </TouchableOpacity> 
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleTraps} onPress={() => recieveButtonClicks(11)}>
<<<<<<< HEAD
              <Text style={newStyles.loginText}>Traps</Text> 
=======
              <Text style={vedantStyles.loginText}>Traps</Text> 
>>>>>>> 3a30e1f6196a8ead00ca3f64ac64abaddb005dc7
          </TouchableOpacity> 
          <TouchableOpacity style={styleChest} onPress={() => recieveButtonClicks(12)}>
              <Text style={newStyles.loginText}>Chest</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleNeck} onPress={() => recieveButtonClicks(13)}>
              <Text style={newStyles.loginText}>Neck</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleLowBack} onPress={() => recieveButtonClicks(14)}>
              <Text style={newStyles.loginText}>Lower Back</Text> 
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleMidBack} onPress={() => recieveButtonClicks(15)}>
<<<<<<< HEAD
              <Text style={newStyles.loginText}>Middle Back</Text> 
=======
              <Text style={vedantStyles.loginText}>Middle Back</Text> 
>>>>>>> 3a30e1f6196a8ead00ca3f64ac64abaddb005dc7
          </TouchableOpacity> 
          <TouchableOpacity style={styleCalves} onPress={() => recieveButtonClicks(16)}>
              <Text style={newStyles.loginText}>Calves</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleGlutes} onPress={() => recieveButtonClicks(17)}>
              <Text style={newStyles.loginText}>Glutes</Text> 
          </TouchableOpacity> 
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleHams} onPress={() => recieveButtonClicks(18)}>
              <Text style={newStyles.loginText}>Hamstrings</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleQuads} onPress={() => recieveButtonClicks(19)}>
              <Text style={newStyles.loginText}>Quadriceps</Text> 
          </TouchableOpacity> 
        </View>

        <Text style={newStyles.filterHeader}>Type</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleCardio} onPress={() => recieveButtonClicks(20)}>
              <Text style={newStyles.loginText}>Cardio</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleOly} onPress={() => recieveButtonClicks(21)}>
              <Text style={newStyles.loginText}>Olympic Weightlifting</Text> 
          </TouchableOpacity> 
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={stylePlyo} onPress={() => recieveButtonClicks(22)}>
              <Text style={newStyles.loginText}>Plyometrics</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={stylePower} onPress={() => recieveButtonClicks(23)}>
              <Text style={newStyles.loginText}>Powerlifting</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleStrength} onPress={() => recieveButtonClicks(24)}>
              <Text style={newStyles.loginText}>Strength</Text> 
          </TouchableOpacity> 
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleStretch} onPress={() => recieveButtonClicks(25)}>
<<<<<<< HEAD
              <Text style={newStyles.loginText}>Stretching</Text> 
=======
              <Text style={vedantStyles.loginText}>Stretching</Text> 
>>>>>>> 3a30e1f6196a8ead00ca3f64ac64abaddb005dc7
          </TouchableOpacity> 
          <TouchableOpacity style={styleStrong} onPress={() => recieveButtonClicks(26)}>
              <Text style={newStyles.loginText}>Strongman</Text> 
          </TouchableOpacity> 
        </View>
      
        <View style={{flexDirection: 'row', marginTop: 45, marginRight: 265}}>
          <TouchableOpacity onPress={closeFilterPage}>
<<<<<<< HEAD
              <Text style={newStyles.returnText}>Back</Text> 
=======
              <Text style={vedantStyles.returnText}>Back</Text> 
>>>>>>> 3a30e1f6196a8ead00ca3f64ac64abaddb005dc7
          </TouchableOpacity> 
        </View>

      </View>
    </View>
      </Modal>
<<<<<<< HEAD
     
    </ScrollView>
  </View> 
  )
=======

      <ScrollView style={mainScrollView.scrollContainer1} showsVerticalScrollIndicator={false}>
        <View style={mainScrollView.scrollContainer2}>
          {exerciseArr.map((info, index) => (
            <View key={index} style={mainScrollView.cardComp}>
              <View style={mainScrollView.cardTextView}>
                <Text style={mainScrollView.cardText1}> {info.name} </Text>
                <Text style={mainScrollView.cardText2}> {info.difficulty} </Text>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={[mainScrollView.cardInfoBtn]}
                  onPress={() => {
                    setModalVisible(true);
                    setModalIndex(info.id);
                    setFixModalIndex(true);
                    setPath(info.muscle);
                    setModalInfo({
                      id: info.id,
                      name: info.name, 
                      type: info.type,
                      muscle: info.muscle, 
                      equipment: info.equipment, 
                      difficulty: info.difficulty, 
                      instructions: info.instructions});
                  }}
                >
                  <Icon
                    style={{ alignContent: "end" }}
                    color="#c8c5db"
                    name="menu"
                    type="material"
                    size="30"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
>>>>>>> 3a30e1f6196a8ead00ca3f64ac64abaddb005dc7
}


const newStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
<<<<<<< HEAD
    backgroundColor: '#0d0d12',
=======
    marginTop: 10,
    marginBottom: 15,
    width: "100%",
  },
  modalInfoView: {
    width: "50%",
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#7c6f9e",//8e8efa//7c6f9e
    borderRadius: 7,
  },

  infoTextContainer: {
    borderColor: "black",
    alignItems: "center",
    // backgroundColor: "grey",
    borderBottomWidth: 3,
    borderColor: "#7c6f9e",
    paddingVertical: 20,
    width: "90%",
  },
  infoTextView1: {
    width: "80%",
    borderTopColor: "8e8efa",
    borderBottomColor: "8e8efa",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderColor: "white",
  },
  infoTextViewTweak: {
    borderBottomWidth: 0,
  },
  infoText1: {
    fontSize: 25, //25
    fontWeight: "400",
    color: "#fff",
    letterSpacing: 1.5,
  },
  infoText2: {
    fontSize: 19, //18
    marginBottom: 5,
    color: "#d0d1d6",
    maxWidth: 160,
    maxHeight: 30,
  },

  flipMuscleView: {
    width: "100%",
    minWidth: "95%",
    height: "9%",
    alignItems: "center",
    borderTopColor: "black",
    borderTopWidth: 3,
  },
  flipMuscleText: {
    fontSize: 25,
  },

  flipCardView1: {
    // backgroundColor: "grey", 
    maxHeight: 200*2, 
    width: "50%",
    alignItems: "center",
    
  },
  flipCardView2: {
    backgroundColor: "#8e8efa",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 7,
  },
  flipCard: {
    height: 200 * 1.8,
    width: 100 * 1.8,
    maxHeight: 200 * 1.8,
    maxWidth: 180 * 1.8,
    backgroundColor: "#babaf7",
    alignItems: "center",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  flipContainers: {
    marginTop: 10,
    maxHeight: "95%",
    maxWidth: "95%",
  },
  imageStyle: {
    maxHeight: "100%",
    maxWidth: "100%",
    backgroundColor: "#babaf7",
  },

  controlView: {
    flexDirection: "row",
    backgroundColor: "#393b63",
    // borderColor: "#393b63",
    // borderWidth: 1.5,
    width: 300,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  controlButtons: {
    maxHeight: 100,
    maxWidth: 100,
    height: 80,
    width: 80,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  returnButton: {
    marginTop: 15,
    backgroundColor: "#393b63",
    width: 100,
    height: 40,
    borderRadius: 5,
    // borderColor: "#393b63",
    // borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  returnText: {
    fontSize: 20,
    fontWeight: "300",
    color: "#fff",
  },

  directionsView: {
    marginTop: 30,
    height: 450,
    width: "90%",
    borderRadius: 4,
    backgroundColor: "#2e2645",
    paddingVertical: 10,
    marginBottom: 20,
  },
  directionsTitle: {
    fontSize: 25,
    color: "#d1ced9",
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 10,
    letterSpacing: 2,
  },
  directionsBody: {
    fontSize: 20,
    color: "#d1ced9",
    fontWeight: "300",
    marginTop: 15,
    marginLeft: 20,
    marginRight: 10,
    lineHeight: 25,
  },
})

const modalAddStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    alignItems: 'center',
    height: "54%",
    width: "70%",
    backgroundColor: "#404057",//'#404057', //0d0d12 //26, 26, 41
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#8a7ed9",
  },
  titleView1: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7,
  },
  titleView2: {
    width: 190,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "#e2deff",
    fontSize: 20,
    fontWeight: "300",
    letterSpacing: 1.5,
  },
  closeButton: {
    // marginTop: 7,
    // marginRight: 7,
    marginLeft: 20,
>>>>>>> 3a30e1f6196a8ead00ca3f64ac64abaddb005dc7
  },

  scrollContainer1: {
    flex: 1,
<<<<<<< HEAD
=======
    maxHeight: 45,
    width: "90%",
    backgroundColor: "#2b2b40",
    paddingHorizontal: 5,
    borderRadius: 3,
>>>>>>> 3a30e1f6196a8ead00ca3f64ac64abaddb005dc7
  },
  scrollContainer2: {
    flex: 1,
    alignItems: "center",
  },
  cardComp: {
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#282838",
    borderWidth: 0,
    borderRadius: 7,
    marginBottom: 5,
    alignItems: "center",
    height: "15%",
  },
  cardTextView: {
    marginLeft: 10,
    width: "85%",
  },
  cardText1: {
    color: "#e0e0e0",
    fontSize: 16,
  },
  cardText2: {
    color: "#a8a8a8",
    fontSize: 15,
    fontWeight: "300",
  },
  cardInfoBtn: {
    height: 30,
    // backgroundColor: "darkblue",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
})

const styles = StyleSheet.create({
  playlist: {
    backgroundColor: "#7ab3d6",
    borderRadius: 5,
    borderWidth: 3,
    alignItems: "center",
    width: "90%",
    height: "30%"
  },
  playlistText: {
    fontSize: 17,
    marginTop: 10,
    marginHorizontal: 10,
  },

  //————————————————————————————————————————————————————————————————
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#adc9db',
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 5,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
//————————————————————————————————————————————————————————————————
  searchView: {
    // width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  searchInput: {
    backgroundColor: "#578bab",
    borderRadius: 20,
    maxWidth: "50%", 
    marginRight: 5,
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 5,
    bordercolor: "black",
    borderWidth: 3,
  },
  searchButton: {
    backgroundColor: "white",
    padding: 10,
    bordercolor: "black",
    borderRadius: 5,
    bordercolor: "black",
    borderWidth: 3,
    marginRight: 5,
  },
//————————————————————————————————————————————————————————————————
  workoutCard: {
    marginTop: 10,
    width: "90%",
    backgroundColor: "white",
    bordercolor: "black",
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignContent: "center",

  }, 
  buttonView: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  cardButton: {
    backgroundColor: "lightblue",
    padding: 5,
    width: "30%",
    borderRadius: 5,
    margin: 10,
    height: 35,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
//————————————————————————————————————————————————————————————————

  playingSpace: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 3,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20
    },

    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    scrollStyle: {
      marginTop: 10,
      flex: 1,
      // backgroundColor: "cyan",
      maxHeight: 495,
    }


});
