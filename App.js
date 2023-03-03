import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React, { useState } from "react";

import Home from "./pages/home";
import Page2 from "./pages/page2";
import Page3 from "./pages/page3";
import Profile from "./pages/profile";

import Login from "./pages/login";
// import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// function CheckLogin() {
//   // const [loggedIn, setLoggedIn] = useState(false);
//   const checkLogin = () => {
//   if (loggedIn == true) {
//     return <Tab.Screen name="Profile" component={Profile} />
//   } else {
//     return <Tab.Screen name="Login" component={Login} />
//   }
// }

// }



const Testing1 = ({ title, showButton }) => (
  <View>
    <Text style={{ fontSize: 60 }}>{title}</Text>
    {showButton && <Button title="Press me!" />}
  </View>
)


function MyTabs() {
  // const [loggedIn, setLoggedIn] = useState(false)
  // console.log(loggedIn)

  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Login" component={Login} /> */}
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Page2" component={Page2} />
      <Tab.Screen name="Page3" component={Page3} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* <Tab.Screen name="Login" component={Login} /> */}
      {/* {loggedIn == 'true'? <Tab.Screen name="Login" component={Login} /> : <Tab.Screen name="Profile" component={Profile}/>} */}


      {/* <CheckLogin/> */}
    </Tab.Navigator>
  );
}


export default function App() {

  const [boolean1, setboolean1] = useState(!false);
  const [boolean2, setboolean2] = useState(!true);
  const handleTemp = () => {
    setboolean1(!boolean1);
  }

  return (
    // <View style={styles.container}>
    //   {boolean1 && <Login></Login>}
    //   {boolean2 && <NavigationContainer>
    //     <MyTabs/>
    //   </NavigationContainer> }
    // </View>


  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Page2} />

    </Stack.Navigator>
  </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#429692',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
});






//authstack
//navigation.navigate


