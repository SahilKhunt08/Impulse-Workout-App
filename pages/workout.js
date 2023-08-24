import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Pressable,
  Modal,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import axios from "axios";
import { Card } from "react-native-paper";
import { auth } from "./firebase";
import { db } from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  doc,
  enableNetwork,
  setDoc,
  getCountFromServer,
  collection,
  getDocs,
  namedQuery,
  query,
  getDoc,
} from "firebase/firestore";
import { Icon } from "@rneui/themed";
import FlipCard from "react-native-flip-card";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { makeStyles } from "@rneui/base";
import { isEmpty } from "@firebase/util";
import Divider from "react-native-divider";
import { BlurView } from "expo-blur";
import FlashMessage, {
  showMessage,
  hideMessage,
} from "react-native-flash-message";

var modalMusclePath1 = require("./muscleImages/default1.png");
var modalMusclePath2 = require("./muscleImages/default2.png");

export default function Workout({ navigation }) {
  const [counter, setCount] = useState(3);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const [exerciseArr, setExerciseArr] = useState([]); // {id: "0", equipment: 'equipment1', muscle: "muscle1"}
  const [modalIndex, setModalIndex] = useState(0);
  const [fixModalIndex, setFixModalIndex] = useState(true);
  const [workoutNameArr, setWorkoutNameArr] = useState([]);
  const [workoutSelected, setWorkoutSelected] = useState("");
  const [workoutBtnStyleArr, setWorkoutBtnStyleArr] = useState([]);
  const [searchBarText, setSearchBarText] = useState([]);
  const [modalAddVisible, setModalAddVisible] = useState(false);

  const [setting1, setSetting1] = useState(0);
  const [setting2, setSetting2] = useState(0);
  const [setting3, setSetting3] = useState(0);
  const [settingStyleArr1, setSettingStyleArr1] = useState([]);
  const [settingStyleArr2, setSettingStyleArr2] = useState([]);
  const [settingStyleArr3, setSettingStyleArr3] = useState([]);
  const setNumArr = [1, 2, 3, 4, 5, 6];
  const timeArr = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  const auth = getAuth();
  const user = auth.currentUser;

  //Filter PAGE

  const [filterModalVis, setfilterModalVis] = useState(false);
  const [styleBeginner, setStyleBeginner] = useState(vedantStyles.loginBtn);
  const [styleIntermediate, setStyleIntermediate] = useState(
    vedantStyles.loginBtn
  );
  const [styleExpert, setStyleExpert] = useState(vedantStyles.loginBtn);

  const [styleAbdom, setStyleAbdom] = useState(vedantStyles.loginBtn);
  const [styleAbduct, setStyleAbduct] = useState(vedantStyles.loginBtn);
  const [styleAdd, setStyleAdd] = useState(vedantStyles.loginBtn);
  const [styleBiceps, setStyleBiceps] = useState(vedantStyles.loginBtn);
  const [styleTriceps, setStyleTriceps] = useState(vedantStyles.loginBtn);
  const [styleLats, setStyleLats] = useState(vedantStyles.loginBtn);
  const [styleFore, setStyleFore] = useState(vedantStyles.loginBtn);
  const [styleTraps, setStyleTraps] = useState(vedantStyles.loginBtn);
  const [styleChest, setStyleChest] = useState(vedantStyles.loginBtn);
  const [styleNeck, setStyleNeck] = useState(vedantStyles.loginBtn);
  const [styleLowBack, setStyleLowBack] = useState(vedantStyles.loginBtn);
  const [styleMidBack, setStyleMidBack] = useState(vedantStyles.loginBtn);
  const [styleCalves, setStyleCalves] = useState(vedantStyles.loginBtn);
  const [styleGlutes, setStyleGlutes] = useState(vedantStyles.loginBtn);
  const [styleHams, setStyleHams] = useState(vedantStyles.loginBtn);
  const [styleQuads, setStyleQuads] = useState(vedantStyles.loginBtn);

  const [styleCardio, setStyleCardio] = useState(vedantStyles.loginBtn);
  const [styleOly, setStyleOly] = useState(vedantStyles.loginBtn);
  const [stylePlyo, setStylePlyo] = useState(vedantStyles.loginBtn);
  const [stylePower, setStylePower] = useState(vedantStyles.loginBtn);
  const [styleStrength, setStyleStrength] = useState(vedantStyles.loginBtn);
  const [styleStretch, setStyleStretch] = useState(vedantStyles.loginBtn);
  const [styleStrong, setStyleStrong] = useState(vedantStyles.loginBtn);

  const [difficulty, setDifficulty] = useState("");
  const [muscles, setMuscles] = useState("");
  const [type, setType] = useState("");

  React.useEffect(() => {
    const listener = navigation.addListener("focus", () => {
      loadWorkouts();
    });
    return listener;
  }, []);

  async function loadWorkouts() {
    const docRef = doc(db, "accounts", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      var tempArr1 = docSnap.data().workoutsArr;
      setWorkoutNameArr(tempArr1);
      setWorkoutSelected(tempArr1[0]);
      var tempArr2 = [buttonRowStyles.buttonOn];
      for (var i = 1; i < tempArr1.length; i++) {
        tempArr2[i] = buttonRowStyles.buttonOff;
      }
      setWorkoutBtnStyleArr(tempArr2);
    } else {
      console.log("loadWorkouts function error");
    }
  }

  const recieveButtonClicks = (input) => {
    if (input < 4) {
      setStyleBeginner(vedantStyles.loginBtn);
      setStyleIntermediate(vedantStyles.loginBtn);
      setStyleExpert(vedantStyles.loginBtn);
      if (input == 1) {
        if (styleBeginner == vedantStyles.loginBtn) {
          setStyleBeginner(vedantStyles.loginBtnClicked);
          setDifficulty("beginner");
        } else {
          setStyleBeginner(vedantStyles.loginBtn);
          setDifficulty(null);
        }
      } else if (input == 2) {
        if (styleIntermediate == vedantStyles.loginBtn) {
          setStyleIntermediate(vedantStyles.loginBtnClicked);
          setDifficulty("intermediate");
        } else {
          setStyleIntermediate(vedantStyles.loginBtn);
          setDifficulty(null);
        }
      } else if (input == 3) {
        if (styleExpert == vedantStyles.loginBtn) {
          setStyleExpert(vedantStyles.loginBtnClicked);
          setDifficulty("expert");
        } else {
          setStyleExpert(vedantStyles.loginBtn);
          setDifficulty(null);
        }
      }
    } else if (input < 20) {
      setStyleAbdom(vedantStyles.loginBtn);
      setStyleAbduct(vedantStyles.loginBtn);
      setStyleAdd(vedantStyles.loginBtn);
      setStyleBiceps(vedantStyles.loginBtn);
      setStyleTriceps(vedantStyles.loginBtn);
      setStyleLats(vedantStyles.loginBtn);
      setStyleFore(vedantStyles.loginBtn);
      setStyleTraps(vedantStyles.loginBtn);
      setStyleChest(vedantStyles.loginBtn);
      setStyleNeck(vedantStyles.loginBtn);
      setStyleLowBack(vedantStyles.loginBtn);
      setStyleMidBack(vedantStyles.loginBtn);
      setStyleCalves(vedantStyles.loginBtn);
      setStyleGlutes(vedantStyles.loginBtn);
      setStyleHams(vedantStyles.loginBtn);
      setStyleQuads(vedantStyles.loginBtn);

      if (input == 4) {
        if (styleAbdom == vedantStyles.loginBtn) {
          setStyleAbdom(vedantStyles.loginBtnClicked);
          setMuscles("abdominals");
        } else {
          setMuscles(null);
          setStyleAbdom(vedantStyles.loginBtn);
        }
      } else if (input == 5) {
        if (styleAbduct == vedantStyles.loginBtn) {
          setStyleAbduct(vedantStyles.loginBtnClicked);
          setMuscles("abductors");
        } else {
          setMuscles(null);
          setStyleAbduct(vedantStyles.loginBtn);
        }
      } else if (input == 6) {
        if (styleAdd == vedantStyles.loginBtn) {
          setStyleAdd(vedantStyles.loginBtnClicked);
          setMuscles("adductors");
        } else {
          setMuscles(null);
          setStyleAdd(vedantStyles.loginBtn);
        }
      } else if (input == 7) {
        if (styleBiceps == vedantStyles.loginBtn) {
          setStyleBiceps(vedantStyles.loginBtnClicked);
          setMuscles("biceps");
        } else {
          setMuscles(null);
          setStyleBiceps(vedantStyles.loginBtn);
        }
      } else if (input == 8) {
        if (styleTriceps == vedantStyles.loginBtn) {
          setStyleTriceps(vedantStyles.loginBtnClicked);
          setMuscles("triceps");
        } else {
          setMuscles(null);
          setStyleTriceps(vedantStyles.loginBtn);
        }
      } else if (input == 9) {
        if (styleLats == vedantStyles.loginBtn) {
          setStyleLats(vedantStyles.loginBtnClicked);
          setMuscles("lats");
        } else {
          setMuscles(null);
          setStyleLats(vedantStyles.loginBtn);
        }
      } else if (input == 10) {
        if (styleFore == vedantStyles.loginBtn) {
          setStyleFore(vedantStyles.loginBtnClicked);
          setMuscles("forearms");
        } else {
          setMuscles(null);
          setStyleFore(vedantStyles.loginBtn);
        }
      } else if (input == 11) {
        if (styleTraps == vedantStyles.loginBtn) {
          setStyleTraps(vedantStyles.loginBtnClicked);
          setMuscles("traps");
        } else {
          setMuscles(null);
          setStyleTraps(vedantStyles.loginBtn);
        }
      } else if (input == 12) {
        if (styleChest == vedantStyles.loginBtn) {
          setStyleChest(vedantStyles.loginBtnClicked);
          setMuscles("chest");
        } else {
          setMuscles(null);
          setStyleChest(vedantStyles.loginBtn);
        }
      } else if (input == 13) {
        if (styleNeck == vedantStyles.loginBtn) {
          setStyleNeck(vedantStyles.loginBtnClicked);
          setMuscles("neck");
        } else {
          setMuscles(null);
          setStyleNeck(vedantStyles.loginBtn);
        }
      } else if (input == 14) {
        if (styleLowBack == vedantStyles.loginBtn) {
          setStyleLowBack(vedantStyles.loginBtnClicked);
          setMuscles("lower_back");
        } else {
          setMuscles(null);
          setStyleLowBack(vedantStyles.loginBtn);
        }
      } else if (input == 15) {
        if (styleMidBack == vedantStyles.loginBtn) {
          setStyleMidBack(vedantStyles.loginBtnClicked);
          setMuscles("middle_back");
        } else {
          setMuscles(null);
          setStyleMidBack(vedantStyles.loginBtn);
        }
      } else if (input == 16) {
        if (styleCalves == vedantStyles.loginBtn) {
          setStyleCalves(vedantStyles.loginBtnClicked);
          setMuscles("calves");
        } else {
          setMuscles(null);
          setStyleCalves(vedantStyles.loginBtn);
        }
      } else if (input == 17) {
        if (styleGlutes == vedantStyles.loginBtn) {
          setStyleGlutes(vedantStyles.loginBtnClicked);
          setMuscles("glutes");
        } else {
          setMuscles(null);
          setStyleGlutes(vedantStyles.loginBtn);
        }
      } else if (input == 18) {
        if (styleHams == vedantStyles.loginBtn) {
          setStyleHams(vedantStyles.loginBtnClicked);
          setMuscles("hamstrings");
        } else {
          setMuscles(null);
          setStyleHams(vedantStyles.loginBtn);
        }
      } else if (input == 19) {
        if (styleQuads == vedantStyles.loginBtn) {
          setStyleQuads(vedantStyles.loginBtnClicked);
          setMuscles("quadriceps");
        } else {
          setMuscles(null);
          setStyleQuads(vedantStyles.loginBtn);
        }
      }
    } else {
      setStyleCardio(vedantStyles.loginBtn);
      setStyleOly(vedantStyles.loginBtn);
      setStylePlyo(vedantStyles.loginBtn);
      setStylePower(vedantStyles.loginBtn);
      setStyleStrength(vedantStyles.loginBtn);
      setStyleStretch(vedantStyles.loginBtn);
      setStyleStrong(vedantStyles.loginBtn);
      if (input == 20) {
        if (styleCardio == vedantStyles.loginBtn) {
          setStyleCardio(vedantStyles.loginBtnClicked);
          setType("cardio");
        } else {
          setStyleCardio(vedantStyles.loginBtn);
          setType(null);
        }
      } else if (input == 21) {
        if (styleOly == vedantStyles.loginBtn) {
          setStyleOly(vedantStyles.loginBtnClicked);
          setType("olympic_weightlifting");
        } else {
          setStyleOly(vedantStyles.loginBtn);
          setType(null);
        }
      } else if (input == 22) {
        if (stylePlyo == vedantStyles.loginBtn) {
          setStylePlyo(vedantStyles.loginBtnClicked);
          setType("plyometrics");
        } else {
          setStylePlyo(vedantStyles.loginBtn);
          setType(null);
        }
      } else if (input == 23) {
        if (stylePower == vedantStyles.loginBtn) {
          setStylePower(vedantStyles.loginBtnClicked);
          setType("powerlifting");
        } else {
          setStylePower(vedantStyles.loginBtn);
          setType(null);
        }
      } else if (input == 24) {
        if (styleStrength == vedantStyles.loginBtn) {
          setStyleStrength(vedantStyles.loginBtnClicked);
          setType("strength");
        } else {
          setStyleStrength(vedantStyles.loginBtn);
          setType(null);
        }
      } else if (input == 25) {
        if (styleStretch == vedantStyles.loginBtn) {
          setStyleStretch(vedantStyles.loginBtnClicked);
          setType("stretching");
        } else {
          setStyleStretch(vedantStyles.loginBtn);
          setType(null);
        }
      } else if (input == 26) {
        if (styleStrong == vedantStyles.loginBtn) {
          setStyleStrong(vedantStyles.loginBtnClicked);
          setType("strongman");
        } else {
          setStyleStrong(vedantStyles.loginBtn);
          setType(null);
        }
      } else if (input == 27) {
        console.log(muscles);
      }
    }
  };

  async function saveExercise(name) {
    var index = -1;
    for (var i = 0; i < exerciseArr.length; i++) {
      if (name == exerciseArr[i].name) {
        index = exerciseArr[i].id;
        i = exerciseArr.length;
      }
    }
    const temp1 = exerciseArr.filter((a) => a.id === index);
    const docRef = await setDoc(doc(db, "exercises", temp1[0].name), {
      difficulty: temp1[0].difficulty,
      equipment: temp1[0].equipment,
      muscle: temp1[0].muscle,
      name: temp1[0].name,
      type: temp1[0].type,
      instructions: temp1[0].instructions,
    });

    const newExerciseArr = exerciseArr.filter((a) => a.id !== index);
    setExerciseArr(newExerciseArr);
    // console.log("Save Exercise")

    console.log(temp1[0].name + " ||| " + workoutSelected);
    const docRef2 = await setDoc(
      doc(db, "accounts", user.uid, workoutSelected, temp1[0].name),
      {}
    );
  }

  async function saveExercise2() {
    const name = modalInfo.name;

    setModalAddVisible(false);
    var index = -1;
    for (var i = 0; i < exerciseArr.length; i++) {
      if (name == exerciseArr[i].name) {
        index = exerciseArr[i].id;
        i = exerciseArr.length;
      }
    }

    const temp1 = exerciseArr.filter((a) => a.id === index);
    const docRef = await setDoc(doc(db, "exercises", temp1[0].name), {
      difficulty: temp1[0].difficulty,
      equipment: temp1[0].equipment,
      muscle: temp1[0].muscle,
      name: temp1[0].name,
      type: temp1[0].type,
      instructions: temp1[0].instructions,
    });

    const newExerciseArr = exerciseArr.filter((a) => a.id !== index);
    setExerciseArr(newExerciseArr);

    const docRef2 = await setDoc(
      doc(
        db,
        "accounts",
        user.uid,
        "workouts",
        workoutSelected,
        "exercises",
        temp1[0].name
      ),
      {
        setsNum: setting1,
        restNum: setting2,
        activeNum: setting3,
        name: temp1[0].name,
      }
    );
  }

  const addInfo = () => {
    // console.log("Adding Info");
    // fruits.push({
    //   id: counter, equipment: "tools", muscle: "lats",
    // });
    setExerciseArr([
      ...exerciseArr,
      { id: counter, equipment: "tools", muscle: "lats" },
    ]);
    setCount(counter + 1);
    // console.log(counter);
  };

  const submitInput = (filter) => {
    if (filter == true) {
      setfilterModalVis(false);
      setExerciseArr([]);
      const options = {
        method: "GET",
        url: "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
        params: { muscle: muscles, difficulty: difficulty, type: type },
        headers: {
          "X-RapidAPI-Key":
            "d1b21c7c74msh10859b8b93cc3adp10d1c8jsncacbeda663df",
          "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          displayData(response.data);
          if (response.data.length == 0) {
            showMessage({
              message: "No Results",
              floating: true,
              textStyle: styles.flashText,
              titleStyle: styles.flashText,
              icon: "danger",
            });
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } else if (searchBarText != "" && filter == false) {
      setExerciseArr([]);
      const options = {
        method: "GET",
        url: "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
        params: { name: searchBarText },
        headers: {
          "X-RapidAPI-Key":
            "d1b21c7c74msh10859b8b93cc3adp10d1c8jsncacbeda663df",
          "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          displayData(response.data);
          if (response.data.length == 0) {
            showMessage({
              message: "No Results",
              floating: true,
              textStyle: styles.flashText,
              titleStyle: styles.flashText,
              icon: "danger",
            });
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } else if (searchBarText == "") {
      showMessage({
        message: "Input Exercise",
        floating: true,
        textStyle: styles.flashText,
        titleStyle: styles.flashText,
        icon: "danger",
      });
    }
  };

  const displayData = (input) => {
    console.log("----------------------");
    // setExerciseArr(exerciseArr => [...exerciseArr, allData]);
    for (var i = 0; i < input.length; i++) {
      input[i].id = counter + i;
      // input[i].id = i + 1;
    }
    setCount(counter + 10);
    setExerciseArr(input);
  };

  async function selectWorkout(index) {
    setWorkoutSelected(workoutNameArr[index]);
    for (var i = 0; i < workoutNameArr.length; i++) {
      workoutBtnStyleArr[i] = buttonRowStyles.buttonOff;
    }
    workoutBtnStyleArr[index] = buttonRowStyles.buttonOn;
  }

  const setPath = (muscleName) => {
    switch (muscleName) {
      case "abdominals":
        modalMusclePath1 = require("./muscleImages/abdominals1.png");
        modalMusclePath2 = require("./muscleImages/default2.png");
        break;
      case "abductors":
        modalMusclePath1 = require("./muscleImages/default1.png");
        modalMusclePath2 = require("./muscleImages/abductors1.png");
        break;
      case "adductors":
        modalMusclePath1 = require("./muscleImages/adductors1.png");
        modalMusclePath2 = require("./muscleImages/adductors2.png");
        break;
      case "biceps":
        modalMusclePath1 = require("./muscleImages/biceps1.png");
        modalMusclePath2 = require("./muscleImages/default2.png");
        break;
      case "calves":
        modalMusclePath1 = require("./muscleImages/calves1.png");
        modalMusclePath2 = require("./muscleImages/calves2.png");
        break;
      case "chest":
        modalMusclePath1 = require("./muscleImages/chest1.png");
        modalMusclePath2 = require("./muscleImages/default2.png");
        break;
      case "forearms":
        modalMusclePath1 = require("./muscleImages/forearms1.png");
        modalMusclePath2 = require("./muscleImages/forearms2.png");
        break;
      case "glutes":
        modalMusclePath1 = require("./muscleImages/default1.png");
        modalMusclePath2 = require("./muscleImages/glutes1.png");
        break;
      case "hamstrings":
        modalMusclePath1 = require("./muscleImages/default1.png");
        modalMusclePath2 = require("./muscleImages/hamstrings1.png");
        break;
      case "lats":
        modalMusclePath1 = require("./muscleImages/default1.png");
        modalMusclePath2 = require("./muscleImages/lats1.png");
        break;
      case "lower_back":
        modalMusclePath1 = require("./muscleImages/default1.png");
        modalMusclePath2 = require("./muscleImages/lower_back1.png");
        break;
      case "middle_back":
        modalMusclePath1 = require("./muscleImages/default1.png");
        modalMusclePath2 = require("./muscleImages/middle_back1.png");
        break;
      case "neck":
        modalMusclePath1 = require("./muscleImages/neck1.png");
        modalMusclePath2 = require("./muscleImages/neck2.png");
        break;
      case "quadriceps":
        modalMusclePath1 = require("./muscleImages/quadriceps1.png");
        modalMusclePath2 = require("./muscleImages/default2.png");
        break;
      case "shoulders":
        modalMusclePath1 = require("./muscleImages/shoulders1.png");
        modalMusclePath2 = require("./muscleImages/shoulders2.png");
        break;
      case "traps":
        modalMusclePath1 = require("./muscleImages/traps1.png");
        modalMusclePath2 = require("./muscleImages/traps2.png");
        break;
      case "triceps":
        modalMusclePath1 = require("./muscleImages/default1.png");
        modalMusclePath2 = require("./muscleImages/triceps1.png");
        break;
      default:
        modalMusclePath1 = require("./muscleImages/default1.png");
        modalMusclePath2 = require("./muscleImages/default2.png");
    }
  };

  const modalButtons = (action) => {
    var tempIndex = modalIndex;
    if (fixModalIndex) {
      setFixModalIndex(false);
      tempIndex -= exerciseArr[0].id;
    }

    if (action == "ADD") {
      // saveExercise(exerciseArr[tempIndex].name);
      setModalAddVisible(true);
      setSetting1(setNumArr[0]);
      setSetting2(timeArr[0]);
      setSetting3(timeArr[0]);
      for (var i = 0; i < setNumArr.length; i++) {
        settingStyleArr1[i] = modalAddStyles.timeButtonOff;
      }
      for (var i = 0; i < timeArr.length; i++) {
        settingStyleArr2[i] = modalAddStyles.timeButtonOff;
        settingStyleArr3[i] = modalAddStyles.timeButtonOff;
      }
      settingStyleArr1[0] = modalAddStyles.timeButtonOn;
      settingStyleArr2[0] = modalAddStyles.timeButtonOn;
      settingStyleArr3[0] = modalAddStyles.timeButtonOn;
    } else if (action == "LEFT") {
      tempIndex--;
      if (tempIndex < 0) {
        tempIndex = exerciseArr.length - 1;
      }
    } else if (action == "RIGHT") {
      tempIndex++;
      if (tempIndex > exerciseArr.length - 1) {
        tempIndex = 0;
      }
    }

    var update = true;
    var count = 0;
    // if(exerciseArr.length == 1 && action == "ADD"){
    //   setModalVisible(!modalVisible);
    //   update = false;
    // }
    // else if (action == "ADD") {
    //   if(tempIndex + 1> exerciseArr.length - 1){
    //     tempIndex = 0;
    //   } else {
    //     count = 1;
    //   }
    // }
    if (update) {
      setModalIndex(tempIndex);
      setPath(exerciseArr[tempIndex + count].muscle);
      setModalInfo({
        id: exerciseArr[tempIndex + count].id,
        name: exerciseArr[tempIndex + count].name,
        type: exerciseArr[tempIndex + count].type,
        muscle: exerciseArr[tempIndex + count].muscle,
        equipment: exerciseArr[tempIndex + count].equipment,
        difficulty: exerciseArr[tempIndex + count].difficulty,
        instructions: exerciseArr[tempIndex + count].instructions,
      });
    }
  };

  const selectSetting = (type, index) => {
    if (type == 1) {
      setSetting1(setNumArr[index]);
      for (var i = 0; i < setNumArr.length; i++) {
        settingStyleArr1[i] = modalAddStyles.timeButtonOff;
      }
      settingStyleArr1[index] = modalAddStyles.timeButtonOn;
    } else if (type == 2) {
      setSetting2(timeArr[index]);
      for (var i = 0; i < timeArr.length; i++) {
        settingStyleArr2[i] = modalAddStyles.timeButtonOff;
      }
      settingStyleArr2[index] = modalAddStyles.timeButtonOn;
    } else if (type == 3) {
      setSetting3(timeArr[index]);
      for (var i = 0; i < timeArr.length; i++) {
        settingStyleArr3[i] = modalAddStyles.timeButtonOff;
      }
      settingStyleArr3[index] = modalAddStyles.timeButtonOn;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchView}>
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => setfilterModalVis(true)}
        >
          <Image
            source={require("../assets/filter1.png")}
            style={{ width: 35, height: 35 }}
          />
        </TouchableOpacity>
        <View style={vedantStyles.inputView}>
          <TextInput
            style={vedantStyles.inputText}
            placeholder="Search"
            placeholderTextColor="#cccccc"
            onChangeText={(searchBarText) => setSearchBarText(searchBarText)}
            keyboardAppearance="dark"
          />
        </View>
        <TouchableOpacity
          style={{ paddingLeft: 6 }}
          onPress={() => submitInput(false)}
        >
          <Image
            source={require("../assets/search.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>

      <View style={buttonRowStyles.container}>
        <ScrollView
          horizontal={true}
          style={buttonRowStyles.scrollView}
          showsHorizontalScrollIndicator={false}
        >
          <View style={buttonRowStyles.buttonsView}>
            {workoutNameArr.map((info, index) => (
              <TouchableOpacity
                key={index}
                style={workoutBtnStyleArr[index]}
                onPress={() => selectWorkout(index)}
              >
                <Text style={buttonRowStyles.buttonText}> {info} </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ alignItems: "center" }}>
                <View style={modalStyles.titleView}>
                  <Text style={modalStyles.titleText}>{modalInfo.name}</Text>
                </View>

                <View style={modalStyles.mainContentView}>
                  <View style={modalStyles.modalInfoView}>
                    <View style={modalStyles.infoTextContainer}>
                      <View style={modalStyles.infoTextView1}>
                        <Text style={modalStyles.infoText1}> Difficulty </Text>
                      </View>
                      <Text style={modalStyles.infoText2}>
                        {modalInfo.difficulty}
                      </Text>
                    </View>
                    <View style={modalStyles.infoTextContainer}>
                      <View style={modalStyles.infoTextView1}>
                        <Text style={modalStyles.infoText1}> Category </Text>
                      </View>
                      <Text style={modalStyles.infoText2}>
                        {modalInfo.type}
                      </Text>
                    </View>
                    <View
                      style={[
                        modalStyles.infoTextContainer,
                        modalStyles.infoTextViewTweak,
                      ]}
                    >
                      <View style={modalStyles.infoTextView1}>
                        <Text style={modalStyles.infoText1}> Equipment </Text>
                      </View>
                      <Text style={modalStyles.infoText2}>
                        {modalInfo.equipment}
                      </Text>
                    </View>
                  </View>

                  <View style={modalStyles.flipCardView1}>
                    <View style={modalStyles.flipCardView2}>
                      <FlipCard
                        style={modalStyles.flipCard}
                        friction={6}
                        perspective={100000}
                        flipHorizontal={true}
                        flipVertical={false}
                        flip={false}
                        clickable={true}
                      >
                        <View style={modalStyles.flipContainers}>
                          <Image
                            source={modalMusclePath1}
                            style={modalStyles.imageStyle}
                          />
                        </View>
                        <View style={modalStyles.flipContainers}>
                          <Image
                            source={modalMusclePath2}
                            style={modalStyles.imageStyle}
                          />
                        </View>
                      </FlipCard>
                      <View style={modalStyles.flipMuscleView}>
                        <Text style={modalStyles.flipMuscleText}>
                          {modalInfo.muscle}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={modalStyles.controlView}>
                  <TouchableOpacity
                    style={modalStyles.controlButtons}
                    onPress={() => modalButtons("LEFT")}
                  >
                    <Icon
                      name="arrow-left-drop-circle"
                      type="material-community"
                      size={55}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={modalStyles.controlButtons}
                    onPress={() => modalButtons("ADD")}
                  >
                    <Icon
                      name="plus-circle"
                      type="material-community"
                      size={70}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={modalStyles.controlButtons}
                    onPress={() => modalButtons("RIGHT")}
                  >
                    <Icon
                      name="arrow-right-drop-circle"
                      type="material-community"
                      size={55}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={modalStyles.returnButton}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={modalStyles.returnText}>Return</Text>
                </TouchableOpacity>

                <View style={modalStyles.directionsView}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                      <Text style={modalStyles.directionsTitle}>
                        Directions
                      </Text>
                      <Text style={modalStyles.directionsBody}>
                        {modalInfo.instructions}
                      </Text>
                    </View>
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalAddVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalAddVisible(!modalAddVisible);
          }}
        >
          <BlurView
            intensity={65}
            tint="dark"
            style={modalAddStyles.modalContainer}
          >
            <View style={modalAddStyles.modalView}>
              <View style={modalAddStyles.titleView1}>
                <View style={modalAddStyles.titleView2}>
                  <Text style={modalAddStyles.titleText}>
                    Exercise Settings
                  </Text>
                </View>
                <Icon
                  onPress={() => setModalAddVisible(!modalAddVisible)}
                  style={modalAddStyles.closeButton}
                  color="#8a80d1"
                  name="close-box-outline"
                  type="material-community"
                  size="40"
                />
              </View>
              <View style={modalAddStyles.dividerView}>
                <Divider
                  borderColor="#7f6bb5"
                  color="#e2deff"
                  orientation="center"
                >
                  Time On
                </Divider>
              </View>
              <View style={modalAddStyles.scrollContainer1}>
                <ScrollView
                  horizontal={true}
                  style={modalAddStyles.scrollContainer2}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={modalAddStyles.scrollContainer3}>
                    {timeArr.map((info, index) => (
                      <TouchableOpacity
                        key={index}
                        style={settingStyleArr3[index]}
                        onPress={() => {
                          selectSetting(3, index);
                        }}
                      >
                        <Text style={modalAddStyles.timeButtonText}>
                          {info}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View style={modalAddStyles.dividerView}>
                <Divider
                  borderColor="#7f6bb5"
                  color="#e2deff"
                  orientation="center"
                >
                  Number of Sets
                </Divider>
              </View>
              <View style={modalAddStyles.scrollContainer1}>
                <ScrollView
                  horizontal={true}
                  style={modalAddStyles.scrollContainer2}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={modalAddStyles.scrollContainer3}>
                    {setNumArr.map((info, index) => (
                      <TouchableOpacity
                        key={index}
                        style={settingStyleArr1[index]}
                        onPress={() => {
                          selectSetting(1, index);
                        }}
                      >
                        <Text style={modalAddStyles.timeButtonText}>
                          {info}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View style={modalAddStyles.dividerView}>
                <Divider
                  borderColor="#7f6bb5"
                  color="#e2deff"
                  orientation="center"
                >
                  Rest Per Set
                </Divider>
              </View>
              <View style={modalAddStyles.scrollContainer1}>
                <ScrollView
                  horizontal={true}
                  style={modalAddStyles.scrollContainer2}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={modalAddStyles.scrollContainer3}>
                    {timeArr.map((info, index) => (
                      <TouchableOpacity
                        key={index}
                        style={settingStyleArr2[index]}
                        onPress={() => {
                          selectSetting(2, index);
                        }}
                      >
                        <Text style={modalAddStyles.timeButtonText}>
                          {info}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              <TouchableOpacity
                style={modalAddStyles.saveButton}
                onPress={saveExercise2}
              >
                <Text style={modalAddStyles.saveText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      </Modal>

      <Modal
        animationType="slide"
        visible={filterModalVis}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={vedantStyles.container}>
          <View style={{ marginTop: 75 }}>
            <View style={{ marginRight: 210, flexDirection: "row" }}>
              <Text style={vedantStyles.titleText}>Filters</Text>
              <Image
                source={require("../assets/filter1.png")}
                style={{
                  width: 35,
                  height: 35,
                  paddingRight: 10,
                  marginTop: 5,
                }}
              />
            </View>
          </View>
          <View style={vedantStyles.filterContainer}>
            <Text style={vedantStyles.filterHeader}>Difficulty</Text>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <View>
                <TouchableOpacity
                  style={styleBeginner}
                  onPress={() => recieveButtonClicks(1)}
                >
                  <Text style={vedantStyles.loginText}>Beginner</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styleIntermediate}
                onPress={() => recieveButtonClicks(2)}
              >
                <Text style={vedantStyles.loginText}>Intermediate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleExpert}
                onPress={() => recieveButtonClicks(3)}
              >
                <Text style={vedantStyles.loginText}>Expert</Text>
              </TouchableOpacity>
            </View>

            <Text style={vedantStyles.filterHeader}>Muscle Group</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styleAbdom}
                onPress={() => recieveButtonClicks(4)}
              >
                <Text style={vedantStyles.loginText}>Abdominals</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleAbduct}
                onPress={() => recieveButtonClicks(5)}
              >
                <Text style={vedantStyles.loginText}>Abductors</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleAdd}
                onPress={() => recieveButtonClicks(6)}
              >
                <Text style={vedantStyles.loginText}>Adductors</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styleBiceps}
                onPress={() => recieveButtonClicks(7)}
              >
                <Text style={vedantStyles.loginText}>Biceps</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleTriceps}
                onPress={() => recieveButtonClicks(8)}
              >
                <Text style={vedantStyles.loginText}>Triceps</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleLats}
                onPress={() => recieveButtonClicks(9)}
              >
                <Text style={vedantStyles.loginText}>Lats</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleFore}
                onPress={() => recieveButtonClicks(10)}
              >
                <Text style={vedantStyles.loginText}>Forearms</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styleTraps}
                onPress={() => recieveButtonClicks(11)}
              >
                <Text style={vedantStyles.loginText}>Traps</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleChest}
                onPress={() => recieveButtonClicks(12)}
              >
                <Text style={vedantStyles.loginText}>Chest</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleNeck}
                onPress={() => recieveButtonClicks(13)}
              >
                <Text style={vedantStyles.loginText}>Neck</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleLowBack}
                onPress={() => recieveButtonClicks(14)}
              >
                <Text style={vedantStyles.loginText}>Lower Back</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styleMidBack}
                onPress={() => recieveButtonClicks(15)}
              >
                <Text style={vedantStyles.loginText}>Middle Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleCalves}
                onPress={() => recieveButtonClicks(16)}
              >
                <Text style={vedantStyles.loginText}>Calves</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleGlutes}
                onPress={() => recieveButtonClicks(17)}
              >
                <Text style={vedantStyles.loginText}>Glutes</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styleHams}
                onPress={() => recieveButtonClicks(18)}
              >
                <Text style={vedantStyles.loginText}>Hamstrings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleQuads}
                onPress={() => recieveButtonClicks(19)}
              >
                <Text style={vedantStyles.loginText}>Quadriceps</Text>
              </TouchableOpacity>
            </View>

            <Text style={vedantStyles.filterHeader}>Type</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styleCardio}
                onPress={() => recieveButtonClicks(20)}
              >
                <Text style={vedantStyles.loginText}>Cardio</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleOly}
                onPress={() => recieveButtonClicks(21)}
              >
                <Text style={vedantStyles.loginText}>
                  Olympic Weightlifting
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={stylePlyo}
                onPress={() => recieveButtonClicks(22)}
              >
                <Text style={vedantStyles.loginText}>Plyometrics</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={stylePower}
                onPress={() => recieveButtonClicks(23)}
              >
                <Text style={vedantStyles.loginText}>Powerlifting</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleStrength}
                onPress={() => recieveButtonClicks(24)}
              >
                <Text style={vedantStyles.loginText}>Strength</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styleStretch}
                onPress={() => recieveButtonClicks(25)}
              >
                <Text style={vedantStyles.loginText}>Stretching</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleStrong}
                onPress={() => recieveButtonClicks(26)}
              >
                <Text style={vedantStyles.loginText}>Strongman</Text>
              </TouchableOpacity>
            </View>

            <View style={vedantStyles.filterButtonsView}>
              <TouchableOpacity
                onPress={() => setfilterModalVis(false)}
                style={vedantStyles.backBtnView}
              >
                <Text style={vedantStyles.backText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => submitInput(true)}
                style={vedantStyles.searchBtnView}
              >
                <Text style={vedantStyles.searchText}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView
        style={mainScrollView.scrollContainer1}
        showsVerticalScrollIndicator={false}
      >
        <View style={mainScrollView.scrollContainer2}>
          {exerciseArr.map((info, index) => (
            <View key={index} style={mainScrollView.cardComp}>
              <View style={mainScrollView.cardTextView}>
                <Text style={mainScrollView.cardText1}> {info.name} </Text>
                <Text style={mainScrollView.cardText2}>
                  {" "}
                  {info.difficulty}{" "}
                </Text>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={[mainScrollView.cardInfoBtn]}
                  onPress={() => {
                    setModalVisible(true);
                    setModalIndex(info.id);
                    setFixModalIndex(true);
                    setPath(info.muscle);
                    setModalInfo({
                      id: info.id,
                      name: info.name,
                      type: info.type,
                      muscle: info.muscle,
                      equipment: info.equipment,
                      difficulty: info.difficulty,
                      instructions: info.instructions,
                    });
                  }}
                >
                  <Icon
                    style={{ alignContent: "end" }}
                    color="#c8c5db"
                    // name="menu"
                    // type="material"
                    name="more-horiz"
                    type="material"
                    size="30"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const buttonRowStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "7%",
    width: "100%",
    marginBottom: 10,
  },
  scrollView: {
    width: "100%",
  },
  buttonsView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonOn: {
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: "#8e8efa",
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    maxWidth: 150,
    backgroundColor: "#8e8efa",
  },
  buttonOff: {
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: "#79829c",
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    maxWidth: 150,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#fff",
  },
});

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#11111a", //'#404057', //0d0d12 //1a1a29
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "80.5%",
    width: "100%",
  },

  titleView: {
    backgroundColor: "#505075",
    padding: 12,
    borderRadius: 15,
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 60,
    width: "90%",
    flexDirection: "row",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  titleText: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 20,
  },

  mainContentView: {
    flexDirection: "row",
    // backgroundColor: "#3e3e57",
    height: 400,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
    width: "100%",
  },
  modalInfoView: {
    width: "50%",
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#7c6f9e", //8e8efa//7c6f9e
    borderRadius: 7,
  },

  infoTextContainer: {
    borderColor: "black",
    alignItems: "center",
    // backgroundColor: "grey",
    borderBottomWidth: 3,
    borderColor: "#7c6f9e",
    paddingVertical: 20,
    width: "90%",
  },
  infoTextView1: {
    width: "80%",
    borderTopColor: "8e8efa",
    borderBottomColor: "8e8efa",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderColor: "white",
  },
  infoTextViewTweak: {
    borderBottomWidth: 0,
  },
  infoText1: {
    fontSize: 25, //25
    fontWeight: "400",
    color: "#fff",
    letterSpacing: 1.5,
  },
  infoText2: {
    fontSize: 19, //18
    marginBottom: 5,
    color: "#d0d1d6",
    maxWidth: 160,
    maxHeight: 30,
  },

  flipMuscleView: {
    width: "100%",
    minWidth: "95%",
    height: "9%",
    alignItems: "center",
    borderTopColor: "black",
    borderTopWidth: 3,
  },
  flipMuscleText: {
    fontSize: 25,
  },

  flipCardView1: {
    // backgroundColor: "grey",
    maxHeight: 200 * 2,
    width: "50%",
    alignItems: "center",
  },
  flipCardView2: {
    backgroundColor: "#8e8efa",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 7,
    // borderWidth: 3,
    // borderColor: "#7c6f9e",
  },
  flipCard: {
    height: 200 * 1.8,
    width: 100 * 1.8,
    maxHeight: 200 * 1.8,
    maxWidth: 180 * 1.8,
    backgroundColor: "#babaf7",
    alignItems: "center",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  flipContainers: {
    marginTop: 10,
    maxHeight: "95%",
    maxWidth: "95%",
  },
  imageStyle: {
    maxHeight: "100%",
    maxWidth: "100%",
    backgroundColor: "#babaf7",
  },

  controlView: {
    flexDirection: "row",
    backgroundColor: "#393b63",
    // borderColor: "#393b63",
    // borderWidth: 1.5,
    width: 300,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  controlButtons: {
    maxHeight: 100,
    maxWidth: 100,
    height: 80,
    width: 80,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  returnButton: {
    marginTop: 15,
    backgroundColor: "#393b63",
    width: 100,
    height: 40,
    borderRadius: 5,
    // borderColor: "#393b63",
    // borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  returnText: {
    fontSize: 20,
    fontWeight: "300",
    color: "#fff",
  },

  directionsView: {
    marginTop: 30,
    height: 450,
    width: "90%",
    borderRadius: 4,
    backgroundColor: "#2e2645",
    paddingVertical: 10,
    marginBottom: 20,
  },
  directionsTitle: {
    fontSize: 25,
    color: "#d1ced9",
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 10,
    letterSpacing: 2,
  },
  directionsBody: {
    fontSize: 20,
    color: "#d1ced9",
    fontWeight: "300",
    marginTop: 15,
    marginLeft: 20,
    marginRight: 10,
    lineHeight: 25,
  },
});

const modalAddStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    alignItems: "center",
    height: "54%",
    width: "70%",
    backgroundColor: "#404057", //'#404057', //0d0d12 //26, 26, 41
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#7f6bb5", //8a7ed9
  },
  titleView1: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7,
  },
  titleView2: {
    width: 190,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "#e2deff",
    fontSize: 20,
    fontWeight: "300",
    letterSpacing: 1.5,
  },
  closeButton: {
    // marginTop: 7,
    // marginRight: 7,
    marginLeft: 20,
  },

  scrollContainer1: {
    flex: 1,
    maxHeight: 45,
    width: "90%",
    backgroundColor: "#2b2b40",
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  scrollContainer2: {
    maxHeight: 45,
  },
  scrollContainer3: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    paddingHorizontal: 5,
    borderRadius: 3,
    backgroundColor: "#2b2b40",
  },
  timeButtonOff: {
    width: 40,
    height: 30,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  timeButtonOn: {
    width: 40,
    height: 30,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#67678f",
  },
  timeButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "300",
  },
  dividerView: {
    width: "92%",
    marginVertical: 10,
  },

  saveButton: {
    borderRadius: 5,
    // borderWidth: 3,
    borderColor: "#7d73bf",
    backgroundColor: "#5a5a7d",
    marginTop: 30,
    paddingHorizontal: 80,
    paddingVertical: 8,
  },
  saveText: {
    letterSpacing: 2,
    fontSize: 23,
    fontWeight: "300",
    color: "#f1f0fc",
  },
});

