import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera } from "expo-camera";
import CircleButton from '../components/CircleButton';
import * as MediaLibrary from "expo-media-library"

export default function CameraScreen() {
    const [perm, setPerm] = useState(null);
    const [type, setType] = useState('back')
    const camera = useRef();

    const takePhoto = async()=>{
      if (camera.current) {
        let foto = await camera.current.takePictureAsync();
        let asset = await MediaLibrary.createAssetAsync(foto.uri); 
      }
    }

    useEffect(()=>{
        (async()=>{
            let { status } = await Camera.requestCameraPermissionsAsync();
            setPerm((status === 'granted'));
        })()
    },[])
  return (
    <>
      {
        perm?
        <Camera 
            ref={camera}
            type={type === 'back'? Camera.Constants.Type.back : Camera.Constants.Type.front}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'flex-end', gap: 20 }}>
                <CircleButton onPress={()=>{
                  setType(type=>(type == 'back')? 'front': 'back')
                }} icon="Type"/>
                <CircleButton onPress={takePhoto} icon="Photo"/>
            </View>
        </Camera>
        :
        <Text>Dawaj perma no</Text>
      }
    </>
  )
}