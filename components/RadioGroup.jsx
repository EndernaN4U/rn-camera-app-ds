import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RadioButton } from 'react-native-paper'

export default function RadioGroup({onChange, value, data}) { 
  return (
    <View>
        <RadioButton value='wow'/>
    </View> 
  )
}