const mainScrollView = StyleSheet.create({
  scrollContainer1: {
    width: "100%",
    paddingTop: 10,
    // backgroundColor: "cyan",
    height: "78%",
    maxHeight: "78%",
  },
  scrollContainer2: {
    alignItems: "center",
    width: "100%",
    // backgroundColor: "red",
    paddingBottom: 10,
  },
  cardComp: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#282838",
    height: 70,
    borderWidth: 0,
    borderRadius: 7,
    marginBottom: 5.5,
    alignItems: "center",
    height: 60,
  },
  cardTextView: {
    marginLeft: 10,
    width: "85%",
  },
  cardText1: {
    color: "#e0e0e0",
    fontSize: 16,
    overflow: "hidden",
    maxHeight: 25,
    maxWidth: "90%",
  },
  cardText2: {
    color: "#a8a8a8",
    fontSize: 15,
    fontWeight: "300",
  },
  cardInfoBtn: {
    height: 30,
    // backgroundColor: "darkblue",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
});

const styles = StyleSheet.create({
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

  mainContainer: {
    //
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0d0d12",
  },
  searchView: {
    //
    // width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  buttonView: {
    //
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
});

const vedantStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0d0d12",
  },
  filterContainer: {
    alignItems: "center",
  },
  titleText: {
    color: "#8e8efa",
    fontWeight: "500",
    fontSize: 35,
    // alignSelf: "left",
    marginBottom: 25,
  },
  filterHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    margin: 5,
    marginTop: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  dividerView: {
    width: "87%",
  },
  loginBtn: {
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(227, 227, 255, 0.2)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    margin: 5,
    shadowOffset: { width: 1, height: 13 },
  },

  loginBtnClicked: {
    borderRadius: 7,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#8e8efa",
    shadowColor: "rgba(227, 227, 255, 0.2)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    margin: 5,
    shadowOffset: { width: 1, height: 13 },
  },
  loginText: {
    fontWeight: "600",
    fontSize: 15,
  },
  returnText: {
    fontWeight: "600",
    fontSize: 35,
    color: "#FF0101",
    // alignSelf: "left",
  },

  inputView: {
    borderColor: "#404057",
    borderWidth: 2,
    borderRadius: 5,
    height: 45,
    width: 250,
    marginRight: 5,
    alignItems: "center",
  },
  inputText: {
    height: 50,
    width: "100%",
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: "#ffffff",
  },
  scrollContainer1: {
    flex: 1,
  },
  scrollContainer2: {
    flex: 1,
    alignItems: "center",
  },
  cardComp: {
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#282838",
    borderWidth: 0,
    borderRadius: 7,
    marginBottom: 5,
    alignItems: "center",
    height: "15%",
  },
  cardTextView: {
    marginLeft: 10,
    width: "85%",
  },
  cardText1: {
    color: "#e0e0e0",
    fontSize: 16,
  },
  cardText2: {
    color: "#a8a8a8",
    fontSize: 15,
    fontWeight: "300",
  },
  cardInfoBtn: {
    height: 30,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  buttonView: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  filterButtonsView: {
    flexDirection: "row",
    marginTop: 45,
    // marginRight: 265,
    justifyContent: "center",
    alignItems: "center",
  },
  backText: {
    fontWeight: "600",
    fontSize: 35,
    color: "#FF0101",
    marginLeft: 20,
  },
  searchText: {
    fontWeight: "600",
    fontSize: 35,
    color: "#1ad983",
    alignSelf: "flex-end",
    marginRight: 20,
  },
  backBtnView: {
    width: "50%",
  },
  searchBtnView: {
    width: "50%",
  },
});
