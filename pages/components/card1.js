import React from 'react';
// import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card} from 'react-native-paper';
// import pic1 from "assets/baseline_account_circle_black_24dp.png";
// import yuh from assets\splash.png


const LeftContent = props => <Avatar.Icon {...props} icon="human" />

const Card1 = () => (
  <Card style={styles.container}>
    <View>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    </View>
    <View>
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    // flex: 1,
    // backgroundColor: '#429692',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'start',
    maxHeight: 200,
    width: 350,
  },
});

export default Card1;