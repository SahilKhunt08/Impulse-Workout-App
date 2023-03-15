import React, { useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Image, TextInput, ScrollView} from 'react-native';
import { Card } from 'react-native-paper';
import { Avatar } from '@rneui/themed';
import { auth } from './firebase';
import {db} from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, getDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, query} from "firebase/firestore"; 

export default function Profile() {

  const [username, setUsername] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  async function saveProfile() {
    const allDocInfo = [];
    const docRef1 = doc(db, "accounts", user.uid);
    const docSnap = await getDoc(docRef1);

    if (docSnap.exists()) {
      // allDocInfo[0] = docSnap.data().var1; //name of field
      // allDocInfo[1] = docSnap.data().var2; //name of field
      allDocInfo[2] = docSnap.data().username;
    } else {
      console.log("No such document!");
    }

    const docRef2 = await setDoc(doc(db, "accounts", user.uid), {
      // var1: allDocInfo[0],
      // var2: allDocInfo[1],
      username: username,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.profilePicture}>
        <Avatar
          size={150}
          rounded
          source={require('../assets/person2.png')}
        ></Avatar>
      </View>
      <View style={{flexDirection: "row", alignItems: "center"}}>
      <Card>
      <TextInput
          style={styles.paragraph}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        /> 
        {/* <Image source={require('../assets/person1.png')}></Image> */}
      </Card>
      <TouchableOpacity style={styles.button2} onPress={saveProfile}>
        <Text> Save </Text>
      </TouchableOpacity>
      </View>

      <View style={styles.requestContainer}>
        <View style={styles.requestTitleBar}>
         <Text style={styles.requestTitle}> Friend Requests</Text>
        </View>

        <ScrollView style={styles.scrollStyle}>
          <View style={styles.container2}>
            <Text>Gekfrgegwg</Text>

          </View>


        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
    backgroundColor: '#7ab3d6',
    alignContent: "center",
    alignItems: "center",
  },
  container2: {
    alignItems: "center",
  },
  requestContainer: {
    backgroundColor: "#40c5c7",
    borderRadius: 5,
    borderWidth: 3,
    alignItems: "center",
    width: "100%",
    height: "62%",
    marginTop: 10,
  },
  requestTitleBar: {
    backgroundColor: "#319b9e",
    width: "100%",
    alignItems: "center",
    height: "10%",
    justifyContent: "center",
  },
  requestTitle: {
    fontSize: 20,
    // marginTop: 10,
    // marginHorizontal: 10,
  },
  profilePicture: {
    // marginTop: 5,
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20
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
  scrollStyle: {
    // marginTop: 10,
    // flex: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: "cyan",
    maxHeight: 495,
    alignContent: "center"
  },
});