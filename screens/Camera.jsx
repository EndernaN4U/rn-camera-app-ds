import { View, Text, StyleSheet, Dimensions, ScrollView, BackHandler } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera } from "expo-camera";
import CircleButton from '../components/CircleButton';
import * as MediaLibrary from "expo-media-library";
import SettingMenu from '../components/SettingMenu';
import * as ImagePicker from 'expo-image-picker';
import { getIP } from '../src/getip';


export default function CameraScreen({navigation}) {
    const [perm, setPerm] = useState(null);
    const [type, setType] = useState('back');
    const [opnd, setOpnd] = useState(false);
    const [stngs, setStngs] = useState({
      ratio: '16:9',
      wb: Camera.Constants.WhiteBalance.auto,
      ps: '1280x720',
      fm: 0
    });
    
    const [posStngs, setPosStngs] = useState({
      wb: Camera.Constants.WhiteBalance,
      fm: {"torch":2, "on": 1, "off": 0}
    });

    const camera = useRef();

    const takePhoto = async()=>{
      if (camera.current) {
        let foto = await camera.current.takePictureAsync();
        await MediaLibrary.createAssetAsync(foto.uri); 
      }
    }

    const getSizes = async (ratio) =>{
      return await camera.current.getAvailablePictureSizesAsync(ratio || stngs.ratio);
    }

    const getAspect = ()=>{
      const ratio = stngs.ratio.split(':');
      return parseInt(ratio[1]) / parseInt(ratio[0])
    }

    const handleSettings = async(settings)=>{
      if(stngs.ratio != settings.ratio){
        const picSizes = await getSizes(settings.ratio);

        setPosStngs(dat=>{
          dat.ps = picSizes;
          return {...dat};
        })

        setStngs(dat=>{
          dat.ratio = settings.ratio;
          dat.ps = picSizes[0];
          return {...dat}
        })
      }
      else setStngs({...settings});
    }

    const imagePickerHandler = async()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if(!result.canceled) {
        const data = new FormData();
        const uri = result.assets[0].uri
        const arrUri = uri.split('/');
        const name = arrUri[arrUri.length - 1];

        data.append('photo', {
          uri, type: 'image/*', name
        })

        (async()=>{
          const {ip, port} = await getIP();
          fetch(`http://${ip}:${port}/upload`, {
            method: 'POST',
            body: data
          })
        })()
      }
    }

    const bH = BackHandler.addEventListener('hardwareBackPress',()=>{
      if(!opnd){
        navigation.navigate('gallery')
        return false;
      }
      setOpnd(false);
      return true;
    });

    useEffect(()=>{
        (async()=>{
            let { status } = await Camera.requestCameraPermissionsAsync();
            setPerm((status === 'granted'));
        })()

        return ()=>bH.remove();
    },[])
  return (
    <View style={styles.container}>
      {
        perm?
        <><Camera 
            ref={camera}

            onCameraReady={async()=>{
              const ratio = await camera.current.getSupportedRatiosAsync();
              const ps = await getSizes();
              setPosStngs(dat=>{
                dat.ratio = ratio;
                dat.ps = ps
                return {...dat};
              })
              setStngs(dat=>{
                dat.ps = ps[0];
                return {...dat}
              })
            }}

            style={{...styles.camera, aspectRatio: getAspect()}}

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
                <CircleButton onPress={imagePickerHandler} icon="picker" size={75}/>
            </View>
            
        </Camera>
        {
          posStngs.ratio?
          <SettingMenu setSettings={handleSettings} settings={stngs} possibles={posStngs} opnd={opnd}/>
          :
          <></>
        }
        </>
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
    justifyContent: 'center',
    zIndex: 1
  },
  camera: {
    maxWidth: dims.width,
    maxHeigth: dims.height
  }
})