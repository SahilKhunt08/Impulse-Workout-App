import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Modal, Pressable, ScrollView} from 'react-native';
import { Button } from 'react-native-paper';
import axios from "axios";
import { Card } from 'react-native-paper';

export default function Workout() {

  const [exerciseArr, setExerciseArr] = useState([
    {id: "0", equipment: 'equipment1', muscle: "muscle1"},
    {id: "1", equipment: 'equipment2', muscle: "muscle2"},
    {id: "2", equipment: 'equipment3', muscle: "muscle3"},
  ]);

  const saveExercise = (index) => {
    console.log("Save Exercise")
    // const newFruits = fruits.filter((_, i) => i !== index);
    const newExerciseArr = exerciseArr.filter(a => a.id !== index);
    // console.log(index);
    setExerciseArr(newExerciseArr);
  };

  const addInfo = () => {
    console.log("Adding Info");
    // fruits.push({
    //   id: counter, equipment: "tools", muscle: "lats",
    // });
    setExerciseArr([...exerciseArr, {id: counter, equipment: "tools", muscle: "lats",}])
    setCount(counter + 1)
    console.log(counter);
  }

  const callAPI = () => {
    console.log(search);
    const options = {
      method: 'GET',
      url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
      params: {muscle: search},
      headers: {
        'X-RapidAPI-Key': 'd1b21c7c74msh10859b8b93cc3adp10d1c8jsncacbeda663df',
        'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      // console.log(response.data);
      const allData = response.data;
      console.log("----------------------");
      // setExerciseArr(exerciseArr => [...exerciseArr, allData]);
      for(var i = 0; i < 10; i++){
        allData[i].id = counter + i;
      }
      setCount(counter + 10);
      setExerciseArr(allData);
      // console.log(exerciseArr);

    }).catch(function (error) {
      console.error(error);
    }); 
  }

  const [search, setSearch] = useState("biceps");
  const [counter, setCount] = useState(3);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDirections, setModalDirections] = useState("");
  const [modalInfo, setModalInfo] = useState("");

  return (
    <View style={styles.container}>

      <View style={styles.searchView}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Workout"
          placeholderTextColor="#003f5c"
          onChangeText={(search) => setSearch(search)}
        /> 
        <TouchableOpacity style={styles.searchButton} onPress={callAPI}>
          <Text>Call API</Text>
        </TouchableOpacity>
      </View> 

      {/* <TouchableOpacity style={styles.button2} onPress={() => addInfo()}>
        <Text>Add Info</Text>
      </TouchableOpacity> */}

      <View style={styles.playlist}>
        <Text>Save to playlist</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalInfo}</Text>
            <Text style={styles.modalText}>{modalDirections}</Text>
              <Pressable
                style={[styles.modalButton, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close Directions</Text>
              </Pressable>
          </View>
        </View>
      </Modal>
      
      <ScrollView style={styles.scrollStyle}>
      <View style={styles.container}>
        {exerciseArr.map((info, index) => (
          <View key={index} style={styles.workoutCard}>
            <Text> {info.name + " — " + info.muscle + " — " + info.id} </Text>
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.cardButton} onPress={() => saveExercise(info.id)}>
                <Text> Save </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cardButton]}
                onPress={() => {
                setModalVisible(true);
                setModalDirections(info.instructions)
                setModalInfo(
                  "Name: " + info.name + " \n" + 
                  "Muscle: " + info.muscle + " \n " + 
                  "Equipment: " + info.equipment + " \n " +
                  "Type: " + info.type + " — " + info.difficulty)
                }}>
                <Text>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
          ))}
        </View>
      </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({

  playlist: {
    backgroundColor: "cyan",
    borderRadius: 5,
    borderWidth: 3,
    alignItems: "center",
    width: "90%",
    height: "30%"
  },

  //————————————————————————————————————————————————————————————————
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: '#429692',
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
    backgroundColor: "#FFC0CB",
    borderRadius: 20,
    maxWidth: "75%", 
    marginRight: 10,
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
