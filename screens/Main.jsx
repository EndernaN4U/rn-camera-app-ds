import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import colors from '../data/colors.json'

export default function Main({navigation}) {
  return (
    <View style={styles.container}>
      <Text
      onPress={()=>navigation.navigate('gallery')}
       style={{...styles.text, fontSize: 50}}>
        Camera App
      </Text>
      <Text style={{...styles.text, fontSize: 28}}>
        show gallery pictures from camera save photos etc.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: colors.mainTextColor,
    marginBottom: 20,
    textAlign:'center'
  },
});