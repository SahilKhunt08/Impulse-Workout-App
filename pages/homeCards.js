import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TouchableOpacity } from 'react-native';


export default function HomeCards() {
    return(
    <View>
        <View style={cardStyle.container}>

            <Text style={cardStyle.titleText}>Workout 1</Text>
            <View style={cardStyle.image}>
                <TouchableOpacity style = {{paddingRight:10, left:'315%', marginTop: 105}}>
                    <Image source={ require('../assets/arrow2.png') } style={ { width: 50, height: 55 } } />
                </TouchableOpacity>   
                
            </View>
            <View>
                 <Text style={cardStyle.subText}>Luh calm workout for da arms I aint gonna lie</Text>
            </View>
            <Text style={cardStyle.arrowText}>Jump In</Text>         

            
        </View>
    </View>
    )
}

const cardStyle = StyleSheet.create({

    container: {
      backgroundColor: '#404057',
      marginTop: 30,
      margin: 10,
      height: 160,
      width: 255,
      borderRadius: 10
    },

    image: {
        position: 'absolute'
    },

    titleText: {
        color: "#ffffff",
        fontWeight: "500",
        fontSize: 20,
        alignSelf: "left",
        marginTop: 12,
        marginLeft: 12,
        marginRight: 5
    },

    subText: {
        color: "#ffffff",
        marginTop: 10,
        marginLeft: 10,
        marginRight: 5

    },

    arrowText: {
        color: "#0d0d12",
        fontSize: 18,
        fontStyle: 'italic',
        marginTop: 41,
        marginLeft: 122,
        marginRight: 20

        

    }

})
