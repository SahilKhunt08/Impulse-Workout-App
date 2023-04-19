import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Modal, Pressable, MaskedViewComponent, KeyboardAvoidingView} from "react-native";
import { auth } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, updateDoc, getDoc} from "firebase/firestore"; 
import {db} from './firebase';
import { Button } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import { Icon } from '@rneui/themed';
import Divider from 'react-native-divider';

export default function AddFriends({ navigation }) {

  const [friendID, setFriendID] = useState("")
  const [friendsArr, setFriendsArr] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUser, setModalUser] = useState("");
  const [modalBody, setModalBody] = useState("Exercises Here");
  const [exerciseInput1, setExerciseInput1] = useState("");
  const [exerciseInput2, setExerciseInput2] = useState("");

//————————————————————————————————————————————————————————————————————————————————————————————————————

  const [makeModalVisible, setMakeModalVisible] = useState(false);
  const [chosenFriendsArr, setChosenFriendsArr] = useState([]);
  const [selectableFriendsArr, setSelectableFriendsArr] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputCategory, setInputCategory] = useState("");
  
  const [myLeaderboardsArr, setMyLeaderboardsArr] = useState([]); 
  const [sortedLeaderboardsArr, setSortedLeaderboardsArr] = useState({});
  const [leaderboardModalVisible, setLeaderboardModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  
  const[statInput, setStatInput] = useState();
  const[displayingArr, setDisplayingArr] = useState([]);
  const[leaderboardClicked, setLeaderboardClicked] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;

//————————————————————————————————————————————————————————————————————————————————————————————————————

  let shouldLoad = true;
  React.useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // if(shouldLoad){
        // shouldLoad = false;
        loadFriends();  
        initialize();     
      // }
    });
    return listener;
  }, []);

  async function initialize(){
    setChosenFriendsArr([]);  
    //Load all the leaderboards the user is in.
    const docRef1 = doc(db, "accounts", user.uid);
    const docSnap1 = await getDoc(docRef1);
    var joinedLeaderboardsArr = [];
    var tempMyArr = [];
    if(docSnap1.exists()){
      joinedLeaderboardsArr = docSnap1.data().leaderboardsArr;
      for(var i = 0; i < joinedLeaderboardsArr.length; i++){
        if(joinedLeaderboardsArr[i] != "temp"){
          const docRef2 = doc(db, "leaderboards", joinedLeaderboardsArr[i]);
          const docSnap2 = await getDoc(docRef2);
          tempMyArr.push(docSnap2.data())
        }
      }
    }
    setMyLeaderboardsArr(tempMyArr);
    var tempArr = tempMyArr;
    for(var x = 0; x < tempArr.length; x++){

      var currentMembersArr = tempArr[x].membersArr;
      var currentScoreArr = tempArr[x].scoresArr;
      var newMembersArr = [];
      var newScoresArr = [];

      for(var y = 0; y < tempArr[x].membersArr.length; y++){
        var max = 0;
        var index = 0;
        var mainLength = currentScoreArr.length;

        for(var z = 0; z < mainLength; z++){
          if(currentScoreArr[z] >= max){
            max = currentScoreArr[z];
            index = z;
          }
        }
        newMembersArr.push(currentMembersArr[index]);
        newScoresArr.push(currentScoreArr[index]);
        var tempArr1 = [];
        var tempArr2 = [];

        for(var j = 0; j < mainLength; j++){
          if(currentScoreArr[j] != max){
            tempArr1.push(currentScoreArr[j]);
            tempArr2.push(currentMembersArr[j]);
          }
        }
        currentScoreArr = tempArr1;
        currentMembersArr = tempArr2;
      }
      // console.log(newMembersArr);
      // console.log(newScoresArr);
      var placement = 0;
      for(var l = 0; l < newMembersArr.length; l++){
        if(user.uid == newMembersArr[l]){
          placement = l + 1; 
        }
      }
      sortedLeaderboardsArr[x] = {place: placement, sortedMembersArr: newMembersArr, sortedScoresArr: newScoresArr}
      // console.log(myLeaderboardsArr[x]);
      myLeaderboardsArr[x] = {
        category: tempMyArr[x].category,
        membersArr: tempMyArr[x].membersArr,
        name: tempMyArr[x].name,
        scoresArr: tempMyArr[x].scoresArr,
        place: placement, 
        sortedMembersArr: newMembersArr, 
        sortedScoresArr: newScoresArr,
      };
    }

      console.log("----------------------------------------------")
      // console.log(sortedLeaderboardsArr);
      // console.log(myLeaderboardsArr);
      setMyLeaderboardsArr(myLeaderboardsArr);
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
    let tempArr = [];
    for(var i = 0; i < namesArr.length; i++){
      combinedArr[i] = {name: namesArr[i], id: IDArr[i]}
      tempArr[i] = false;
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

  const openSettigsModal = () => {
    setMakeModalVisible(true);
    setChosenFriendsArr([]);
    setSelectableFriendsArr(friendsArr);
    setInputTitle("");
    setInputCategory("");
  }

  const selectFriend = (input) => {
    chosenFriendsArr.push(input);
    const tempArr = selectableFriendsArr.filter(a => a.id !== input);
    setSelectableFriendsArr(tempArr);
  }

  async function createLeaderboard(){
    setMakeModalVisible(false);
    var participantsArr = [];
    participantsArr.push(user.uid);
    var defaultScoresArr = [0];
    for(var i = 0; i < chosenFriendsArr.length; i++){
      participantsArr.push(chosenFriendsArr[i])    
      defaultScoresArr.push(0);
    }
    await setDoc(doc(db, "leaderboards", inputTitle), {
      name: inputTitle,
      category: inputCategory,
      membersArr: participantsArr,
      scoresArr: defaultScoresArr,
    });
    for(var i = 0; i < participantsArr.length; i++){
      // await setDoc(doc(db, "leaderboards", inputTitle, "members", participantsArr[i]), {
      //   score: 0,
      // });
      const docRef = doc(db, "accounts", participantsArr[i]);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        var profileArr = docSnap.data().leaderboardsArr;
        profileArr.push(inputTitle);
        await setDoc(doc(db, "accounts", participantsArr[i]), {
          username: docSnap.data().username,
          workoutsArr: docSnap.data().workoutsArr,
          leaderboardsArr: profileArr,
        });
      }
    }
  }

  async function openMainModal(input){
    var index = -1;
    for(var i = 0; i < myLeaderboardsArr.length; i++){
      if(input == myLeaderboardsArr[i].name){
        setModalInfo(myLeaderboardsArr[i])
        index = i;
        setLeaderboardClicked(myLeaderboardsArr[i].name);
        i = myLeaderboardsArr.length + 1;
      }
    }
    var tempArr = [];
    for(var j = 0; j < myLeaderboardsArr[index].membersArr.length; j++){
      const docRef1 = doc(db, "accounts", myLeaderboardsArr[index].sortedMembersArr[j]);
      const docSnap1 = await getDoc(docRef1);
      var tempName = "TEMP";
      if(docSnap1.exists()){
        tempName = docSnap1.data().username;
      }
      tempArr.push({
        member: myLeaderboardsArr[index].sortedMembersArr[j],
        score: myLeaderboardsArr[index].sortedScoresArr[j],
        name: tempName,
      });
    }
    setDisplayingArr(tempArr);
    setLeaderboardModalVisible(true);
  }

  async function updateScore() {
    // statInput
    const docRef1 = doc(db, "leaderboards", leaderboardClicked);
    const docSnap1 = await getDoc(docRef1);
    var tempArr = docSnap1.data().scoresArr;
    var index = -1;
    var IDArr = docSnap1.data().membersArr;
    for(var i = 0; i < IDArr.length; i++){
      if(user.uid == IDArr[i]){
        index = i;
        i = IDArr.length;
      }
    }
    tempArr[index] = statInput;

    const docRef2 = doc(db, "leaderboards", leaderboardClicked);
    await updateDoc(docRef2, {
      scoresArr: tempArr
    });
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity style={makeStyles.makeLeaderboardBtn} onPress={() => openSettigsModal()}>
        <Text style={makeStyles.makeLeaderboardText}>Make a Leaderboard</Text>
      </TouchableOpacity>

      <Modal  
        animationType="fade"
        transparent={true}
        visible={makeModalVisible}
        onRequestClose={() => {Alert.alert('Modal has been closed.'); setMakeModalVisible(!makeModalVisible); }}>
        <BlurView intensity={65} tint="dark" style={makeStyles.modalContainer}>
          <View style={makeStyles.modalView}>
            <View style={makeStyles.titleView1}>
              <View style={makeStyles.titleView2}>
                <Text style={makeStyles.titleText}>Settings</Text>
              </View>
              <Icon
                onPress={() => setMakeModalVisible(!makeModalVisible)}
                style={makeStyles.closeButton}
                color="#321b8f"
                name="close-box-outline"
                type="material-community"
                size="40"
              />
            </View>

            <View style={makeStyles.bothInputView}>
              <View style={makeStyles.inputView}>
                <TextInput
                  style={makeStyles.inputText}
                  placeholder="Leaderboard Name"
                  placeholderTextColor="#d9d9d9"
                  fontSize={16}
                  onChangeText={(inputTitle) => setInputTitle(inputTitle)}
                /> 
              </View> 
              <View style={makeStyles.inputView}>
                <TextInput
                  style={makeStyles.inputText}
                  placeholder="Category"
                  placeholderTextColor="#d9d9d9"
                  fontSize={16}
                  onChangeText={(inputCategory) => setInputCategory(inputCategory)}
                /> 
              </View> 
            </View>

            <Text style={makeStyles.scrollViewTitle}>Select Friends</Text>
            <ScrollView style={makeStyles.scrollContainer1} showsVerticalScrollIndicator={false}>
              <View style={makeStyles.scrollContainer2}>
                {myLeaderboardsArr.map((info, index) => (
                  <View style={makeStyles.mapView} key={index}>
                    <Text style={makeStyles.mapText}>{info.name}</Text>
                    <TouchableOpacity style={makeStyles.mapButton} onPress={() => selectFriend(info.id)}>
                      <Text style={makeStyles.mapButtonText}>ADD</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity style={makeStyles.createButton} onPress={createLeaderboard}>
              <Text style={makeStyles.createText}>Create</Text>
            </TouchableOpacity>

          </View>
        </BlurView>
      </Modal>

      <View style={cardStyles.container1}>
        <ScrollView style={cardStyles.container2} showsVerticalScrollIndicator={false}>
          <View style={cardStyles.container3}>
            {myLeaderboardsArr.map((info, index) => (
              <TouchableOpacity key={index} style={cardStyles.cardView} onPress={() => openMainModal(info.name)}>
                <View style={cardStyles.nameTextView}>
                  <Text style={cardStyles.nameText}>{info.name}</Text>
                </View>
                <View style={cardStyles.categoryTextView}>
                  <Text style={cardStyles.categoryText}>{info.category}</Text>
                </View>
                <View style={cardStyles.placeTextView}>
                  <Text style={cardStyles.placeText}>Place: {info.place}/{info.membersArr.length}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <Modal  
        animationType="slide"
        transparent={true}
        visible={leaderboardModalVisible}
        onRequestClose={() => {Alert.alert('Modal has been closed.'); setLeaderboardModalVisible(!leaderboardModalVisible); }}>
        <View style={mainModalStyles.modalContainer}>
          <View style={mainModalStyles.modalView}>

            <Text style={mainModalStyles.nameText}>{modalInfo.name}</Text>
            <Text style={mainModalStyles.categoryText}>{modalInfo.category}</Text>
            
            <View style={mainModalStyles.inputView}>
              <TextInput
                style={mainModalStyles.inputText}
                placeholder="New Stat"
                placeholderTextColor="#cccccc"
                fontSize={20}
                fontWeight={"300"}
                onChangeText={(statInput) => setStatInput(statInput)}
              /> 
              <TouchableOpacity style={mainModalStyles.enterButton} onPress={() => {updateScore()}}>
                <Text style={mainModalStyles.enterText}>Enter</Text>
              </TouchableOpacity>
            </View>  

            <View style={mainModalStyles.dividerView1}></View>
            <View style={mainModalStyles.mainLeaderboardView}>
              <ScrollView style={mainScrollViewStyles.scrollContainer1} showsVerticalScrollIndicator={false}>
                <View style={mainScrollViewStyles.scrollContainer2}>
                  {displayingArr.map((info, index) => (
                    <View style={mainScrollViewStyles.placeCard} key={index}>
                        <Text style={mainScrollViewStyles.nameText}>{info.name}</Text>
                        <Text style={mainScrollViewStyles.scoreText}>{info.score}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={mainModalStyles.dividerView2}></View>

            <TouchableOpacity style={mainModalStyles.returnButton} onPress={() => {setLeaderboardModalVisible(false); initialize()}}>
              <Text style={mainModalStyles.returnText}>Return</Text>
            </TouchableOpacity>          
          </View>
        </View>
      </Modal>

     </View>
  )
}

const mainScrollViewStyles = StyleSheet.create({
  scrollContainer1: {
    width: "100%",
  },
  scrollContainer2: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeCard: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#cec7ff",
    paddingVertical: 15,
    width: "70%",
  },
  nameText: {
    fontSize: 20,
    color: "white",
    width: "80%",
  },
  scoreText: {
    fontSize: 20,
    color: "white",
    width: "20%",
  },
})

const mainModalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginTop: 5,
    // backgroundColor: "#1a1a29", //'#404057', //0d0d12
    backgroundColor: "#1a1a29",
    alignItems: 'center',
    height: "80.5%",
    width: "100%",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  nameText: {
    fontSize: 30,
    color: "#8e8ef3",
    fontWeight: "500",
    marginTop: 20,
    shadowColor: '#8e8ef3',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset : { width: 0, height: 0},
  },
  categoryText: {
    fontSize: 20,
    color: "#8e8ef3",
    fontWeight: "500",
    marginTop: 15,
  },
  
  dividerView1: {
    width: "100%",
    borderBottomWidth: 2,
    borderColor: "#cec7ff", //8a7ed9
  },
  dividerView2: {
    width: "100%",
    borderBottomWidth: 2,
    borderColor: "#cec7ff", //8a7ed9
    marginBottom: 20,
  },

  mainLeaderboardView: {
    height: "60%",
    width: "100%",
  },

  inputView: {
    borderColor: "#cec7ff",
    borderWidth: 2,
    borderRadius: 7,
    height: 45,
    width: "55%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    // backgroundColor: "grey",
  },
  inputText: {
    height: 50,
    width: "60%",
    flex: 1,
    // paddingHorizontal: 15,
    color: "#ffffff",
    marginLeft: 15,
  },
  enterButton: {
    height: "100%",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#cec7ff",
    borderLeftWidth: 2,
    backgroundColor: "#45406b",
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  enterText: {
    color: "white",
    fontSize: 20,
    fontWeight: "300",
  },
  returnButton: {
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,

    shadowColor: 'rgba(227, 227, 255, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset : { width: 1, height: 13},
  },
  returnText: {
    fontWeight: "600",
    fontSize: 20,
    letterSpacing: 0.7
  },
})




const cardStyles = StyleSheet.create({
  container1: {
    alignItems: "center",
    justifyContent: 'center',
    height: "90%",
    width: "100%",
    marginBottom: 10,
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: "#272736",
  },
  container2: {
    width: "100%",
  },
   container3: {
    alignItems: "center",
    justifyContent: 'center',
  },
  cardView: {
    height: 150,
    width: "90%",
    backgroundColor: "#050505",
    marginBottom: 15,
    borderRadius: 10,
  },
  nameTextView: {
    // backgroundColor: "grey",
    height: "35%",
  },
  categoryTextView: {
    // backgroundColor: "tan",
    height: "45%",
  },
  placeTextView: {
    // backgroundColor: "maroon",
    height: "20%",
  },
  nameText: {
    fontSize: 30,
    color: "#8e8ef3",
    fontWeight: "500",
    marginTop: 10,
    marginLeft: 10,
  },
  categoryText: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
  },
  placeText: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
  },
})

const makeStyles = StyleSheet.create({
  makeLeaderboardBtn: {
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    width: "90%",
    height: 50,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: 'rgba(227, 227, 255, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset : { width: 1, height: 13},
  },
  makeLeaderboardText: {
    fontWeight: "600",
    fontSize: 20,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    alignItems: 'center',
    height: "65%",
    width: "80%",
    backgroundColor: "#8a8ac2",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "black",
  },
  titleView1: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6d6dc7",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 5,
  },
  titleView2: {
    width: 250,
    justifyContent: "center",
    // alignItems: "center",
  },
  titleText: {
    color: "#e2deff",
    fontSize: 28,
    fontWeight: "300",
    letterSpacing: 1.7,
    marginLeft: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
  },

  scrollViewTitle: {
    color: "#e2deff",
    fontSize: 23,
    fontWeight: "500",
    letterSpacing: 0.5,
    marginTop: 15,
  },
  scrollContainer1: {
    backgroundColor: "#6d6dc7",
    width: "90%",
    maxHeight: 200,
    marginTop: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#343491",
  },
  scrollContainer2: {
    // backgroundColor: "maroon",
  },
  mapView: {
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderBottomWidth: 2,
    borderColor: "#343491",
    flexDirection: "row",
  },
  mapText: {
    letterSpacing: 1,
    fontWeight: "400",
    fontSize: 23,
    color: "#d7d1ff",
    // backgroundColor: "grey",
    width: "80%",
    maxWidth: "80%",
    paddingHorizontal: 10,
  },
  mapButton: {
    backgroundColor: "#4d4db0",
    paddingHorizontal: 10,
    // paddingVertical: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mapButtonText: {
    color: "#e2deff",
    fontSize: 18,
    fontWeight: "500",
  },

  bothInputView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  inputView: {
    borderColor: "#404057",
    borderWidth: 2,
    borderRadius: 5,
    height: 45,
    width: "95%",
    marginBottom: 10,
    alignItems: "center",
  },
  inputText: {
    height: 50,
    width: "100%",
    flex: 1,
    paddingHorizontal: 15,
    color: "#ffffff",
  },

  createButton: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#343491",
    backgroundColor: "#6d6dc7",
    paddingVertical: 5,
  },
  createText: {
    color: "#e2deff",
    fontSize: 30,
    fontWeight: "300",
    letterSpacing: 1.5,
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#0d0d12',
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