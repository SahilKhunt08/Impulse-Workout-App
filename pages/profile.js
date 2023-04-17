import React, { useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Image, TextInput, ScrollView} from 'react-native';
import { Card } from 'react-native-paper';
import { Avatar} from '@rneui/themed';
import { auth } from './firebase';
import {db} from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, getDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, query, deleteDoc} from "firebase/firestore"; 

export default function Profile({ navigation }) {

  const [username, setUsername] = useState("");
  const [requestName, setRequestName] = useState("");
  const [requestArr, setRequestArr] = useState([]);
  const [count, setCount] = useState(0);
  const [workoutNamesArr, setWorkoutNamesArr] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const LeftContent = props => <Avatar.Icon {...props} icon="human" />

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      initialize();
    });
    return unsubscribe;
  }, []);

  async function initialize() {
    const docIdArr = [];
    const requestInfoArr = [];
    const querySnapshot = await getDocs(collection(db, "accounts", user.uid, "requests"));
    querySnapshot.forEach((doc) => {
      if(doc.id != "temp"){
        docIdArr.push(doc.id);
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

    const docRef = doc(db, "accounts", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUsername(docSnap.data().username);
      setWorkoutNamesArr(docSnap.data().workoutsArr);
    } else {
      console.log("No such document!");
    }
  }

  async function saveProfile() {
    const docRef2 = await setDoc(doc(db, "accounts", user.uid), {
      username: username,
      workoutsArr: workoutNamesArr,
    });
  }

  async function sendFriendRequest() {
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(db, "accounts", user.uid);
    const docSnap = await getDoc(docRef);
    let accountUsername = "";
    if (docSnap.exists()) {
      accountUsername = docSnap.data().username;
    } else {
      console.log("No such document!");
    }

    const accountsColRef = collection(db, "accounts"); 
    const querySnapshot = await getDocs(accountsColRef);
    if(requestName !== accountUsername){
    querySnapshot.forEach(doc => {
        if (requestName === doc.data().username){
          addFriendToUserDoc(doc.id)
          requestName("");
          console.log("matches")
        }
      });
    }
  }

  async function addFriendToUserDoc(friendID) {
    const auth = getAuth()
    const user = auth.currentUser

    await setDoc(doc(db, "accounts", friendID, "requests", user.uid), {
      id: user.uid
    })
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
        <Avatar size={150} rounded source={require('../assets/person2.png')}></Avatar>
      </View>

      <View style={styles.usernameView}>
        <TextInput
            style={styles.usernameInput}
            placeholder={username}
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

        <View style={styles.sendRequestView}>
          <TextInput
            style={styles.requestNameInput}
            placeholder= "Name Here"
            placeholderTextColor= "#f2e6ff"
            onChangeText={(requestName) => setRequestName(requestName)}
          /> 
          <TouchableOpacity style={styles.sendRequestBtn} onPress={sendFriendRequest}>
            <Text style={styles.sendRequestBtnText}>Send Request</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollStyle}>
          <View style={styles.container2}>
          {requestArr.map((info, index) => (
          <View key={index} style={styles.workoutCard}>
            <View style={styles.friendNameView}>
              <Text style={styles.friendNameText}> {info.name} </Text>
            </View>
            <View style={styles.twoButtonView}>
              <TouchableOpacity style={styles.requestButton1} onPress={() => addButton(info.id)}>
                <Text style={styles.requestText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.requestButton2} onPress={() => denyButton(info.id)}>
                <Text style={styles.requestText}>Deny</Text>
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
    color: "#fff",
   

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
  requestButton1: {
    borderRadius: 8,
    borderWidth: 3,
    alignItems: "center",
    backgroundColor: "#70a17e",
    margin: 5,
    height: 40,
    width: 60,
    justifyContent: "center",
  },
  requestButton2: {
    borderRadius: 8,
    borderWidth: 3,
    alignItems: "center",
    backgroundColor: "#c76565",
    margin: 5,
    height: 40,
    width: 60,
    justifyContent: "center",
  },
  workoutCard: {
    marginTop: 10,
    width: "90%",
    backgroundColor: "#463e4f",
    bordercolor: "black",
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  }, 

  usernameView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  usernameInput: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#404057",
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: "center",
    backgroundColor: '#0d0d12',
    padding: 10,
    marginLeft: 50,
    marginRight: 10,
    color: "#fff",
    width: "50%",
  },
  friendNameView: {
    width: "55%",
    justifyContent: "center",
    height: 30,
  },
  friendNameText: {
    fontSize: 20,
    color: "#f2e6ff",
    marginLeft: 5,
  },
  twoButtonView: {
    alignItems: "center",
    flexDirection: "row",
  },
  requestText: {
    fontSize: 17,
    fontWeight: "600",
  },

  sendRequestView: {
    marginTop: 10,
    width: "90%",
    backgroundColor: "#463e4f",
    bordercolor: "black",
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  requestNameInput: {
    width: "55%",
    fontSize: 20,
    color: "#f2e6ff",
    marginLeft: 5,
  },
  sendRequestBtn: {
    borderRadius: 8,
    borderWidth: 3,
    alignItems: "center",
    backgroundColor: "#70a17e",
    margin: 5,
    height: 40,
    // width: 90,
    paddingHorizontal: 7,
    justifyContent: "center",
  },
  sendRequestBtnText: {
    fontSize: 17,
    fontWeight: "600",
  },
});

//Code for box shadows
// shadowColor: '#171717',
// shadowOffset: {width: -2, height: 4},
// shadowOpacity: 0.2,
// shadowRadius: 3,
