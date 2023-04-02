import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from "react";
import { Icon } from '@rneui/themed';

import Home from "./pages/home";
import Workout from "./pages/workout";
import Friends from "./pages/friends";
import Profile from "./pages/profile";
import Login from "./pages/login";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Impulse() {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: true, 
        tabBarActiveTintColor: '#9595f5',
        tabBarInactiveTintColor: '#d6d6d6',
      }}
    >
      <Tab.Screen name="Home" component={Home} 
        options={{
          // title: 'Home',
          headerTitle: "Home",
          tabBarLabel: "Home",
          headerStyle: {
            backgroundColor: '#32324a',  
          },
          tabBarStyle: {
            backgroundColor: '#32324a',  
            borderTopWidth: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Icon
              name="home"
              type="material"
                size={27}
                color={tabInfo.focused ? "#7d7dfa" : "#fff"}
              />
            );
          },
        }}
      />
      <Tab.Screen name="Workout" component={Workout} 
        options={{
          title: 'Workout',
          headerStyle: {
            backgroundColor: '#32324a',  
          },
          tabBarStyle: {
            backgroundColor: '#32324a',  
            borderTopWidth: 0,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Icon
                name="dumbbell"
                type="material-community"
                size={27}
                color={tabInfo.focused ? "#7d7dfa" : "#fff"}
              />
            );
          },
        }}
      />
      <Tab.Screen name="Friends" component={Friends} 
        options={{
          title: 'Friends',
          headerStyle: {
            backgroundColor: '#32324a',  
          },
          tabBarStyle: {
            backgroundColor: '#32324a',  
            borderTopWidth: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Icon
              name="people"
              type="material"
                size={27}
                color={tabInfo.focused ? "#7d7dfa" : "#fff"}
              />
            );
          },
        }}      
      />
      <Tab.Screen name="Profile" component={Profile} 
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#32324a',  
          },
          tabBarStyle: {
            backgroundColor: '#32324a',  
            borderTopWidth: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Icon
              name="account-circle"
              type="material"
                size={27}
                color={tabInfo.focused ? "#7d7dfa" : "#fff"}
              />
            );
          },
        }}      
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}
          options={{
            title: 'Welcome',
            headerStyle: {
              backgroundColor: '#0d0d12',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen name="Impulse" component={Impulse}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
