import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
// import './pages/home.css'
// import "./pages/allPages.css"
import Card1 from "./components/card1";
import Card2 from "./components/card2";

export default function Home({ navigation }) {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#429692'}}>
      {/* <Text> Temp </Text> */}
      {/* <Card1></Card1> */}
      {/* <Text> Temp </Text> */}
      <Card2></Card2>
      {/* <Card2></Card2> */}
    </View>
  )
}
