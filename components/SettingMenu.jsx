import { View, Text, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RadioGroup from './RadioGroup'

export default function SettingMenu({settings, setSettings, possibles, opnd}) {
  const position = useRef(new Animated.Value(dims.height)).current;
  useEffect(()=>{
    Animated.spring(position, {
      toValue: opnd ? 0 : dims.height,
      velocity: 1,
      duration: 500,
      friction: 10,
      useNativeDriver: true
    }).start()
  },[opnd])
  return (
    <Animated.View style={{...styles.container,transform: [{translateY: position}]}}>
      <ScrollView style={styles.scrlView}>
      <Text>SettingMenu</Text>
      <RadioGroup onChange={(value)=>{
        const sett = {...settings};
        sett.ratio = value;
        setSettings(sett)
      }} data={possibles.ratio} value={settings.ratio}/>

      <Text>Picture Size</Text>   
      <RadioGroup onChange={(value)=>{
        const sett = {...settings};
        sett.ps = value;
        setSettings(sett)
      }} data={possibles.ps} value={settings.ps}/>

      <Text>Flash</Text>
      <RadioGroup 
      onChange={(value)=>{
        const sett = {...settings};
        sett.fm = possibles.fm[value];
        setSettings(sett)
      }}
      data={Object.keys(possibles.fm)}
      value={Object.keys(possibles.fm).find(x=>possibles.fm[x] === settings.fm )}
      />

      <Text>White Balance</Text>
      <RadioGroup 
        onChange={(value)=>{
          const sett = {...settings};
          sett.wb = possibles.wb[value];
          setSettings(sett)
        }}
        data={Object.keys(possibles.wb)}
        value={Object.keys(possibles.wb).find(x=>possibles.wb[x] === settings.wb )}
      />
      </ScrollView>
    </Animated.View>
  )
}

const dims = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        left: 0,
        top: 0,
        width: 200,
        backgroundColor: 'rgba(200,200,200,0.35)',
    },
    scrlView:{
      height: dims.height * 3 / 4
    }
})