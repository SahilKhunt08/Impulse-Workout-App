import React, { useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Image, TextInput, ScrollView, Switch} from 'react-native';
import { Card } from 'react-native-paper';
import { auth } from './firebase';
import {db} from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { addDoc, getDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, query, deleteDoc, updateDoc} from "firebase/firestore"; 
import { Icon } from '@rneui/themed';
import Divider from 'react-native-divider';
import FlashMessage, {showMessage, hideMessage } from "react-native-flash-message"; 

var noPendingRequests = false;

export default function Profile({ navigation }) {

  const [requestName, setRequestName] = useState("");
  const [requestArr, setRequestArr] = useState([]);
  const [count, setCount] = useState(0);
  const [workoutNamesArr, setWorkoutNamesArr] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("")  
  const [sendingName, setSendingName] = useState("");

  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const toggleSwitch1 = () => setToggle1(previousState => !previousState)
  const toggleSwitch2 = () => setToggle2(previousState => !previousState)


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      initialize();
    });
    return unsubscribe;
  }, []);

  async function initialize() {
    reloadUser();

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
      const docRef1 = doc(db, "accounts", docIdArr[i]);
      const docSnap1 = await getDoc(docRef1);
      requestInfoArr.push({name: docSnap1.data().username, id:currentNum});
      currentNum++;
    }

    setCount(currentNum);
    setRequestArr(requestInfoArr);
    if(requestInfoArr.length == 0){
      noPendingRequests = true;
    } else {
      noPendingRequests = false;
    }

    const docRef2 = doc(db, "accounts", user.uid);
    const docSnap2 = await getDoc(docRef2);

    if (docSnap2.exists()) {
      const auth = getAuth();
      const user = auth.currentUser;
      setNewUsername(docSnap2.data().username);
      setNewEmail(user.email);
      setWorkoutNamesArr(docSnap2.data().workoutsArr);
      setToggle1(docSnap2.data().settings1);
      setToggle2(docSnap2.data().settings2);
      setOldPassword(docSnap2.data().password);
    } else {
      console.log("No such document!");
    }
  }

  async function saveProfile() {
    const docRef = doc(db, "accounts", user.uid);
    await updateDoc(docRef, {
      username: username
    });
  }

  async function sendFriendRequest() {
    if(sendingName.length > 0){
      const auth2 = getAuth();
      const user2 = auth2.currentUser;
      const docRef = doc(db, "accounts", user2.uid);
      const docSnap = await getDoc(docRef);
      let accountUsername = "";
      if (docSnap.exists()) {
        accountUsername = docSnap.data().username;
      } else {
        console.log("No such document!");
      }

      const accountsColRef = collection(db, "accounts"); 
      const querySnapshot = await getDocs(accountsColRef);
      var canSendRequest = false;
      if(sendingName !== accountUsername && sendingName !== "temp"){
        querySnapshot.forEach(doc => {
          if (sendingName === doc.data().username){
            if(doc.data().settings1 == true){
              addFriendToUserDoc(doc.id)
              setRequestName("");
              canSendRequest = true;
            } else {
              console.log("Other user doesn't accept requests")
            }
          }
        });
      }

      if(canSendRequest){
        showMessage({
          message: "Request Sent",
          floating: true,
          textStyle: newStyles.flashText,
          titleStyle: newStyles.flashText,
          icon: "success",
        });
      } else {
        showMessage({
          message: "Request Failed",
          floating: true,
          textStyle: newStyles.flashText,
          titleStyle: newStyles.flashText,
          icon: "danger",
        });
      }
    }
  }

  async function pushWorkout(arr, reciever) {

    const workouts = arr
    for (let i = 0; i< arr.length; i++) {
      await setDoc(doc(db, "accounts", reciever, "workouts", workouts[i].name), {
        breakTime: workouts[i].breakTime,
        description: workouts[i].description,
        name: workouts[i].name,
        workoutID: workouts[i].workoutID,
        type: "Friend",
        creator: workouts[i].creator,
        creatorID: workouts[i].creatorID
    })
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
    if(newRequestArray.length == 0){
      noPendingRequests = true;
    }
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

  

    let tempArr1 = []
    const friendWorkoutRef = collection(db, "accounts", acceptedName, "workouts");
    const friendWorkoutDocs = await getDocs(friendWorkoutRef);
      friendWorkoutDocs.forEach(doc => {
        if (doc.id != "temp" && doc.data().type == 'Self') {
          tempArr1.push(doc.data())
        }
    }) 

    pushWorkout(tempArr1, user.uid)

           
     //Reference user workouts(send from user to friend)
     let tempArr = []
     const selfWorkoutRef = collection(db, "accounts", user.uid, "workouts");
     const selfWorkoutDocs = await getDocs(selfWorkoutRef);
       selfWorkoutDocs.forEach(doc => {
        if (doc.id != "temp" && doc.data().type == 'Self') {
          tempArr.push(doc.data())
        }
         
     }) 
     pushWorkout(tempArr, acceptedName)

    //Adds your account to the friend
    await setDoc(doc(db, "accounts", acceptedName, "friends", user.uid), {
      username: user.uid,
    });
  }

  async function denyButton(index) {
    const deniedArr = requestArr.filter(a => a.id === index);
    let deniedName = deniedArr[0].name;
    
    const querySnapshot = await getDocs(collection(db, "accounts"));
    querySnapshot.forEach((doc) => {
      if(doc.data().username == deniedName){
        deniedName = doc.id;
      }
    });
    await deleteDoc(doc(db, "accounts", user.uid, "requests", deniedName));

    const tempArr = requestArr.filter(a => a.id !== index);
    setRequestArr(tempArr);
    if(tempArr.length == 0){
      noPendingRequests = true;
    }
  }

  async function handleUpdate() {
    reloadUser();
    var allValidInputs = true;

    const docRef1 = doc(db, "accounts", user.uid);
    await updateDoc(docRef1, {
      settings1: toggle1,
      settings2: toggle2,
    });
    if(newUsername.length > 0){
      await updateDoc(docRef1, {
        username: newUsername,
      });
    } else {
      allValidInputs = false;
    }

    const auth1 = getAuth();
    const user1 = auth1.currentUser;
    if(newEmail != user1.email){
      if(newEmail.length > 0){
        updateEmail(auth.currentUser, newEmail).then(() => {
        }).catch((error) => {
          console.log("New Email Error")
          console.log(error.code);
          console.log(error.message)
          allValidInputs = false;
        });
      } else {
        allValidInputs = false;
      }
    }

    if(newPassword.length > 6 && newPassword != oldPassword){
      updatePassword(user, newPassword).then(() => {
        updateFirestorePassword();
        setOldPassword(newPassword);
        // Update successful.
      }).catch((error) => {
        console.log("New Password Error")
        console.log(error.code);
        console.log(error.message);
        allValidInputs = false;
      });
    }
    
    if(allValidInputs){
      showMessage({
        message: "Update Successful",
        floating: true,
        textStyle: newStyles.flashText,
        titleStyle: newStyles.flashText,
        icon: "success",
      });
    } else {
      showMessage({
        message: "Some Inputs Invalid",
        floating: true,
        textStyle: newStyles.flashText,
        titleStyle: newStyles.flashText,
        icon: "danger",
      });
    }


  }

  const handleLogout = () => {
    console.log("LOGOUT");
    // navigation.replace('Impulse') //New version
    navigation.navigate('Login') //Old version
  }

  async function reloadUser(){
    const auth2 = getAuth();
    const user2 = auth2.currentUser;
    const docRef3 = doc(db, "accounts", user2.uid);
    const docSnap3 = await getDoc(docRef3);
    var credentialPassword = "";
    if (docSnap3.exists()) {
      credentialPassword = docSnap3.data().password;
    } else {
      console.log("No such document!");
    }

    const credential = EmailAuthProvider.credential(
      user2.email,
      credentialPassword,
    );

    reauthenticateWithCredential(user2, credential).then(() => {
      // User re-authenticated.
    }).catch((error) => {
        console.log("Re-auth error");
        console.log(error.code);
        console.log(error.message);
    });
  }

  async function updateFirestorePassword(){
    const docRef1 = doc(db, "accounts", user.uid);
    await updateDoc(docRef1, {
      password: newPassword,
    });
  }

  return (
    <View style={styles.container}>

      <ScrollView style={newStyles.scrollView1} showsVerticalScrollIndicator={false}>
        
        <View style={newStyles.scrollView2}>
          {hasNoFriends ? (
            <View style={mainStyles.friendsContainer}>
              <Text style={mainStyles.goAddFriendsText}>
                Add Some Friends Below
              </Text>
            </View>
          ) : (
            <View style={mainStyles.friendsContainer}>
              <ScrollView
                style={mainStyles.scrollContainer1}
                showsVerticalScrollIndicator={false}
              >
                <View style={mainStyles.scrollContainer2}>
                  <View style={mainStyles.scrollContainer3}>
                    {allFriendsArr1.map((info, index) => (
                      <View style={mainStyles.friendCard} key={index}>
                        <View style={mainStyles.mainContent}>
                          <TouchableOpacity
                            onPress={() => {
                              setChosenRemoveName(info.username);
                              setChosenRemoveID(info.id);
                              setRemoveFriendModalVis(true);
                            }}
                          >
                            <Icon
                              color="#8e8ef3"
                              name="person-remove"
                              type="material"
                              size="30"
                            ></Icon>
                          </TouchableOpacity>
                          <View style={mainStyles.usernameView}>
                            <Text style={mainStyles.usernameText}>
                              {info.username}
                            </Text>
                          </View>
                        </View>
                        <View style={mainStyles.dividerView}></View>
                      </View>
                    ))}
                  </View>
                  <View style={mainStyles.scrollContainer3}>
                    {allFriendsArr2.map((info, index) => (
                      <View style={mainStyles.friendCard} key={index}>
                        <View style={mainStyles.mainContent}>
                          <TouchableOpacity
                            onPress={() => {
                              setChosenRemoveName(info.username);
                              setChosenRemoveID(info.id);
                              setRemoveFriendModalVis(true);
                            }}
                          >
                            <Icon
                              color="#8e8ef3"
                              name="person-remove"
                              type="material"
                              size="30"
                            ></Icon>
                          </TouchableOpacity>
                          <View style={mainStyles.usernameView}>
                            <Text style={mainStyles.usernameText}>
                              {info.username}
                            </Text>
                          </View>
                        </View>
                        <View style={mainStyles.dividerView}></View>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={newStyles.settingsSplit3}>
                  <Switch
                    trackColor={{true: '#8e8efa', false: '#767577'}}
                    thumbColor={toggle2 ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch2}
                    value={toggle2}
                  />   
                </View>
              </View>
            </View>
          )}

          <View style={newStyles.dividerView2}>
            <Divider borderColor="#a3a3bf" color="#a3a3bf" orientation="center">
              Friend Requests
            </Divider>
          </View>

          <View style={newStyles.friendRequestsContainer}>
            <View style={newStyles.requestingView}>
              <View style={newStyles.requestInput}>
                <TextInput
                  style={newStyles.requestInputText}
                  placeholder="Friend's Name"
                  fontSize="16"
                  placeholderTextColor="#cccccc"
                  onChangeText={(sendingName) => setSendingName(sendingName)}
                  valie={sendingName}
                  color={"#dddddd"}
                  keyboardAppearance="dark"
                />
              </View>
              <TouchableOpacity style={newStyles.sendBtn} onPress={sendFriendRequest}>
                <Text style={newStyles.sendText}>Send</Text>
              </TouchableOpacity>
            </View>
            
            {noPendingRequests ? 
              <View style={styles.requestContainer}>
                <View style={styles.workoutCard}>
                  <Text style={styles.noRequestsText}>No Requests Received</Text>
                </View>
              </View> 
              : 
              <View style={styles.requestContainer}>
                <ScrollView style={styles.scrollStyle} showsVerticalScrollIndicator={false}>
                  <View style={styles.container2}>
                  {requestArr.map((info, index) => (
                  <View key={index} style={styles.workoutCard}>
                    <View style={styles.friendNameView}>
                      <Text style={styles.friendNameText}> {info.name} </Text>
                    </View>
                    <View style={styles.twoButtonView}>
                      <TouchableOpacity style={styles.requestButton1} onPress={() => addButton(info.id)}>
                        <Icon 
                          name="person-add"
                          type="material"
                          size={31}
                          color="#8e8efa"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.requestButton2} onPress={() => denyButton(info.id)}>
                        <Icon 
                          name="person-remove"
                          type="material"
                          size={31}
                          color="#8e8efa"
                        />
                      </TouchableOpacity>
                      {/* <TouchableOpacity style={styles.requestButton1} onPress={() => addButton(info.id)}>
                        <Text style={styles.requestText}>Add</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.requestButton2} onPress={() => denyButton(info.id)}>
                        <Text style={styles.requestText}>Deny</Text>
                      </TouchableOpacity> */}
                    </View>
                  </View>
                  ))}
                  </View>
                </ScrollView>
              </View>
            }
          </View>

          <TouchableOpacity style={newStyles.logoutBtn} onPress={() => handleLogout()}>
            <Icon 
              name="logout"
              type="material"
              size={31}
              color="#8e8efa"
            />
            <Text style={newStyles.logoutText}>LOGOUT</Text> 
          </TouchableOpacity> 

        </View>
      </ScrollView>
    </View>

  )
}

const newStyles = StyleSheet.create({
  flashStyle: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 40,
    width: 180,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#8e8efa",
    alignSelf: "center",
  },
  flashText: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
    color: "white",
  },

  scrollView1: {
    width: "100%",
  },
  scrollView2: {
    alignItems: "center",  
  },
  dividerView: {
    height: 30,
    width: "100%",
    backgroundColor: "#181821",
    justifyContent: "center",
    marginVertical: 5,
  },
    dividerView2: {
    // backgroundColor: "white",
    width: "87%",
    marginVertical: 10,
  },
  dividerText: {
    color: "#b1b1c9",
    fontSize: 15,
    marginLeft: 25,
    fontWeight: "600",
  },

  accountInfoView: {
    marginTop: 40,
  },
  infoText: {
    color: "#ffffff",
    fontWeight: "350",
    fontSize: 16,
    marginBottom: 6,
    // alignSelf: "left",
    letterSpacing: 0.5,
  },
  inputView: {
    borderColor: "#404057",
    borderWidth: 2,
    borderRadius: 5,
    height: 45,
    width: 340,
    marginBottom: 20,
    alignItems: "center",
  },
  inputText: {
    height: 50,
    width: "100%",
    flex: 1,
    paddingHorizontal: 15,
    color: "#ffffff",
  },

  genSettingsContainer: {
    marginTop: 10,
    marginBottom: 30,
    width: "100%",
  },
  settingsView: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  settingsSplit1: {
    width: "20%",
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsSplit2: {
    width: "62%",
    // backgroundColor: "green",
    justifyContent: "center",
  },
  settingsSplit3: {
    width: "20%",
  },
  switchStyle: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
  },
  settingsText: {
    fontSize: 18,
    color: "#dcdcfc",
    fontWeight: "600",
    letterSpacing: 0.5
  },

  friendRequestsContainer: {
    // backgroundColor: "grey",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  requestingView: {
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
  },
  requestInput: {
    borderColor: "#404057",
    borderWidth: 2,
    borderRadius: 5,
    height: 45,
    alignItems: "center",
    width: "65%",
    marginRight: 20,
  },
  requestInputText: {
    height: 50,
    width: "100%",
    flex: 1,
    paddingHorizontal: 15,
    color: "#ffffff",
  },
  sendBtn: {
    borderRadius: 7,
    backgroundColor: '#8e8efa',
    justifyContent: "center",
    alignItems: "center",
    shadowColor: 'rgba(227, 227, 255, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset : { width: 1, height: 13},
    paddingHorizontal: 10,
  },
  sendText: {
    color: "black",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 1.5,
  },


  updateBtn: {
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    width: "90%",
    height: 50,
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: 'rgba(227, 227, 255, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset : { width: 1, height: 13},
  },
  updateText: {
    fontWeight: "800",
    fontSize: 22,
    letterSpacing: 1.5,
  },
  logoutBtn: {
    borderColor: "#404057",
    borderWidth: 2,
    borderRadius: 5,
    height: 50,
    width: 340,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  logoutText: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 16,
    paddingHorizontal: 115,
    marginLeft: -20,
    letterSpacing: 0.9,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d12',
    alignContent: "center",
    alignItems: "center",
  },
  container2: {
    alignItems: "center",
  },
  requestContainer: {
    backgroundColor: "#1f1f30",
    // borderColor: "#555070",
    alignItems: "center",
    width: "90%",
    height: 200,
    marginTop: 20,
    borderRadius: 5,
    marginBottom: 25,
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
    alignItems: "center",
    backgroundColor: "#101017",
    marginRight: 5,
    height: 40,
    width: 60,
    justifyContent: "center",
    marginBottom: 12,
  },
  requestButton2: {
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#101017",
    // margin: 5,
    height: 40,
    width: 60,
    marginLeft: 5,
    justifyContent: "center",
    marginBottom: 12,
  },
  workoutCard: {
    marginTop: 10,
    width: "90%",
    // backgroundColor: "#463e4f",
    // bordercolor: "black",
    // borderWidth: 2,
    // borderRadius: 5,
    borderBottomWidth: 2,
    borderColor: "#737387",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  }, 

  usernameView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginTop: 150,
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
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5
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
    width: "52%",
    fontSize: 20,
    color: "#f2e6ff",
    marginLeft: 4,
    marginRight: 1,
  },
  sendRequestBtn: {
    borderRadius: 8,
    borderWidth: 3,
    alignItems: "center",
    backgroundColor: "#70a17e",
    margin: 5,
    marginRight: 2,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  sendRequestBtnText: {
    fontSize: 17,
    fontWeight: "600",
  },

  noRequestsText: {
    color: "rgba(220, 220, 252, 0.8)",
    fontSize: 23,
    marginBottom: 8,
    fontWeight: "500",
    letterSpacing: 1.2,
  },
});

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0d0d12",
  },
  addButtonContainer: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#0d0d12",
    borderRadius: 100,
  },
  addButtonView: {
    borderRadius: 100,
    backgroundColor: "#0d0d12",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  friendsContainer: {
    marginTop: 25,
    borderRadius: 8,
    width: "90%",
    height: "40%",
    alignItems: "center",
    backgroundColor: "#24243b",
    paddingVertical: 8,
  },
  scrollContainer1: {
    width: "100%",
  },
  scrollContainer2: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    flexDirection: "row",
  },
  scrollContainer3: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    // backgroundColor: "red",
  },

  friendCard: {
    width: "90%",
    marginVertical: 5,
    // backgroundColor: "green",
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  usernameView: {
    marginLeft: 15,
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#babade",
  },
  dividerView: {
    marginTop: 5,
    borderBottomWidth: 1,
    hieght: 1,
    width: "100%",
    borderBottomColor: "#babade",
  },

  goAddFriendsText: {
    color: "rgba(220, 220, 252, 0.8)",
    fontSize: 23,
    marginBottom: 8,
    fontWeight: "500",
    letterSpacing: 1.2,
    // alignSelf: "center",
    marginTop: 10,
  },
});
