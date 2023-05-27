import { View, Text, FlatList, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import RadioButton from './RadioButton';

export default function RadioGroup({onChange, value, data}) { 
    const handleChange = (valu)=>{
        onChange(valu);
    }
  return (
    <View>
        {
            data.map((el, ind)=>{
                return (
                    <View key={ind} style={{display: 'flex', flexDirection: 'row'}}>
                        <RadioButton size={40} value={el} isChecked={(el===value)} onPress={handleChange}/>
                        <Text>{el}</Text>
                    </View>
                )
            })
        }
    </View> 
  )
}