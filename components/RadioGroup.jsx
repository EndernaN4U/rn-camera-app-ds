import { View, Text, FlatList } from 'react-native'
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
    <View>
        {
            data.map((el, ind)=>{
                return (
                    <View key={ind} style={{display: 'flex', flexDirection: 'row'}}
                        onTouchStart={()=>{handleChange(el)}}>
                        <RadioButton value={el}
                        status={el===val?'checked':'unchecked'}
                        />
                        <Text>{el}</Text>
                    </View>
                )
            })
        }
    </View> 
  )
}