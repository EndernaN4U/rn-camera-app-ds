import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera } from "expo-camera";

export default function CameraScreen() {
    const [perm, setPerm] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back)
    const camera = useRef();

    useEffect(()=>{
        (async()=>{
            let { status } = await Camera.requestCameraPermissionsAsync();
            setPerm(status == 'granted');
        })()
    },[])
  return (
    <>
      {
        perm?
        <Camera 
            ref={camera}
            type={type}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1 }}>
                
            </View>
        </Camera>
        :
        <Text>Dawaj perma no</Text>
      }
    </>
  )
}