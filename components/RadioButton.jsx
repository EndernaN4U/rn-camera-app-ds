import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function RadioButton({value, isChecked, onPress, size, onColor, offColor}) {
  const styles = StyleSheet.create({
    width: size || 20,
    height: size || 20,
    borderRadius: size / 2 || 10,
    backgroundColor: isChecked? (onColor || 'green') : (offColor || 'red'),
  })
  return (
    <TouchableOpacity 
      onPress={()=>onPress(value)}
      style={styles}
    />
  )
}
