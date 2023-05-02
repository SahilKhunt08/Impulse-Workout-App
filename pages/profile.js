import React, { useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Image, TextInput, ScrollView, Switch} from 'react-native';
import { Card } from 'react-native-paper';
import { auth } from './firebase';
import {db} from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, getDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, query, deleteDoc, updateDoc} from "firebase/firestore"; 
import { Icon } from '@rneui/themed';
import Divider from 'react-native-divider';

export default function Profile({ navigation }) {

  const [requestName, setRequestName] = useState("");
  const [requestArr, setRequestArr] = useState([]);
  const [count, setCount] = useState(0);
  const [workoutNamesArr, setWorkoutNamesArr] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
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

    const docRef2 = doc(db, "accounts", user.uid);
    const docSnap2 = await getDoc(docRef2);

    if (docSnap2.exists()) {
      setNewUsername(docSnap2.data().username);
      setWorkoutNamesArr(docSnap2.data().workoutsArr);
      setToggle1(docSnap2.data().settings1);
      setToggle2(docSnap2.data().settings2);
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
      if(sendingName !== accountUsername && sendingName !== "temp"){
        querySnapshot.forEach(doc => {
          if (sendingName === doc.data().username){
            if(doc.data().settings1 == true){
              addFriendToUserDoc(doc.id)
              setRequestName("");
              console.log("matches");
            } else {
              console.log("Other user doesn't accept requests")
            }
          }
        });
      }
    }
  }

  async function pushWorkout(arr, reciever) {

    const workouts = arr

    console.log(workouts.length)
    for (let i = 0; i< arr.length; i++) {
      await setDoc(doc(db, "accounts", reciever, "workouts", workouts[i].name), {
        breakTime: workouts[i].breakTime,
        description: workouts[i].description,
        name: workouts[i].name,
        workoutID: workouts[i].workoutID,
        type: "Friend"
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
        if (doc.id != "temp") {
        tempArr1.push(doc.data())
        }
    }) 

    pushWorkout(tempArr1, user.uid)

           
     //Reference user workouts(send from user to friend)
     let tempArr = []
     const selfWorkoutRef = collection(db, "accounts", user.uid, "workouts");
     const selfWorkoutDocs = await getDocs(selfWorkoutRef);
       selfWorkoutDocs.forEach(doc => {
        if (doc.id != "temp") {
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

  async function handleUpdate() {
    const docRef1 = doc(db, "accounts", user.uid);
    await updateDoc(docRef1, {
      // username: newUsername,
      settings1: toggle1,
      settings2: toggle2,
    });
    if(newUsername.length > 0){
      await updateDoc(docRef1, {
        username: newUsername,
      });
    }
  }

  const handleLogout = () => {
    console.log("LOGOUT");
    // navigation.replace('Impulse') //New version
    navigation.navigate('Login') //Old version
  }

  return (
    <View style={styles.container}>
      <ScrollView style={newStyles.scrollView1} showsVerticalScrollIndicator={false}>
        <View style={newStyles.scrollView2}>

          {/* <View style={{marginTop: 50}}></View>
          <View style={newStyles.dividerView}>
            <Text style={newStyles.dividerText}>Account Information</Text>
          </View> */}

          <View style={newStyles.accountInfoView}>
            <Text style={newStyles.infoText}> Username </Text>
            <View style={newStyles.inputView}>
              <TextInput
                style={newStyles.inputText}
                placeholder="Example"
                placeholderTextColor="#cccccc"
                onChangeText={(newUsername) => setNewUsername(newUsername)}
                value={newUsername}
                color={"#cccccc"}
                keyboardAppearance="dark"
              /> 
            </View> 
            <Text style={newStyles.infoText}> Email </Text>
            <View style={newStyles.inputView}>
              <TextInput
                style={newStyles.inputText}
                editable={false}
                placeholder="Work in Progress"
                // placeholder="someone@example.com"
                placeholderTextColor="#cccccc"
                onChangeText={(newEmail) => setNewEmail(newEmail)}
                value={newEmail}
                color={"#cccccc"}
                keyboardAppearance="dark"
              /> 
            </View> 
            <Text style={newStyles.infoText}> Password </Text>
            <View style={newStyles.inputView}>
              <TextInput
                style={newStyles.inputText}
                editable={false}
                placeholder="Work in Progress"
                // placeholder="Your Password"
                placeholderTextColor="#cccccc"
                secureTextEntry={true}
                onChangeText={(newPassword) => setNewPassword(newPassword)}
                value={newPassword}
                color={"#cccccc"}
                keyboardAppearance="dark"
              /> 
            </View> 
          </View>

          {/* <View style={newStyles.dividerView}>
            <Text style={newStyles.dividerText}>General Settings</Text>
          </View> */}

          <View style={newStyles.genSettingsContainer}>
            <View style={newStyles.settingsView}>
              <View style={newStyles.settingsSplit1}>
                <Icon 
                  name="group"
                  type="material"
                  size={31}
                  color="#8e8efa"
                />
              </View>
              <View style={newStyles.settingsSplit2}>
                <Text style={newStyles.settingsText}>Receive Requests</Text>
              </View>
              <View style={newStyles.settingsSplit3}>
                <Switch
                  style={newStyles.switchStyle}
                  trackColor={{true: '#8e8efa', false: '#767577'}}
                  thumbColor={toggle1 ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch1}
                  value={toggle1}
                />
              </View>
              </View>
              <View style={newStyles.settingsView}>
                <View style={newStyles.settingsSplit1}>
                  <Icon 
                    name="leaderboard"
                    type="material"
                    size={31}
                    color="#8e8efa"
                  />
                </View>
                <View style={newStyles.settingsSplit2}>
                  <Text style={newStyles.settingsText}>Receive Invites</Text>
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

          <TouchableOpacity style={newStyles.updateBtn} onPress={() => handleUpdate()}>
            <Text style={newStyles.updateText}>Update</Text>
          </TouchableOpacity>  

          <View style={newStyles.dividerView2}>
            <Divider borderColor="#a3a3bf" color="#a3a3bf" orientation="center">
              Friend Requests
            </Divider>
          </View>

          {/* <View style={newStyles.dividerView}>
            <Text style={newStyles.dividerText}>Friend Requests</Text>
          </View> */}

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
          </View>

          {/* <View style={newStyles.dividerView}>
            <Text style={newStyles.dividerText}></Text>
          </View> */}

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
    alignSelf: "left",
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
    backgroundColor: "#0d0d14",
    margin: 5,
    height: 40,
    width: 60,
    justifyContent: "center",
  },
  requestButton2: {
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#0d0d14",
    margin: 5,
    height: 40,
    width: 60,
    justifyContent: "center",
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
});

//Code for box shadows
// shadowColor: '#171717',
// shadowOffset: {width: -2, height: 4},
// shadowOpacity: 0.2,
// shadowRadius: 3,