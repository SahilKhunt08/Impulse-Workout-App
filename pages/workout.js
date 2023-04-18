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
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CheckBox } from '@rneui/themed';
import Divider from 'react-native-divider';
import { makeStyles } from "@rneui/base";
import { isEmpty } from "@firebase/util";

const Stack = createNativeStackNavigator();


export default function Workout () {

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
          setType(null)
        }
      } 
      else if (input == 26) { 
        if (styleStrong == newStyles.loginBtn) {
          setStyleStrong(newStyles.loginBtnClicked)
          setType("strongman")
        } else {
          setStyleStrong(newStyles.loginBtn)
          setType(null)
        }
      } else if (input == 27) { 
        console.log(muscles)
      } 
    }
  }

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
              <Text style={newStyles.loginText}>Traps</Text> 
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
              <Text style={newStyles.loginText}>Middle Back</Text> 
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
              <Text style={newStyles.loginText}>Stretching</Text> 
          </TouchableOpacity> 
          <TouchableOpacity style={styleStrong} onPress={() => recieveButtonClicks(26)}>
              <Text style={newStyles.loginText}>Strongman</Text> 
          </TouchableOpacity> 
        </View>
      
        <View style={{flexDirection: 'row', marginTop: 45, marginRight: 265}}>
          <TouchableOpacity onPress={closeFilterPage}>
              <Text style={newStyles.returnText}>Back</Text> 
          </TouchableOpacity> 
        </View>

      </View>
    </View>
      </Modal>
     
    </ScrollView>
  </View> 
  )
}


const newStyles = StyleSheet.create({
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
    },

});
