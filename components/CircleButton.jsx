import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CircleButton({onPress, icon}) {

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn:{
    backgroundColor: 'grey',
    opacity: 0.85,
    width: 100,
    height: 100,
    borderRadius: 50
  }
})