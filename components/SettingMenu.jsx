import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import RadioGroup from './RadioGroup'

export default function SettingMenu({settings, setSettings, possibles}) {
  return (
    <ScrollView style={styles.container}>
      <Text>SettingMenu</Text>
      <RadioGroup onChange={(value)=>{
        setSettings(dat=>{
            dat.ratio = value;
            return {...dat};
        })
      }} data={possibles.ratio} value={settings.ratio}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 200,
        height: 500,
        backgroundColor: 'rgba(200,200,200,0.35)'
    }
})