import { View, Text, FlatList, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RadioButton } from 'react-native-paper'

export default function RadioGroup({onChange, value, data}) { 
    const [val, setVal] = useState(value);
    const handleChange = (valu)=>{
        console.log(valu)
        setVal(valu);
        onChange(valu);
    }
  return (
    <View onTouchStart={()=>{console.log("wow")}}>
        {
            data.map((el, ind)=>{
                return (
                    <View key={ind} style={{display: 'flex', flexDirection: 'row', backgroundColor: 'red'}}
                        onTouchStart={()=>{console.log("wwww")}}>
                        <RadioButton value={el}
                        status={el===val?'checked':'unchecked'}
                        onPress={()=>{console.log("wow")}}
                        />
                        <Text style={{backgroundColor: 'grey'}} onPressOut={()=>{console.log("Xd")}}>{el}</Text>
                    </View>
                )
            })
        }
    </View> 
  )
}