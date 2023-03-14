import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { Avatar } from '@rneui/themed';

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.profilePicture}>
        <Avatar
          size={150}
          rounded
          source={require('../assets/person2.png')}
        ></Avatar>
      </View>
      <Card>
        <Text style={styles.paragraph}>
          Name Name
        </Text>
        {/* <Image source={require('../assets/person1.png')}></Image> */}
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
    backgroundColor: '#7ab3d6',
    alignContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    // marginTop: 5,
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20
  },
});