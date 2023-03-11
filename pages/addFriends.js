import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { auth } from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function addFriends() {

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  
  return (
    <View estyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card
        title='HELLO WORLD'
        image={require('')}>
        <Text style={{marginBottom: 10}}>
          The idea with React Native Elements is more about component structure than actual design.
        </Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' />
      </Card>
      <Text>Page3</Text>
    </View>
  )
}
