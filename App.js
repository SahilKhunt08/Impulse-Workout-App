import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./pages/home";
import Page2 from "./pages/page2";
import Page3 from "./pages/page3";
import Profile from "./pages/profile";  

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Page2" component={Page2} />
      <Tab.Screen name="Page3" component={Page3} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Sahil changed stuff! Viddy Change</Text>
    //   <StatusBar style="auto" />
    //   <Home></Home>
    // </View>  
     
    <NavigationContainer>
      <MyTabs />
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

