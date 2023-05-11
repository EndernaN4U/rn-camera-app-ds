import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function MyButton({children, text, style, onPress, textStyle}) {
  return (
    <TouchableOpacity style={style} onPress={onPress || function(){return null}} >
        <Text style={textStyle}>{children || text}</Text>
    </TouchableOpacity>
  )
}