//Issues
//Workout name field changes when you edit but the doc id doesnt



import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Button, Modal, Settings} from "react-native";
import Card1 from "./components/card1";
import Card2 from "./components/card2";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { addDoc, doc, enableNetwork, setDoc, getCountFromServer, collection, getDocs, namedQuery, updateDoc,getDoc, deleteDoc} from "firebase/firestore"; 
import {db} from './firebase';
import { async } from "@firebase/util";


export default function HomeScroll() {
    return (
        <ScrollView horizontal={true} style={homeScrollMain.container}>
            <View style={homeScrollMain.scrollContainer}>

                <Image source={ require('../assets/workingout.jpeg') } style={homeScrollMain.banner} />
                <Text style={homeScrollMain.titleText}>Friend's Workouts</Text>
            </View>
            <View style={homeScrollMain.scrollContainer}>

                <Image source={ require('../assets/soloworkout.jpeg') } style={homeScrollMain.banner} />
                <Text style={homeScrollMain.titleText}>Impulse Workouts</Text>
            </View>
        </ScrollView>
    )
}
const homeScrollMain = StyleSheet.create({
    container: {
      marginLeft: 33.5,
      marginBottom: 30,
      height: 250,
      width: 310,
    },

    scrollContainer: {
        margin: 10
      },

    banner: {
       
        alignSelf: 'center',
        
        height: 130,
        width: 300,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
        width: 0,
        height: 2,
      },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      titleText: {
        position:'absolute',
        color: "#067785",
        fontWeight: "900",
        fontSize: 20,
        alignSelf: "left",
        left: 100,
        marginTop: 100

      },
      titleText1: {
        position:'absolute',
        color: "#067785",
        fontWeight: "900",
        fontSize: 20,
        alignSelf: "left",
        left: 100,
        marginTop: 100

      },
  })
