import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card} from 'react-native-paper';
// import pic1 from "assets/baseline_account_circle_black_24dp.png";
// import yuh from assets\splash.png

const LeftContent = props => <Avatar.Icon {...props} icon="human" />

const Card1 = () => (
  <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
);

export default Card1;