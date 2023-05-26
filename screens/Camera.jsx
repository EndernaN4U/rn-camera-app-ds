import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera } from "expo-camera";
import CircleButton from '../components/CircleButton';
import * as MediaLibrary from "expo-media-library";
import SettingMenu from '../components/SettingMenu';


export default function CameraScreen() {
    const [perm, setPerm] = useState(null);
    const [type, setType] = useState('back');
    const [opnd, setOpnd] = useState(false);
    const [stngs, setStngs] = useState({
      ratio: '16:9',
      wb: Camera.Constants.WhiteBalance.auto,
      ps: '1280x720',
      fm: Camera.Constants.FlashMode.off
    });
    
    const posStngs = useRef({})

    const camera = useRef();

    const takePhoto = async()=>{
      if (camera.current) {
        let foto = await camera.current.takePictureAsync();
        await MediaLibrary.createAssetAsync(foto.uri); 
      }
    }

    const getSizes = async () =>{
      return await camera.current.getAvailablePictureSizesAsync(stngs.ratio);
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

            onCameraReady={async()=>{
              posStngs.current.ratio = await camera.current.getSupportedRatiosAsync();
              posStngs.current.ps = await getSizes();
              setStngs(dat=>{
                dat.ps = posStngs.current.ps[0];
                return {...dat}
              })
            }}

            style={styles.camera}

            type={type === 'back'? Camera.Constants.Type.back : Camera.Constants.Type.front}
            ratio={stngs.ratio}
            whiteBalance={stngs.wb}
            pictureSize={stngs.ps}
            flashMode={stngs.fm}
        >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems:'flex-end', gap: 20 }}>
                <CircleButton onPress={()=>{
                  setType(type=>(type == 'back')? 'front': 'back')
                }} icon="change" size={75}/>
                <CircleButton onPress={takePhoto} icon="photo" size={100}/>
                <CircleButton onPress={()=>setOpnd(dat=>!dat)} icon="settings" size={75}/>
            </View>
            {
             opnd? 
                <SettingMenu setSettings={setStngs} settings={stngs} possibles={posStngs.current}/>
              :
                <></>
            }
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