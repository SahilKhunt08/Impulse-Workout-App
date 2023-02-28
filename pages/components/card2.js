import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Avatar, Button, Card} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="human" />

const Card2 = () => (
    <View style={styles.container}>
        {/* <Text style={styles.title}>React Native</Text> */}
        <Card.Title title="Full Name" subtitle="User Name" left={LeftContent} style={styles.temp}/>
        <View style={styles.testView}> 
            <Button style={styles.button1}>Cancel</Button>
            <Button style={[styles.button1, styles.purple]}>Add</Button>
        </View>
  </View>
);

const styles = StyleSheet.create({
    testView: {
        alignItems: "center",
        flexDirection: "row",
        // marginLeft: 100,
    },
    container: {
        padding: 1,
        backgroundColor: '#f6f3f9',
        borderRadius: 10,
        width: 350,
        borderColor: "black",
        borderWidth: 4,

        // display: "flex",
        // textAlign: "center",
        justify: "center",
        flexDirection: "row",
    },
    title: {
    //   marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 6,
        backgroundColor: '#61dafb',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    button1: {
        margin: 5,
        borderColor: 'black',
        borderWidth: 1,
        color: "",
        maxWidth: 100,
        fontSize: 10,
        backgroundColor: "white",
    },
    purple: {
        // backgroundColor: '#635b9f',
        // /: 'white',
    },
    temp: {
        borderColor: "black",
        // borderWidth: 4,
        maxWidth: 175,
        width: 175,
    },

  });
  
export default Card2;