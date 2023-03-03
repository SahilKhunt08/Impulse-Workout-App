import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from "react";

import Home from "./pages/home";
import Page2 from "./pages/page2";
import Page3 from "./pages/page3";
import Profile from "./pages/profile";

import Login from "./pages/login";
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';

const Tab = createBottomTabNavigator();

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


function MyTabs() {
  const [loggedIn, setLoggedIn] = useState(false)
  console.log(loggedIn)

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Page2" component={Page2} />
      <Tab.Screen name="Page3" component={Page3} />
      {loggedIn == 'true'? <Tab.Screen name="Login" component={Login} /> : <Tab.Screen name="Profile" component={Profile}/>}


      {/* <CheckLogin/> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#429692',
    // alignItems: 'center',
    // justifyContent: 'center',
    
  },
});

