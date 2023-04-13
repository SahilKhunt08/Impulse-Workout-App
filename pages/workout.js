import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Modal, Pressable, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import axios from "axios";
import { Card } from 'react-native-paper';
import { auth } from './firebase';
import {db} from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, query, getDoc } from "firebase/firestore"; 
import { Icon } from '@rneui/themed';
import FlipCard from 'react-native-flip-card'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { makeStyles } from "@rneui/base";
import { isEmpty } from "@firebase/util";
import { Divider } from '@rneui/themed';

var modalMusclePath1 = require("./muscleImages/biceps1.png");
var modalMusclePath2 = require("./muscleImages/biceps2.png");

export default function Workout({ navigation }) {
  const [search1, setSearch1] = useState("biceps");
  const [search2, setSearch2] = useState("muscle");
  const [workoutNum, setWorkoutNum] = useState(1);
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

  const auth = getAuth();
  const user = auth.currentUser;
  
//Filter PAGE

  const [filterModalVis, setfilterModalVis] = useState(false)
  const [styleBeginner, setStyleBeginner] = useState(vedantStyles.loginBtn);
  const [styleIntermediate, setStyleIntermediate] = useState(vedantStyles.loginBtn);
  const [styleExpert, setStyleExpert] = useState(vedantStyles.loginBtn);

  const [styleAbdom, setStyleAbdom] = useState(vedantStyles.loginBtn);
  const [styleAbduct, setStyleAbduct] = useState(vedantStyles.loginBtn);
  const [styleAdd, setStyleAdd] = useState(vedantStyles.loginBtn);
  const [styleBiceps, setStyleBiceps] = useState(vedantStyles.loginBtn);
  const [styleTriceps, setStyleTriceps] = useState(vedantStyles.loginBtn);
  const [styleLats, setStyleLats] = useState(vedantStyles.loginBtn);
  const [styleFore, setStyleFore] = useState(vedantStyles.loginBtn);
  const [styleTraps, setStyleTraps] = useState(vedantStyles.loginBtn);
  const [styleChest, setStyleChest] = useState(vedantStyles.loginBtn);
  const [styleNeck, setStyleNeck] = useState(vedantStyles.loginBtn);
  const [styleLowBack, setStyleLowBack] = useState(vedantStyles.loginBtn);
  const [styleMidBack, setStyleMidBack] = useState(vedantStyles.loginBtn);
  const [styleCalves, setStyleCalves] = useState(vedantStyles.loginBtn);
  const [styleGlutes, setStyleGlutes] = useState(vedantStyles.loginBtn);
  const [styleHams, setStyleHams] = useState(vedantStyles.loginBtn);
  const [styleQuads, setStyleQuads] = useState(vedantStyles.loginBtn);

  const [styleCardio, setStyleCardio] = useState(vedantStyles.loginBtn);
  const [styleOly, setStyleOly] = useState(vedantStyles.loginBtn);
  const [stylePlyo, setStylePlyo] = useState(vedantStyles.loginBtn);
  const [stylePower, setStylePower] = useState(vedantStyles.loginBtn);
  const [styleStrength, setStyleStrength] = useState(vedantStyles.loginBtn);
  const [styleStretch, setStyleStretch] = useState(vedantStyles.loginBtn);
  const [styleStrong, setStyleStrong] = useState(vedantStyles.loginBtn);

  const [difficulty, setDifficulty] = useState(""); 
  const [muscles, setMuscles] = useState("")
  const [type, setType] = useState("")

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
      var tempArr1 = docSnap.data().workouts;
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
          setType(null)
        }
      } 
      else if (input == 26) { 
        if (styleStrong == vedantStyles.loginBtn) {
          setStyleStrong(vedantStyles.loginBtnClicked)
          setType("strongman")
        } else {
          setStyleStrong(vedantStyles.loginBtn)
          setType(null)
        }
      } else if (input == 27) { 
        console.log(muscles)
      } 
    }
  }

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

  const addInfo = () => {
    // console.log("Adding Info");
    // fruits.push({
    //   id: counter, equipment: "tools", muscle: "lats",
    // });
    setExerciseArr([...exerciseArr, {id: counter, equipment: "tools", muscle: "lats",}])
    setCount(counter + 1)
    // console.log(counter);
  }
 
  const submitInput = () => {
    if(searchBarText == "") {
      setExerciseArr([])
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
        displayData(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    } else {
      setExerciseArr([])
        const options = {
          method: 'GET',
          url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
          params: {name: searchBarText},
          headers: {
            'X-RapidAPI-Key': 'd1b21c7c74msh10859b8b93cc3adp10d1c8jsncacbeda663df',
            'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
          }
        };
      axios.request(options).then(function (response) {
      	displayData(response.data);
      }).catch(function (error) {
      	console.error(error);
      });
    }
  }

  const openFilterPage = () => {
    setfilterModalVis(true)
  }

  const closeFilterPage = () => {
    setfilterModalVis(false)
    console.log(exerciseArr);
  }

  const displayData = (input) => {
    console.log("----------------------");
    // setExerciseArr(exerciseArr => [...exerciseArr, allData]);
    for(var i = 0; i < input.length; i++){
      input[i].id = counter + i;
      // input[i].id = i + 1;
    }
    setCount(counter + 10);
    setExerciseArr(input);
  }

  async function selectWorkout(index) {
    setWorkoutSelected(workoutNameArr[index]);
    for(var i = 0; i < workoutNameArr.length; i++){
      workoutBtnStyleArr[i] = buttonRowStyles.buttonOff;
    }
    workoutBtnStyleArr[index] = buttonRowStyles.buttonOn;
  }

  const setPath = (muscleName) =>{
    switch(muscleName) { 
      case "biceps":
        modalMusclePath1 = require("./muscleImages/biceps1.png");
        modalMusclePath2 = require("./muscleImages/biceps2.png");
        break;
      case "triceps":
        modalMusclePath1 = require("./muscleImages/triceps1.png");
        modalMusclePath2 = require("./muscleImages/triceps2.png");
        break;
      default: 
        modalMusclePath1 = require("./muscleImages/default1.png");
        modalMusclePath2 = require("./muscleImages/default2.png");

      } 
  }

  const modalButtons = (action) => {
    var tempIndex = modalIndex; 
    if(fixModalIndex){
      setFixModalIndex(false);
      tempIndex -= exerciseArr[0].id;
    }

    if (action == "ADD"){
      saveExercise(exerciseArr[tempIndex].name);
    } 
    else if (action == "LEFT"){
      tempIndex--;
      if(tempIndex < 0){
        tempIndex = exerciseArr.length - 1
      } 
    } 
    else if (action == "RIGHT"){
      tempIndex++;
      if(tempIndex > exerciseArr.length - 1){
        tempIndex = 0;
      }
    }

    var update = true;
    var count = 0;
    if(exerciseArr.length == 1 && action == "ADD"){ 
      setModalVisible(!modalVisible);
      update = false;
    } 
    else if (action == "ADD") {
      if(tempIndex + 1> exerciseArr.length - 1){
        tempIndex = 0;
      } else {
        count = 1;
      }
    } 
    if(update) {
      setModalIndex(tempIndex);
      setPath(exerciseArr[tempIndex + count].muscle);
      setModalInfo({
        id: exerciseArr[tempIndex + count].id,
        name: exerciseArr[tempIndex + count].name, 
        muscle: exerciseArr[tempIndex + count].muscle, 
        equipment: exerciseArr[tempIndex + count].equipment, 
        difficulty: exerciseArr[tempIndex + count].difficulty, 
        instructions: exerciseArr[tempIndex + count].instructions
      }); 
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchView}>
        <TouchableOpacity style = {{paddingRight:10}} onPress={openFilterPage}>
          <Image source={ require('../assets/filter1.png') } style={ { width: 35, height: 35 } } />
        </TouchableOpacity>
        <View style={vedantStyles.inputView}>
          <TextInput
            style={vedantStyles.inputText}
            placeholder="Search"
            placeholderTextColor="#cccccc"
            onChangeText={(searchBarText) => setSearchBarText(searchBarText)}
          /> 
        </View> 
        <TouchableOpacity style = {{paddingLeft:6}} onPress={submitInput}>
            <Image source={ require('../assets/search.png') } style={ { width: 40, height: 40 } } />
        </TouchableOpacity>
      </View>

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
            <View style={modalStyles.titleView}>
              <Text style={modalStyles.titleText}>{modalInfo.name}</Text>
            </View>

            <View style={modalStyles.mainContentView}>
              <View style={modalStyles.modalInfoView}>
                <View style={modalStyles.infoTextView}>
                  <Text style={modalStyles.infoText1}> Difficulty </Text>
                  <Text style={modalStyles.infoText2}>{ modalInfo.difficulty }</Text>
                </View>
                <View style={modalStyles.infoTextView}>
                  <Text style={modalStyles.infoText1}> Muscle </Text>
                  <Text style={modalStyles.infoText2}>{ modalInfo.muscle }</Text>
                </View>
                <View style={modalStyles.infoTextView}>
                  <Text style={modalStyles.infoText1}> Equipment </Text>
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
              <TouchableOpacity style={modalStyles.controlImg1} onPress={() => modalButtons("LEFT")}>
                <Icon 
                  name="chevron-right"
                  type="material"
                  size={40}
                />
              </TouchableOpacity> 
              <TouchableOpacity style={modalStyles.controlImg1} onPress={() => modalButtons("ADD")}>
                <Icon
                  name="plus-circle-outline"
                  type="material-community"
                  size={60}
                />
              </TouchableOpacity> 
              <TouchableOpacity style={modalStyles.controlImg1} onPress={() => modalButtons("RIGHT")}>
                <Icon
                  name="add-circle"
                  type="material"
                  size={40}
                />
              </TouchableOpacity> 
            </View>

            <TouchableOpacity style={[styles.modalButton, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={modalStyles.closeText}> Return </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={filterModalVis}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>

    <View style={vedantStyles.container}>
     <View style={{marginTop:75}}>
      <View style={{marginRight:210, flexDirection: 'row'}}>
        <Text style={vedantStyles.titleText}>Filters</Text>
            <Image source={ require('../assets/filter1.png') } style={ { width: 35, height: 35, paddingRight:10, marginTop:5 } } />
      </View>
    </View>
      <View style={vedantStyles.filterContainer}>
      
        <Text style={vedantStyles.filterHeader}>Difficulty</Text>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <View> 
          <TouchableOpacity style={styleBeginner} onPress={() => recieveButtonClicks(1)} >
              <Text style={vedantStyles.loginText}>Beginner</Text> 
          </TouchableOpacity>
          </View> 
          <TouchableOpacity style={styleIntermediate} onPress={() => recieveButtonClicks(2)}>
              <Text style={vedantStyles.loginText}>Intermediate</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleExpert} onPress={() => recieveButtonClicks(3)}>
              <Text style={vedantStyles.loginText}>Expert</Text> 
          </TouchableOpacity> 
        </View>

        <Text style={vedantStyles.filterHeader}>Muscle Group</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleAbdom} onPress={() => recieveButtonClicks(4)}>
              <Text style={vedantStyles.loginText}>Abdominals</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleAbduct} onPress={() => recieveButtonClicks(5)}>
              <Text style={vedantStyles.loginText}>Abductors</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleAdd} onPress={() => recieveButtonClicks(6)}>
              <Text style={vedantStyles.loginText}>Adductors</Text> 
          </TouchableOpacity> 
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleBiceps} onPress={() => recieveButtonClicks(7)}>
              <Text style={vedantStyles.loginText}>Biceps</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleTriceps} onPress={() => recieveButtonClicks(8)}>
              <Text style={vedantStyles.loginText}>Triceps</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleLats} onPress={() => recieveButtonClicks(9)}>
              <Text style={vedantStyles.loginText}>Lats</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleFore} onPress={() => recieveButtonClicks(10)}>
              <Text style={vedantStyles.loginText}>Forearms</Text> 
          </TouchableOpacity> 
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleTraps} onPress={() => recieveButtonClicks(11)}>
              <Text style={vedantStyles.loginText}>Traps</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleChest} onPress={() => recieveButtonClicks(12)}>
              <Text style={vedantStyles.loginText}>Chest</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleNeck} onPress={() => recieveButtonClicks(13)}>
              <Text style={vedantStyles.loginText}>Neck</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleLowBack} onPress={() => recieveButtonClicks(14)}>
              <Text style={vedantStyles.loginText}>Lower Back</Text> 
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleMidBack} onPress={() => recieveButtonClicks(15)}>
              <Text style={vedantStyles.loginText}>Middle Back</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleCalves} onPress={() => recieveButtonClicks(16)}>
              <Text style={vedantStyles.loginText}>Calves</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleGlutes} onPress={() => recieveButtonClicks(17)}>
              <Text style={vedantStyles.loginText}>Glutes</Text> 
          </TouchableOpacity> 
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleHams} onPress={() => recieveButtonClicks(18)}>
              <Text style={vedantStyles.loginText}>Hamstrings</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleQuads} onPress={() => recieveButtonClicks(19)}>
              <Text style={vedantStyles.loginText}>Quadriceps</Text> 
          </TouchableOpacity> 
        </View>

        <Text style={vedantStyles.filterHeader}>Type</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleCardio} onPress={() => recieveButtonClicks(20)}>
              <Text style={vedantStyles.loginText}>Cardio</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleOly} onPress={() => recieveButtonClicks(21)}>
              <Text style={vedantStyles.loginText}>Olympic Weightlifting</Text> 
          </TouchableOpacity> 
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={stylePlyo} onPress={() => recieveButtonClicks(22)}>
              <Text style={vedantStyles.loginText}>Plyometrics</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={stylePower} onPress={() => recieveButtonClicks(23)}>
              <Text style={vedantStyles.loginText}>Powerlifting</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleStrength} onPress={() => recieveButtonClicks(24)}>
              <Text style={vedantStyles.loginText}>Strength</Text> 
          </TouchableOpacity> 
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styleStretch} onPress={() => recieveButtonClicks(25)}>
              <Text style={vedantStyles.loginText}>Stretching</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleStrong} onPress={() => recieveButtonClicks(26)}>
              <Text style={vedantStyles.loginText}>Strongman</Text> 
          </TouchableOpacity> 
        </View>
      
        <View style={{flexDirection: 'row', marginTop: 45, marginRight: 265}}>
          <TouchableOpacity onPress={closeFilterPage}>
              <Text style={vedantStyles.returnText}>Back</Text> 
          </TouchableOpacity> 
        </View>

      </View>
    </View>
      </Modal>

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
}

const buttonRowStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: 'center',
    height: "7%",
    width: "100%",
    marginBottom: 10,
  },
  scrollView: {
    width: "100%",
  },
  buttonsView: {
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: "row",
  },
  buttonOn: {
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: "#8e8efa",
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    maxWidth: 150,
    backgroundColor: "#8e8efa",
  },
  buttonOff: {
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: "#79829c",
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    maxWidth: 150,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#fff",
  },

})

const modalStyles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    // height: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#1a1a29", //'#404057', //0d0d12
    // padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "80.5%",
    width: "100%",
  },

  titleView: {
    backgroundColor: "#505075",
    padding: 12,
    borderRadius: 15,    
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    maxHeight: 60,

    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: "center",
    fontSize: 20,
  },

  mainContentView:{
    flexDirection: "row",
    backgroundColor: "#3e3e57",
    height: 400,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  modalInfoView: {
    // backgroundColor: "red",
    width: "50%",
    height: 400,
    justifyContent: "center",
  },

  infoTextView: {
    // backgroundColor: "grey",
    padding: 6,
    marginHorizontal: 5,
    marginVertical: 15,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 3,
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  infoText1: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 5,
    color: "#fff",
    borderBottomColor: "#fff",
    borderBottomWidth: 3,
    marginBottom: 10,
  },
  infoText2: {
    fontSize: 18,
    marginBottom: 5,
    color: "#d0d1d6",
  },
  flipMuscleView: {
    // backgroundColor: "red",
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
    backgroundColor: "#d8b3f5", 
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 10,
  },
  flipCard: {
    height: 200 * 1.8,
    width: 100 * 1.8,
    maxHeight: 200 * 1.8,
    maxWidth: 180 * 1.8,
    bordercolor: "#fff",
    // borderWidth: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#e9ccff",
    alignItems: "center",
    borderBottomColor: "black",
    // borderBottomWidth: 3,
  },
  flipContainers: {
    marginTop: 10,
    backgroundColor: "cyan",
    borderRadius: 10,
    maxHeight: "95%",
    maxWidth: "95%",
  },
  imageStyle: {
    maxHeight: "100%",
    maxWidth: "100%",
    backgroundColor: "#e9ccff",
    borderRadius: 10,
  },

  controlView: {
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "red",
    width: 300,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  controlImg1: {
    maxHeight: 100,
    maxWidth: 100,
    height: 60,
    width: 60,
    backgroundColor: "grey",
    marginHorizontal: 15,
  },

  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

const mainScrollView = StyleSheet.create({
  scrollContainer1: {
    width: "100%",
    paddingTop: 10,
    // backgroundColor: "cyan",
    height: "78%",
    maxHeight: "78%",
  },
  scrollContainer2: {
    alignItems: "center",
    width: "100%",
    // backgroundColor: "red",
    paddingBottom: 10,
  },
  cardComp: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#282838",
    height: 70,
    borderWidth: 0,
    borderRadius: 7,
    marginBottom: 5.5,
    alignItems: "center",
    height: 60,
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

  mainContainer:{
    flex: 1,
    alignItems: "center",
    backgroundColor: '#0d0d12',
  },
  
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


})

const vedantStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#0d0d12',
  },
  filterContainer: { 
    alignItems: "center",
  },
  titleText: {
    color: "#8e8efa",
    fontWeight: "500",
    fontSize: 35,
    alignSelf: "left",
    marginBottom: 25,
  },
  filterHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    margin: 5,
    marginTop: 15
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  dividerView: {
    width: "87%",
  },
  loginBtn: {
    borderRadius:7,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(227, 227, 255, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    margin: 5,
    shadowOffset : { width: 1, height: 13},
  },

  loginBtnClicked: {
    borderRadius:7,
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
  loginText: {
    fontWeight: "600",
    fontSize: 15,
  },
  returnText: {
    fontWeight: "600",
    fontSize: 35,
    color: "#FF0101",
    alignSelf: "left",
  },

  inputView: {
    borderColor: "#404057",
    borderWidth: 2,
    borderRadius: 5,
    height: 45,
    width: 250,
    marginRight: 5,
    alignItems: "center",
  },
  inputText: {
    height: 50,
    width: "100%",
    flex: 1,
    padding: 15,
    color: "#ffffff",
  },
  scrollContainer1: {
    flex: 1,
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
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  buttonView: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
})