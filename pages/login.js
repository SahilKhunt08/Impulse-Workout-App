// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, StatusBar, Modal} from "react-native";
import { auth } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail} from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, collection, getDoc, getDocs, deleteDoc, updateDoc} from "firebase/firestore"; 
import {db} from './firebase';
import { async } from "@firebase/util";
import Divider from 'react-native-divider';
import { Icon } from '@rneui/themed';
import FlashMessage, {showMessage, hideMessage } from "react-native-flash-message"; 

// async function newDoc() {
  
//   const auth = getAuth();
//   const user = auth.currentUser   
//   const usernameString = auth.currentUser.email.substring(0, auth.currentUser.email.indexOf("@"));

//   await setDoc(doc(db, "accounts", user.uid, "friends", "temp"), {
//   });
//   await setDoc(doc(db, "accounts", user.uid, "requests", "temp"), {
//   });
//   await setDoc(doc(db, "accounts", user.uid, "workouts", "temp"), {
//     temp: 'temp'
//   });
//   await setDoc(doc(db, "accounts", user.uid), {
//     username: usernameString,
//     workouts: []
//     }
//   )}

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")  
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [tempBoolean, setTempBoolean] = useState(true);

  async function makeNewDoc() {
  const auth = getAuth();
  const user = auth.currentUser   
  const usernameString = auth.currentUser.email.substring(0, auth.currentUser.email.indexOf("@"));
  const friendsRef = await setDoc(doc(db, "accounts", user.uid, "friends", "temp"), {});
  const requestsRef = await setDoc(doc(db, "accounts", user.uid, "requests", "temp"), {});
  const workoutRef = await setDoc(doc(db, "accounts", user.uid, "workouts", "temp"), {});
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
 
  await setDoc(doc(db, "accounts", user.uid), {
    username: newUsername,
    workoutsArr: [],
    leaderboardsArr: ["temp"],
    settings1: true,
    settings2: true,
    lastSignin:  month + '/' + date 
    + ' at ' + hours%12 + ':' + min + ':' + sec,
    password: newPassword,
  })

  navigation.navigate('Impulse') //Old version
  setModalVisible(false);
}

