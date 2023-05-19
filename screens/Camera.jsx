import { View, Text, StyleSheet, Dimensions } from 'react-native'
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
    <View style={styles.container}>
      {
        perm?
        <Camera 
            ref={camera}
            type={type === 'back'? Camera.Constants.Type.back : Camera.Constants.Type.front}
            style={styles.camera}
        >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'flex-end', gap: 20 }}>
                <CircleButton onPress={()=>{
                  setType(type=>(type == 'back')? 'front': 'back')
                }} icon="change" size={75}/>
                <CircleButton onPress={takePhoto} icon="photo" size={100}/>
            </View>
        </Camera>
        :
        <Text>Dawaj perma no</Text>
      }
    </View>
  )
}

const dims = Dimensions.get("screen");
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#222",
    display: 'flex',
    justifyContent: 'center'
  },
  camera: {
    width: dims.width,
    aspectRatio: 9/16
  }
})