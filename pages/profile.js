import React, { useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Image, TextInput, ScrollView} from 'react-native';
import { Card } from 'react-native-paper';
import { Avatar} from '@rneui/themed';
import { auth } from './firebase';
import {db} from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, getDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, query, deleteDoc} from "firebase/firestore"; 

export default function Profile({ navigation }) {
  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadRequests();
    });
    return unsubscribe;
  }, []);

  const [username, setUsername] = useState("");
  // const [requestArr, setRequestArr] = useState([{name: "temp", id: "temp"}]);
  const [requestArr, setRequestArr] = useState([]);
  const [count, setCount] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;
  const LeftContent = props => <Avatar.Icon {...props} icon="human" />

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

  async function loadRequests() {
    const docIdArr = [];
    const requestInfoArr = [];
    const querySnapshot = await getDocs(collection(db, "accounts", user.uid, "requests"));
    querySnapshot.forEach((doc) => {
      if(doc.id != "temp"){
        docIdArr.push(doc.id); //Doc IDs of every friend request
      }
    });

    let currentNum = count;
    for(var i = 0; i < docIdArr.length; i++){
      const docRef = doc(db, "accounts", docIdArr[i]);
      const docSnap = await getDoc(docRef);
      requestInfoArr.push({name: docSnap.data().username, id:currentNum});
      currentNum++;
    }

    setCount(currentNum);
    setRequestArr(requestInfoArr);
  }

  async function addButton(index) { 
    const addedFriend = requestArr.filter(a => a.id === index);
    const newRequestArray = requestArr.filter(a => a.id !== index);
    setRequestArr(newRequestArray);
    console.log("Added Friend")
    let acceptedName = addedFriend[0].name;

    //Removed friend request
    const querySnapshot = await getDocs(collection(db, "accounts"));
    querySnapshot.forEach((doc) => {
      if(doc.data().username == acceptedName){
        acceptedName = doc.id;
      }
    });
    await deleteDoc(doc(db, "accounts", user.uid, "requests", acceptedName));

    //Adds friend to your account
    await setDoc(doc(db, "accounts", user.uid, "friends", acceptedName), {
      username: acceptedName,
    });

    //Adds your account to the friend
    await setDoc(doc(db, "accounts", acceptedName, "friends", user.uid), {
      username: user.uid,
    });
  }

  async function denyButton(index) {
    const deniedArr = requestArr.filter(a => a.id === index);
    let deniedName = deniedArr[0].name;
    
    //Removed friend request
    console.log(deniedName);
    const querySnapshot = await getDocs(collection(db, "accounts"));
    querySnapshot.forEach((doc) => {
      if(doc.data().username == deniedName){
        deniedName = doc.id;
      }
    });
    await deleteDoc(doc(db, "accounts", user.uid, "requests", deniedName));

    const tempArr = requestArr.filter(a => a.id !== index);
    setRequestArr(tempArr);
  }

  return (
    <View style={styles.container}>

      <View style={{left: 150, flexDirection:'row-reverse', justifyContent:'flex-start', flexWrap:'nowrap' }}>
        <TouchableOpacity  onPress={saveProfile}>
            <Image source={ require('../assets/settingsIcon.png') } style={ { width: 35, height: 35 } } />
        </TouchableOpacity>
        
      </View>

      <View style={styles.profilePicture}>
        <Avatar
          size={150}
          rounded
          source={require('../assets/person2.png')}
        ></Avatar>
       
      </View>

      <View style={{flexDirection: "row", alignItems: "center",}}>
          <TextInput
              style={styles.paragraph}
              placeholder="Username"
              placeholderTextColor= "#ffffff"
              onChangeText={(username) => setUsername(username)}
            /> 
          <TouchableOpacity  onPress={saveProfile}>
            <Image source={ require('../assets/checkmark1.png') } style={ { width: 40, height: 40 } } />

          </TouchableOpacity>
      </View>

      <View style={styles.requestContainer}>
        <View style={styles.requestTitleBar}>
         <Text style={styles.requestTitle}> Friend Requests</Text>
        </View>

        <ScrollView style={styles.scrollStyle}>
          <View style={styles.container2}>
          {requestArr.map((info, index) => (
          <View key={index} style={styles.workoutCard}>
            <Text> {info.name} </Text>
            <View style={{alignItems: "center", flexDirection: "row",}}>
              <TouchableOpacity style={styles.requestButton} onPress={() => addButton(info.id)}>
                <Text> Add </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.requestButton} onPress={() => denyButton(info.id)}>
                <Text> Deny </Text>
              </TouchableOpacity>
            </View>
          </View>
          ))}
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
    backgroundColor: '#0d0d12',
    alignContent: "center",
    alignItems: "center",
  },
  container2: {
    alignItems: "center",
  },
  requestContainer: {
    backgroundColor: "#0d0d12",
    borderWidth: 2,
    borderColor: "#555070",
    alignItems: "center",
    width: "100%",
    height: "60%",
    marginTop: 10,
  },
  requestTitleBar: {
    backgroundColor: "#0d0d12",
    width: "100%",
    alignItems: "center",
    height: "10%",
    justifyContent: "center",
  },
  requestTitle: {
    fontSize: 20,
    color: "#ffffff"

  },
  profilePicture: {
    marginBottom: 15,
  },
  paragraph: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#404057",
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#0d0d12',
    padding: 10,
    marginTop: 5,
    marginHorizontal: 5,
   

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
    width: "100%",
    height: "100%",
    maxHeight: 495,
    alignContent: "center"
  },
  requestButton: {
    borderRadius: 15,
    borderWidth: 3,
    alignItems: "center",
    backgroundColor: "white",
    margin: 5,
    height: 40,
    width: 60,
    justifyContent: "center",
  },
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
});

//Code for box shadows
// shadowColor: '#171717',
// shadowOffset: {width: -2, height: 4},
// shadowOpacity: 0.2,
// shadowRadius: 3,

