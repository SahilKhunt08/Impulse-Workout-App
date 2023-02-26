import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card} from 'react-native-paper';

// import "/card2.css";
// import "pages/components/card2.css"

const LeftContent = props => <Avatar.Icon {...props} icon="human" />

export default function Card2(){
    return (
    <View style={styles.container}>
        <Card.Title title='Full Name' subtitle='User Name' left={LeftContent} />
    </View>
  )}
  
  const styles = StyleSheet.create({
    container: {
      // display: 'flex',
      // flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'start',
      maxHeight: 200,
      width: 350,
    },
  });
  
