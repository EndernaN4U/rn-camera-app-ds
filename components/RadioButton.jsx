import { TouchableOpacity } from 'react-native'
import React from 'react'

export default function RadioButton({value, isChecked, onPress}) {
  return (
    <TouchableOpacity onPress={()=>onPress(value)} style={{width: 20, height: 20, backgroundColor: isChecked? "green": "red"}} />
  )
}