async function setLoginTime() {
  const auth = getAuth();
  const user = auth.currentUser  
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  
  const docRef1 = doc(db, "accounts", user.uid);
  const docSnap1 = await getDoc(docRef1);
  const lastSignin = docSnap1.data().lastSignin;  


  await updateDoc(doc(db, "accounts", user.uid), {
    lastSignin:  month + '/' + date 
    + ' at ' + hours%12 + ':' + min 
  })
  console.log(lastSignin) 
   navigation.navigate('Impulse', {
      lastSignin: lastSignin
    })
  //Old version
  
  }


  
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, newEmail, newPassword).then(() => {
        makeNewDoc();
      }).then(() => {
        console.log("userMade")
      }) 
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log("Correct")
      // navigation.replace('Impulse')
      setLoginTime();
      navigation.navigate('Impulse') //Old version
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Not Correct");
    });
  }

  // async function deleteSelected(selectedArr) {
  //   const deleteWorkouts = selectedArr
  //   for (let i = 0; i < deleteWorkouts.length; i++) {
  //     await deleteDoc(doc(db, "accounts", user.uid, "workouts", deleteWorkouts[i].name));
  //   }
  // }

  // async function setFriendWorkouts() {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   //first clear
  //   const workoutsDeleteArr = []
  //   const deleteWorkoutRef = collection(db, "accounts", user.uid, "workouts");
  //   const deleteWorkoutDocs = await getDocs(deleteWorkoutRef);
  //   deleteWorkoutDocs.forEach(doc => {
  //     if (doc.id != "temp" && doc.data().type == "Friend") {
  //       workoutsDeleteArr.push(doc.data())
  //     }
  //   })  
  //   deleteSelected(workoutsDeleteArr)

  //   //then get all friend workouts

  //   const friends = []
  //       const friendsRef = collection(db, "accounts", user.uid, "friends");
  //       const friendsDocs = await getDocs(friendsRef);
  //       friendsDocs.forEach(doc => {
  //         if (doc.id != "temp") {
  //           friends.push(doc.id)
  //         }
  //       })  

  //       const addingWorkouts = []

  //       for (let i = 0; i < friends.length; i++) {
  //         const fWorkoutsRef = collection(db, "accounts", friends[i], "workouts");
  //         const fWorkoutDocs = await getDocs(fWorkoutsRef);

  //           fWorkoutDocs.forEach(doc => {
  //           if (doc.id != "temp") {
  //             addingWorkouts.push(doc.data())
  //           }
  //         })  
  //       }
        

  //     for (let i = 0; i < addingWorkouts.length; i++) {
  //       await setDoc(doc(db, "accounts", user.uid, "workouts", addingWorkouts[i].name), {
  //         description: addingWorkouts[i].description,
  //         breakTime: addingWorkouts[i].breakTime,
  //         name: addingWorkouts[i].name,
  //         workoutID: addingWorkouts[i].workoutID,
  //         type: "Friend"
  //       });
  //     }
  // }

  const handlePasswordReset = () => {
    if(tempBoolean){
      loginSuccess(true);
      setTempBoolean(false);
    } else {
      loginSuccess(false);
      setTempBoolean(true);
    }

    // console.log("RESET PASSWORD")
    // const auth = getAuth();
    // sendPasswordResetEmail(auth, email)
    // .then(() => {
    //   console.log("Password reset email sent!");
    // })
    // .catch((error) => {

    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.log(errorCode);
    //   console.log(errorMessage);
    // });
  }

  const loginSuccess = (didReset) => {
    if(didReset == true){
      showMessage({
        // title: "Email Sent",
        message: "Email Sent",
        floating: true,
        textStyle: newStyles.flashText,
        titleStyle: newStyles.flashText,
        icon: "success",
      });
    } else {
      showMessage({
        // title: "Login Failed",
        message: "Email Failed",
        floating: true,
        textStyle: newStyles.flashText,
        titleStyle: newStyles.flashText,
        icon: "danger",
      });
    }
  }

  return (
    <View style={newStyles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={'light-content'} //['default', 'dark-content', 'light-content'];
        showHideTransition={'fade'} //['fade', 'slide', 'none'];
        hidden={false}
      />

      {/* <FlashMessage position="bottom" style={newStyles.flashStyle}/>  */}

      <View style={newStyles.loginContainer}>
        <Text style={newStyles.titleText}> Login to Impulse</Text>
        <Text style={newStyles.infoText}> Email </Text>
        <View style={newStyles.inputView}>
          <TextInput
            style={newStyles.inputText}
            placeholder="someone@example.com"
            placeholderTextColor="#cccccc"
            onChangeText={(email) => setEmail(email)}
            keyboardAppearance="dark"
            autoCapitalize='none'
          /> 
        </View> 
        <Text style={newStyles.infoText}> Password </Text>
        <View style={newStyles.inputView}>
          <TextInput
            style={newStyles.inputText}
            placeholder="Your Password"
            placeholderTextColor="#cccccc"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            keyboardAppearance="dark"
          /> 
        </View> 
        <TouchableOpacity style={newStyles.forgotView} onPress={handlePasswordReset}>
          <Text style={newStyles.forgotText}> Forgot Password? </Text> 
        </TouchableOpacity> 
      </View>

      <TouchableOpacity style={newStyles.loginBtn} onPress={handleLogin}>
        <Text style={newStyles.loginText}>LOGIN</Text> 
      </TouchableOpacity>  

      <View style={newStyles.dividerView}>
        <Divider borderColor="#a3a3bf" color="#a3a3bf" orientation="center">
          OR
        </Divider>
      </View>

      <TouchableOpacity style={newStyles.extraView} onPress={() => setModalVisible(true)}>
        {/* onPress={setModalVisible(true)} */}
        <Icon 
          name="account-plus-outline"
          type="material-community"
          size={31}
          color="#8e8efa"
        />
        <Text style={newStyles.extraText1}>REGISTER</Text> 
      </TouchableOpacity> 

      {/* <TouchableOpacity style={newStyles.extraView} >
        <Image source={require('./resources/google1.png')} style={newStyles.googleImg}/>
        <Text style={newStyles.extraText2}>Continue with Google</Text> 
      </TouchableOpacity> 

      <TouchableOpacity style={newStyles.extraView} >
        <Image source={require('./resources/google1.png')} style={newStyles.googleImg}/>
        <Text style={newStyles.extraText2}>Continue with Blank</Text> 
      </TouchableOpacity>  */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {Alert.alert("Modal has been closed."); setModalVisible(!modalVisible); }}>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalView}>
            <View style={newStyles.loginContainer}>
              <Text style={newStyles.titleText}> Register to Impulse</Text>
              <Text style={newStyles.infoText}> Username </Text>
              <View style={newStyles.inputView}>
                <TextInput
                  style={newStyles.inputText}
                  placeholder="Example"
                  placeholderTextColor="#cccccc"
                  onChangeText={(newUsername) => setNewUsername(newUsername)}
                  keyboardAppearance="dark"
                /> 
              </View> 
              <Text style={newStyles.infoText}> Email </Text>
              <View style={newStyles.inputView}>
                <TextInput
                  style={newStyles.inputText}
                  placeholder="someone@example.com"
                  placeholderTextColor="#cccccc"
                  onChangeText={(newEmail) => setNewEmail(newEmail)}
                  keyboardAppearance="dark"
                  autoCapitalize='none'
                /> 
              </View> 
              <Text style={newStyles.infoText}> Password </Text>
              <View style={newStyles.inputView}>
                <TextInput
                  style={newStyles.inputText}
                  placeholder="Your Password"
                  placeholderTextColor="#cccccc"
                  secureTextEntry={true}
                  onChangeText={(newPassword) => setNewPassword(newPassword)}
                  keyboardAppearance="dark"
                /> 
              </View> 
            </View>
            <TouchableOpacity style={modalStyles.loginBtn} onPress={handleRegister}>
              <Text style={newStyles.loginText}>REGISTER</Text> 
            </TouchableOpacity> 
            <Text style={modalStyles.loginText1}>Already have an Account?</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={modalStyles.loginText2}>Login</Text>
            </TouchableOpacity>
          </View>  
        </View>
      </Modal>
    </View> 
  );
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

  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: '#0d0d12',
  },
  loginContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  titleText: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 30,
    alignSelf: "left",
    marginBottom: 50,
    marginTop: 50,
  },
  infoText: {
    color: "#ffffff",
    fontWeight: "350",
    fontSize: 16,
    marginBottom: 9,
    alignSelf: "left",
  },
  inputView: {
    borderColor: "#404057",
    borderWidth: 2,
    borderRadius: 5,
    height: 45,
    width: 340,
    marginBottom: 25,
    alignItems: "center",
  },
  inputText: {
    height: 50,
    width: "100%",
    flex: 1,
    paddingHorizontal: 15,
    color: "#ffffff",
  },
  forgotView: {
    alignSelf: "left",
    marginTop: 5,
    marginBottom: 35,
  },
  forgotText: {
    color: "#8e8efa",
    fontSize: 16,
  },

  loginBtn: {
    borderRadius:7,
    paddingHorizontal: 145,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(227, 227, 255, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset : { width: 1, height: 13},
  },
  loginText: {
    fontWeight: "600",
    fontSize: 16,
  },

  dividerView: {
    // backgroundColor: "white",
    width: "87%",
    margin: 25,
  },

  extraView: {
    borderColor: "#404057",
    borderWidth: 2,
    borderRadius: 5,
    height: 50,
    width: 340,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    // textAlign: "center",
    // alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
    extraText1: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 16,
    paddingHorizontal: 115,
    marginLeft: -20,
    letterSpacing: 0.9,
  },
  extraText2: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 16,
    paddingHorizontal: 80,
    marginLeft: -20,
  },
  googleImg: {
    maxWidth: 25,
    maxHeight: 25, 
    // backgroundColor: "#fff",
  }
  
})

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: -20,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#0d0d12',
    alignItems: 'center',
    height: "80.5%",
    width: "100%",
  },

  loginText1: {
    color: "#d6d6d6",
    fontSize: 16,
    marginTop: 75
  },
  loginText2: {
    color: "#8e8efa",
    fontSize: 16,
    marginTop: 30,
  },
    loginBtn: {
    marginTop:  15,
    borderRadius:7,
    paddingHorizontal: 130,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(227, 227, 255, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset : { width: 1, height: 13},
  },
})