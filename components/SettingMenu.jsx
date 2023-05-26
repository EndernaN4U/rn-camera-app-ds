import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import RadioGroup from './RadioGroup'

export default function SettingMenu({settings, setSettings, possibles}) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(()=>{
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  },[])

  return (
    <Animated.View style={{...styles.container,opacity: opacity}}>
      <Text>SettingMenu</Text>
      <RadioGroup onChange={(value)=>{
        setSettings(dat=>{
            dat.ratio = value;
            return {...dat};
        })
      }} data={possibles.ratio} value={settings.ratio}/>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        left: 0,
        top: 0,
        width: 200,
        height: 500,
        backgroundColor: 'rgba(200,200,200,0.35)',
    }
})