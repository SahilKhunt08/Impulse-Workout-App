import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Modal, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import axios from "axios";
import { Card } from 'react-native-paper';

export default function Workout() {

  const [fruits, setFruits] = useState([
    {id: "0", equipment: '111dumbbell', muscle: "444biceps"},
    {id: "1", equipment: '222barbell', muscle: "555biceps"},
    {id: "2", equipment: '333machine', muscle: "666biceps"},
    // 'Orange',
    // 'Banana',
    // 'Apple',
  ]);
  const removeElement = (index) => {
    console.log("remove exercise")
    // const newFruits = fruits.filter((_, i) => i !== index);
    const newFruits = fruits.filter(a => a.id !== index);
    // console.log(index);
    setFruits(newFruits);
  };

  const [search, setSearch] = useState("biceps");
  // const [squares, setSquares] = useState([<Square />, <Square />, <Square />]);
  const [workCard, setWorkcard] = useState([]); //[<WorkCard />, <WorkCard />, <WorkCard />]
  const [counter, setCount] = useState(3);

  const removeCards = () => {
    // console.log(workCard);
    setWorkcard([]);
  }

  const addInfo = () => {
    console.log("yuhgf");
    // fruits.push({
    //   id: counter, equipment: "tools", muscle: "lats",
    // });
    setFruits([...fruits, {id: counter, equipment: "tools", muscle: "lats",}])
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

  const WorkCard = (props) => {
    console.log(props);
    return(
    
  <Card key={Math.floor(Math.random() * 100) + 1}>
    <Text style={styles.paragraph}> {props.temp1} </Text>
  {/* <Button onClick={() => doStuff()}> Remove </Button> */}
  <TouchableOpacity key={Math.floor(Math.random() * 100) + 1} style={styles.button} onPress={() => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(randomNumber)
    console.log(workCard.id + " | " + workCard.key);
    // setWorkcard(
    //   workCard.filter(a =>
    //     a.id !== workCard.id
    //   )  
    // );
    setWorkcard(workCard.filter((v, i) => i !== workCard.length - 1))
    }}>
    <Text>Press Here</Text>
  </TouchableOpacity>
</Card>
);
  }

  const [modalVisible, setModalVisible] = useState(false);


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

      <TouchableOpacity style={styles.button1} onPress={removeCards}>
        <Text>Remove Cards</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button1} onPress={() => setWorkcard([...workCard, <WorkCard temp1={"hello"}/>])}>
        <Text>Add Card</Text>
      </TouchableOpacity>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}

      {/* <View styles={{width: "200", height: "250", backgroundColor: "cyan"}}>
        {squares.map(elem => elem)}
      </View> */}

      <View styles={{width: "200", height: "250", backgroundColor: "cyan"}}>
        {workCard.map(elem => elem)}
      </View>

      {/* <View style={styles.container}>
      {persons.map((person) => {
        return (
          <View key={Math.floor(Math.random() * 100) + 1}>
            <Text style={styles.item}>{person.name}</Text>
          </View>
        );
      })}
    </View> */}

      {/* <TouchableOpacity style={styles.button} onPress={() => setWorkcard([...workCard, <WorkCard />])}> */}
        {/* <Text>Add Fruit</Text> */}
      {/* </TouchableOpacity> */}

      <TouchableOpacity style={styles.button1} onPress={() => addInfo()}>
        <Text>Add Info</Text>
      </TouchableOpacity>

    <View style={styles.container}>
      {fruits.map((hello, index) => (
        <View key={index} style={{backgroundColor: "white", marginTop: 10, }}>
          <Text> Info Here</Text>
          <TouchableOpacity style={styles.button1} onPress={() => removeElement(hello.id)}>
            <Text> {hello.muscle + " | " + hello.id} </Text>
          </TouchableOpacity>
          {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{hello.muscle + hello.equipment}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
        </View>
        ))}
      </View>


    </View>
  )
}

// const WorkCard = () => (
//   <Card>
//     <Text style={styles.paragraph}>
//       Name Name
//     </Text>
//     {/* <Button onClick={() => doStuff()}> Remove </Button> */}
//     <TouchableOpacity style={styles.button} onPress={() => {
      
//       console.log("yuh")
      
//       }}>
//       <Text>Press Here</Text>
//     </TouchableOpacity>
//     {/* <Button onClick={() => {
//       setWorkcard(
//         workCard.filter(a =>
//           a.id !== workCard.id
//         )  
//       );
//     }} > Delete </Button> */}
//   </Card>
// );

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

});
