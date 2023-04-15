import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, TouchableOpacity } from 'react-native';


export default function RedirectCards() {
    return(
    <View>
        <View style={redirectStyle.container}>  
            <Image source={ require('../assets/leaderboardBanner.webp') } style={ { width: '96%', height: 165, marginTop: 48, marginLeft: 8, borderRadius: 10} } />
        </View>                                                                                                                                                                                                                                                                                                                                                                 
    </View>
    )
}

const redirectStyle = StyleSheet.create({

    container: {
      backgroundColor: '#404057',
      margin: 6,
      height: 220,
      width: '96.5%',
      shadowColor: 'rgba(215, 215, 250, 0.2)',
      borderRadius: 10,
      shadowOpacity: 0.5,
      elevation: 6,
      shadowRadius: 15,
      shadowOffset : { width: 0, height: 5},
    },

   
})

