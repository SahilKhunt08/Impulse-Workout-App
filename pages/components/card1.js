import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Card} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="tree" />

const Card1 = () => (
  <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
);

export default Card1;