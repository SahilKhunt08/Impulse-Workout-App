import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
// import './pages/home.css'
// import "./pages/allPages.css"
import Card1 from "./components/card1";

export default function Home() {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#429692'}}>
      <Text>Home!</Text>
      <Card1></Card1>
    </View>
  )
}
