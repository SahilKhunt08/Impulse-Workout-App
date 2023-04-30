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
                <Text style={homeScrollMain.titleText}>Friend Workouts</Text>
                <View style={homeScrollMain.scrollContainer1}>
                    <ScrollView>
                        <View style={homeScrollMain.workoutCard1}>

                        </View>
                        <View style={homeScrollMain.workoutCard1}>

                        </View>
                        <View style={homeScrollMain.workoutCard1}>

                        </View>
                        <View style={homeScrollMain.workoutCard1}>

                        </View>
                        <View style={homeScrollMain.workoutCard1}>

                        </View>
                        <View style={homeScrollMain.workoutCard1}>

                        </View>
                    </ScrollView>
                </View>
                
            </View>
            <View style={homeScrollMain.scrollContainer}>

                <Image source={ require('../assets/soloworkout.jpeg') } style={homeScrollMain.banner} />
                <Text style={homeScrollMain.titleText1}>Impulse Workouts</Text>

                <View style={homeScrollMain.scrollContainer1}>
                    <ScrollView>
                    <View style={homeScrollMain.workoutCard}>

                    </View>
                    <View style={homeScrollMain.workoutCard}>

                    </View><View style={homeScrollMain.workoutCard}>

                    </View>
                    <View style={homeScrollMain.workoutCard}>

                    </View>
                    <View style={homeScrollMain.workoutCard}>

                    </View>
                    <View style={homeScrollMain.workoutCard}>

                    </View>
                </ScrollView>
                </View>
            </View>
        </ScrollView>
    )
}
const homeScrollMain = StyleSheet.create({
    container: {
      marginLeft: 17.5,
      marginBottom: 120,
      height: 250,
      width: 350,
    },

    scrollContainer: {
        margin: 10
      },

      scrollContainer1: {
        height: '78%',
        maxHeight: '78%'

      },
    banner: {
        alignSelf: 'center',
        height: 130,
        width: 310,
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
        color: "#466D97",
        fontWeight: "700",
        fontSize: 20,
        alignSelf: "left",
        left: 125,
        marginTop: 100

      },
      titleText1: {
        position:'absolute',
        color: "#C03546",
        fontWeight: "700",
        fontSize: 20,
        alignSelf: "left",
        left: 110,
        marginTop: 100

      },

      workoutCard1: {
        marginTop:10, 
        marginLeft:4,
        height: 55,
        width: 300,
        borderRadius: 4,
        backgroundColor: "#466D97"
      },

      workoutCard: {
        marginTop:10, 
        marginLeft:4,
        height: 55,
        width: 300,
        borderRadius: 4,
        backgroundColor: "#C03546"
      },
  })
