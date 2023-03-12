import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Modal, Pressable, ScrollView} from 'react-native';
import { Button } from 'react-native-paper';
import axios from "axios";
import { Card } from 'react-native-paper';

export default function Workout() {

  const [exerciseArr, setExerciseArr] = useState([
    // {id: "0", equipment: '111dumbbell', muscle: "444biceps"},
    // {id: "1", equipment: '222barbell', muscle: "555biceps"},
    // {id: "2", equipment: '333machine', muscle: "666biceps"},
    {id: "0", equipment: 'equipment1', muscle: "muscle1"},
    {id: "1", equipment: 'equipment2', muscle: "muscle2"},
    {id: "2", equipment: 'equipment3', muscle: "muscle3"},
  ]);

  const removeElement = (index) => {
    console.log("remove exercise")
    // const newFruits = fruits.filter((_, i) => i !== index);
    const newExerciseArr = exerciseArr.filter(a => a.id !== index);
    // console.log(index);
    setExerciseArr(newExerciseArr);
  };

  const [search, setSearch] = useState("biceps");
  const [counter, setCount] = useState(3);

  const addInfo = () => {
    console.log("yuhgf");
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
      params: {muscle: {search}},
      headers: {
        'X-RapidAPI-Key': 'd1b21c7c74msh10859b8b93cc3adp10d1c8jsncacbeda663df',
        'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
      const allData = response.data;

    }).catch(function (error) {
      console.error(error);
    }); 

  }

  const [modalVisible, setModalVisible] = useState(false);
  const [modalDirections, setModalDirections] = useState("");

  return (
    <View style={styles.container}>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Search Workout"
          placeholderTextColor="#003f5c"
          onChangeText={(search) => setSearch(search)}
        /> 
      </View> 
      <TouchableOpacity style={styles.button1} onPress={callAPI}>
        <Text>Call API</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button1} onPress={() => addInfo()}>
        <Text>Add Info</Text>
      </TouchableOpacity>

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
            <Text style={styles.modalText}>{modalDirections}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
          </View>
        </View>
      </Modal>
      
      <ScrollView style={styles.scrollStyle}>
      <View style={styles.container}>
        {exerciseArr.map((hello, index) => (
          <View key={index} style={{backgroundColor: "white", marginTop: 10, }}>
            <Text> {hello.muscle + " | " + hello.equipment + " | " + hello.id} </Text>
            <TouchableOpacity style={styles.button1} onPress={() => removeElement(hello.id)}>
              <Text> Remove </Text>
            </TouchableOpacity>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            setModalVisible(true);
            setModalDirections(hello.muscle + " | " + hello.equipment)
          }}>
          <Text style={styles.textStyle}>Details</Text>
        </Pressable>
          </View>
          ))}
        </View>
      </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
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
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    width: 200,
    marginLeft: 5,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "left",
    marginTop: 20,
  },
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
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
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
      flex: 1,
      backgroundColor: "cyan",
      maxHeight: 400,
    }

});
