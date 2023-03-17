import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Modal, Pressable} from "react-native";
import { auth } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, updateDoc,getDoc} from "firebase/firestore"; 
import {db} from './firebase';
import { Button } from 'react-native-paper';


export default function AddFriends({ navigation }) {

  let shouldLoad = true;
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(shouldLoad){
        shouldLoad = false;
        loadFriends();       
      }
    });
    return unsubscribe;
  }, []);


  const [friendID, setFriendID] = useState("")
  const [friendsArr, setFriendsArr] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUser, setModalUser] = useState("");
  const [modalBody, setModalBody] = useState("Exercises Here");
  const [exerciseInput1, setExerciseInput1] = useState("");
  const [exerciseInput2, setExerciseInput2] = useState("");

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
    if(friendID !== accountUsername){
    querySnapshot.forEach(doc => {
        if (friendID === doc.data().username){
          addFriendToUserDoc(doc.id)
          setFriendID("");
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
  
  async function loadFriends(){
    const auth = getAuth();
    const user = auth.currentUser;
    const querySnapshot1 = await getDocs(collection(db, "accounts", user.uid, "friends"));
    let docIdArr = [];
    querySnapshot1.forEach((doc) => {
      if(doc.id != "temp"){
        docIdArr.push(doc.id);
      }
    });


    const querySnapshot2 = await getDocs(collection(db, "accounts"));
    let namesArr= [];
    let IDArr = [];
    querySnapshot2.forEach((doc) => {
      if(docIdArr.includes(doc.id)){
        namesArr.push(doc.data().username);
        IDArr.push(doc.id);
      }
    });
    let combinedArr = [];
    for(var i = 0; i < namesArr.length; i++){
      combinedArr[i] = {name: namesArr[i], id: IDArr[i]}
    }
    setFriendsArr(combinedArr);
  }

  async function loadFriendWorkout(num) {
  
    let pos = 0;
    for(var i = 0; i < friendsArr.length; i++){
      if(modalUser == friendsArr[i].name){
        pos = i;
      }
    }

    let workoutString = "";
    const collectionName = "workout" + num;
    const querySnapshot = await getDocs(collection(db, "accounts", friendsArr[pos].id, collectionName));
    querySnapshot.forEach((doc) => {
      if(doc.id != "temp"){
        workoutString += "• " + doc.id + "\n";
      }
    });
    if(workoutString == ""){
      workoutString = "Exercises Here";
    } else{
      workoutString = workoutString.substring(0, workoutString.length - 1);
    }
    setModalBody(workoutString);
  }

  async function addExerciseSelf() {
    const auth = getAuth()
    const user = auth.currentUser
    const workoutPath = "workout" + exerciseInput2;
    let canAdd = false;

    const querySnapshot1 = await getDocs(collection(db, "exercises"));
    querySnapshot1.forEach((doc) => {
      if(doc.id == exerciseInput1){
        canAdd = true;
      }
    });

    if(canAdd){
      await setDoc(doc(db, "accounts", user.uid, workoutPath, exerciseInput1), {
      })
    } else {
      console.log("Exercise doesn't exist")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.addFriendView}>
        <View style={{width: 200}}>
        <TextInput
          style={styles.loginTextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(friendID) => setFriendID(friendID)}
        /> 
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={sendFriendRequest} >
          <Text style={styles.loginText}>Add Friend</Text> 
        </TouchableOpacity> 
      </View>

      <View style={styles.addExerciseView}>
        <View style={{width: 200, flexDirection: "row"}}>
        <TextInput
          style={styles.addExerciseInput1}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(exerciseInput1) => setExerciseInput1(exerciseInput1)}
        /> 
        <TextInput
          style={styles.addExerciseInput2}
          placeholder="Num"
          placeholderTextColor="#003f5c"
          onChangeText={(exerciseInput2) => setExerciseInput2(exerciseInput2)}
        /> 
        </View>
        <TouchableOpacity style={styles.loginBtn} >
          <Text style={styles.loginText} onPress={addExerciseSelf}>Add Exercise</Text> 
        </TouchableOpacity> 
      </View>

      <View style={styles.friendsContainer}>
        <Text style={styles.friendsTitle}> Friends </Text>
        <ScrollView style={styles.scrollStyle}>
          <View style={{alignItems: "center"}}>
          {friendsArr.map((info, index) => (
            <View key={index}>
              <TouchableOpacity onPress={() => {
                setModalVisible(true);
                // setModalDirections(info.instructions)
                setModalUser(info.name)
                }}>
                <View style={styles.friendNamesView}>
                  <Text style={styles.friendNames}> {info.name} </Text>  
                </View>
              </TouchableOpacity>
            </View>
          ))}
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalUserText}>{modalUser}</Text>

            <View style={{flexDirection: "row", marginBottom: 20,}}>
              <TouchableOpacity style={styles.workoutButton} onPress={() => loadFriendWorkout(1)}>
                <Text > Workout 1 </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.workoutButton} onPress={() => loadFriendWorkout(2)}>
                <Text > Workout 2 </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.workoutButton} onPress={() => loadFriendWorkout(3)}>
                <Text > Workout 3 </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBodyView}>
              <Text style={styles.modalBodyText}>{ modalBody }</Text>
            </View>

              <Pressable
                style={[styles.modalButton, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>

          </View>  
        </View>
      </Modal>

     </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#adc9db',
  },
  addFriendView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#749cb5",
    width: "100%",
  },
  loginBtn: {
    width: 120,
    borderRadius: 5,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#507a94",
    marginHorizontal: 5,
  },
  loginText: {
    fontSize: 18,
  },
  loginTextInput: {
    height: 65,
    fontSize: 18,
  },
  addExerciseInput1: {
    height: 65,
    fontSize: 18,
    width: "70%",
    maxWidth: "70%"
  },
  addExerciseInput2: {
    height: 65,
    fontSize: 18,
    width: "20%",
    maxWidth: "20%"
  },
//—————————————————————————————————————————————————————
  friendsContainer: {
    marginTop: 100,
    backgroundColor: "#91b6cf",
    height: 300,
    width: "100%",
    borderWidth: 2,
    alignItems: "center",
  },
  friendsTitle: {
    fontSize: 22,
    marginTop: 10,
  },
  friendNamesView: {
    backgroundColor: "#7c9bb2",
    width: 400,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
  },
  friendNames: {
    fontSize: 20,
  },
  scrollStyle: {
    height: "10%",
    marginTop: 15,
    width: "100%",
  },
//—————————————————————————————————————————————————————
  addExerciseView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#749cb5",
    width: "100%",
    // position: 'absolute', 
    // bottom: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
},
//—————————————————————————————————————————————————————
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
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalUserText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: "bold",
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  workoutButton: {
    alignItems: 'center',
    backgroundColor: '#6b99c9',
    padding: 10,
    marginTop: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  modalBodyView: {
    backgroundColor: "#cedceb",
    marginTop: 15, 
    marginBottom: 25,
    minWidth: 250,
    alignItems: "center",
    borderRadius: 5,
  },
  modalBodyText: {
    fontSize: 20,
    marginVertical: 10,
  },
});