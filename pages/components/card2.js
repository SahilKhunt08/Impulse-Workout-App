import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="human" />

const Card2 = () => (
    <View style={styles.container}>
        {/* <Text style={styles.title}>React Native</Text> */}
        <Card.Title title="Full Name" subtitle="User Name" left={LeftContent} />
        <View style={{alignContent: "center"}}>
            <Button style={styles.button1}>Cancel</Button>
            <Button style={styles.button1}>Add</Button>
        </View>
  </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        width: 350,
        borderColor: "black",
        borderWidth: 4,
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
        maxWidth: 150,
        fontSize: 10,
        backgroundColor: "white",
    },

    // boxes: {
    //     margin: 20px;
    //     margin-top: 150px;
    //     background-color: rgb(198, 177, 198);
    //     overflow: hidden;
    //     height: 200px;
    //     max-height: 35vh;
    //     box-shadow: 0px 12px 18px -6px rgba(0, 0, 0, 0.3);
    //     border-radius: 10px 10px 10px 10px;
    // }
  });
export default Card2;