import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import axios from "axios";
import { Card } from 'react-native-paper';

export default function Workout() {

  const [search, setSearch] = useState("biceps");
  // const [squares, setSquares] = useState([<Square />, <Square />, <Square />]);
  const [workCard, setWorkcard] = useState([<WorkCard />, <WorkCard />, <WorkCard />]);


  const callAPI = () => {
    console.log(search);
    const options = {
      method: 'GET',
      url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
      params: {muscle: 'biceps'},
      headers: {
        'X-RapidAPI-Key': 'd1b21c7c74msh10859b8b93cc3adp10d1c8jsncacbeda663df',
        'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
      }
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    }); 

  }


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

      <TouchableOpacity style={styles.button} onPress={callAPI}>
        <Text>Press Here</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button} onPress={() => setSquares([...squares, <Square />])}>
        <Text>Add Square</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.button} onPress={() => setWorkcard([...workCard, <WorkCard />])}>
        <Text>Add Card</Text>
      </TouchableOpacity>

      {/* <View styles={{width: "200", height: "250", backgroundColor: "cyan"}}>
        {squares.map(elem => elem)}
      </View> */}

      <View styles={{width: "200", height: "250", backgroundColor: "cyan"}}>
        {workCard.map(elem => elem)}
      </View>
    </View>
  )
}

const WorkCard = () => (
  <Card>

  </Card>
);

const Square = () => (
  <View
    style={{
      width: 50,
      height: 50,
      backgroundColor: '#4287f5',
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    backgroundColor: '#429692',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 5,
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    width: 150,
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

});