import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const imgs = {
  "change" : "https://cdn-icons-png.flaticon.com/512/126/126502.png",
  "photo" : "https://www.freepnglogos.com/uploads/plus-icon/plus-icon-plus-svg-png-icon-download-1.png",
  "settings": "https://upload.wikimedia.org/wikipedia/commons/d/dc/Settings-icon-symbol-vector.png"
}

export default function CircleButton({onPress, icon, size}) {

  const styles = StyleSheet.create({
    btn:{
      backgroundColor: 'rgba(50,50,50,0.5)',
      opacity: 0.85,
      width: size,
      height: size,
      borderRadius: size/2,
      justifyContent: 'center',
      alignItems:'center'
    },
    img:{
      width: size/1.5,
      height: size/1.5
    }
  })

  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Image style={styles.img} source={{uri: imgs[icon]}}/>
    </TouchableOpacity>
  )
}

