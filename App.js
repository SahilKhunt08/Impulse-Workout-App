import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from "react";

import Home from "./pages/home";
import Workout from "./pages/workout";
import AddFriends from "./pages/addFriends";
import Profile from "./pages/profile";
import Login from "./pages/login";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Testing1 = ({ title, showButton }) => (
  <View>
    <Text style={{ fontSize: 60 }}>{title}</Text>
    {showButton && <Button title="Press me!" />}
  </View>
)

function Impulse() {
  return (
    <Tab.Navigator  screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Workout" component={Workout} />
      <Tab.Screen name="addFriends" component={AddFriends} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer  screenOptions={{ headerShown: false }}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home"  >{Home}</Stack.Screen>
        <Stack.Screen name="Impulse" component={Impulse} />
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
