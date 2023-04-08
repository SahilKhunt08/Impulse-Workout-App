import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Modal, Pressable, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import axios from "axios";
import { Card } from 'react-native-paper';
import { auth } from './firebase';
import {db} from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, query } from "firebase/firestore"; 
import { Icon } from '@rneui/themed';
import { CheckBox } from '@rneui/themed';
import FlipCard from 'react-native-flip-card'

var modalMusclePath1 = require("./muscleImages/biceps1.png");
var modalMusclePath2 = require("./muscleImages/biceps2.png");

export default function Workout() {
  const [search1, setSearch1] = useState("biceps");
  const [search2, setSearch2] = useState("muscle");
  const [userUID, setUserUID] = useState("");
  const [workoutNum, setWorkoutNum] = useState(1);
  const [workoutString, setWorkoutString] = useState("Workouts Here");
  const [counter, setCount] = useState(3);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const [exerciseArr, setExerciseArr] = useState([
    // {id: "0", equipment: 'equipment1', muscle: "muscle1"},
  ]);
  const [modalIndex, setModalIndex] = useState(0);
  const [fixModalIndex, setFixModalIndex] = useState(true);

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

    const collectionName = "workout" + workoutNum;
    const docRef2 = await setDoc(doc(db, "accounts", userUID, collectionName, temp1[0].name), {
    });

    selectWorkout(workoutNum);
  };

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

    if (search2.toLowerCase() == "muscle"){
      const options = {
        method: 'GET',
        url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
        params: {muscle: search1},
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
    
    } else if (search2.toLowerCase() == "difficulty"){
        const options = {
          method: 'GET',
          url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
          params: {difficulty: search1},
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
      
      } else if (search2.toLowerCase() == "type"){
          const options = {
            method: 'GET',
            url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
            params: {type: search1},
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

  const displayData = (input) => {
    console.log("----------------------");
    // setExerciseArr(exerciseArr => [...exerciseArr, allData]);
    for(var i = 0; i < 10; i++){
      input[i].id = counter + i;
      // input[i].id = i + 1;
    }
    setCount(counter + 10);
    setExerciseArr(input);
  }

  async function selectWorkout(num) {
    setWorkoutNum(num);
    const auth = getAuth();
    const user = auth.currentUser;
    setUserUID(user.uid);

    const docNameArr = []; //every account doc ID


    const collectionName = "workout" + num;
    
    const querySnapshot = await getDocs(collection(db, "accounts", user.uid, collectionName));
    querySnapshot.forEach((doc) => {
      if(doc.id != "temp"){
        docNameArr.push(doc.id);
      }
    });

    
    let tempString = "";
    for(var i = 0; i < docNameArr.length; i++){
      tempString += docNameArr[i] + " | "
    }
    tempString = tempString.substring(0, tempString.length - 3);
    setWorkoutString(tempString);
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
    <View style={newStyles.container}>
      <View style={styles.searchView}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Workout"
          placeholderTextColor="#edf9ff"
          color="#edf9ff"
          onChangeText={(search1) => setSearch1(search1)}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Category"
          placeholderTextColor="#edf9ff"
          color="#edf9ff"
          onChangeText={(search2) => setSearch2(search2)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={submitInput}>
          <Text>Call API</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.playlist}>
        <Text style={styles.playlistText}>Save to playlist</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => selectWorkout(1)}
          >
            <Text> Workout 1 </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => selectWorkout(2)}
          >
            <Text> Workout 2 </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => selectWorkout(3)}
          >
            <Text> Workout 3 </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.playlistText}> {workoutString} </Text>
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

            <View style={modalStyles.flipCardView}>
              <FlipCard style={modalStyles.flipCard}
                friction={6}
                perspective={10000}
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
            <Text style={modalStyles.flipMuscleText}>{ modalInfo.muscle }</Text>

            </View>

           <Text>{modalInfo.equipment}</Text>

            <View style={modalStyles.controlView}>
              <TouchableOpacity style={modalStyles.controlImg1} onPress={() => modalButtons("LEFT")}>
                <Text style={{color: "#fff", fontSize: "20", alignSelf: "center"}}> Left </Text>
                <Icon
                  name="arrow-left-thin-circle-outline"
                  type="material-community"
                  size={80}
                />
              </TouchableOpacity> 
              <TouchableOpacity style={modalStyles.controlImg1} onPress={() => modalButtons("ADD")}>
                <Text style={{color: "#fff", fontSize: "20", alignSelf: "center"}}> Add </Text>
                <Icon
                  name="plus-circle-outline"
                  type="material-community"
                  size={60}
                />
              </TouchableOpacity> 
              <TouchableOpacity style={modalStyles.controlImg1} onPress={() => modalButtons("RIGHT")}>
                <Text style={{color: "#fff", fontSize: "20", alignSelf: "center"}} > Right </Text>
                <Icon
                  name="add-circle"
                  type="material"
                  size={60}
                />
              </TouchableOpacity> 
            </View>

            <TouchableOpacity style={[styles.modalButton, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={modalStyles.closeText}> Return </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView style={newStyles.scrollContainer1}>
        <View style={newStyles.scrollContainer2}>
          {exerciseArr.map((info, index) => (
            <View key={index} style={newStyles.cardComp}>
              <View style={newStyles.cardTextView}>
                <Text style={newStyles.cardText1}> {info.name} </Text>
                <Text style={newStyles.cardText2}> {info.difficulty} </Text>
              </View>
              <View style={styles.buttonView}>
                {/* <TouchableOpacity style={styles.cardButton} onPress={() => saveExercise(info.id)}>
                  <Text> Save </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={[newStyles.cardInfoBtn]}
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
                    color="#ffffff"
                    name="information-outline"
                    type="material-community"
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
    backgroundColor: '#505075',
    width: "100%",
    height: "8%",
    justifyContent: "center",
    alignContent: "center"
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: "center",
    fontSize: 20,
  },

  flipCardView: {
    backgroundColor: "grey", 
    flex: 1, 
    // maxHeight: 200*2 + 10, 
    // width: 250,
    alignItems: "center",
  },
  flipCard: {
    marginTop: 10,
    height: 200 * 1.8,
    width: 100 * 1.8,
    maxHeight: 200 * 1.8,
    maxWidth: 180 * 1.8,
    bordercolor: "#fff",
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  flipContainers: {
    // maxHeight: 200 * 1.7,
    // maxWidth: 100 * 1.7,
    // marginTop: 20,
    backgroundColor: "cyan",
    borderRadius: 10,
  },
  imageStyle: {
    maxHeight: "100%",
    maxWidth: "100%",
    // height: "95%",
    // width: "95%",
    backgroundColor: "#e9ccff",
    borderRadius: 10,
  },
  flipMuscleText: {
    fontSize: 20,

  },

  controlView: {
    marginTop: 80,
    flexDirection: "row",
    backgroundColor: "red",
    width: 300,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
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

const newStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#0d0d12',
  },

  scrollContainer1: {
    flex: 1,
    // width: "100%",
    // height: "100%",
    // // backgroundColor: "cyan",
    // maxHeight: 495,
    // alignContent: "center"
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
