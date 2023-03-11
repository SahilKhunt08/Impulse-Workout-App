import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
// import './pages/page2.css'
// import "./pages/allPages.css"

export default function Page3() {

  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
