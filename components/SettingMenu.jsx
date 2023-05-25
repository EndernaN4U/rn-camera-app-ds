import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RadioGroup from './RadioGroup'

export default function SettingMenu({settings, setSettings, possibles}) {
  return (
    <View style={styles.container}>
      <Text>SettingMenu</Text>
      <RadioGroup onChange={()=>{}} data={possibles.ratio} value={settings.ratio}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 200,
        height: 500
    }
})