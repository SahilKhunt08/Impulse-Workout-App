import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
// import './pages/home.css'
// import "./pages/allPages.css"
import Card1 from "./components/card1";
import Card2 from "./components/card2";

export default function Home({ navigation }) {
    return (
    <View style={styles.container}>
      {/* <Text> Temp </Text> */}
      {/* <Card1></Card1> */}
      {/* <Text> Temp </Text> */}
      {/* <Card2></Card2> */}
      {/* <Card2></Card2> */}
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#adc9db',
  },

});
