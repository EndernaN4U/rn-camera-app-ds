import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function RadioButton({value, isChecked, onPress, size}) {
  const styles = StyleSheet.create({
    width: size || 20,
    height: size || 20,
  })
  return (
    <TouchableOpacity 
      onPress={()=>onPress(value)}
      style={{width: size || 20, height: 20, backgroundColor: isChecked? "green": "red"}}
    />
  )
}
