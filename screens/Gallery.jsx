import { View, Text, Image, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import MyButton from '../components/MyButton'
import React, { useEffect, useRef, useState } from 'react'
import * as MediaLibrary from "expo-media-library"
import colors from '../data/colors.json'
import FotoItem from '../components/FotoItem'
import { useIsFocused } from "@react-navigation/native";

export default function Gallery({navigation, route}) {
    const [photos, setPhotos] = useState([]);
    const [layout, setLayout] = useState(true);
    const isFocused = useIsFocused();

    const refresh = async()=>{
        let obj = await MediaLibrary.getAssetsAsync({
            first: 200,
            mediaType: 'photo'
        })
        obj.assets.sort((a,b)=>{return b.modificationTime - a.modificationTime});
        obj.assets.map((el, ind)=>{
            el.sel = (photos[ind])? photos[ind].sel : false;
        })

        setPhotos(obj.assets);
    }

    useEffect(()=>{
        (async()=>{
            let {status} = await MediaLibrary.requestPermissionsAsync();
            if(status !== 'granted') return alert('Brak uprawnien');
            if(isFocused) refresh();
        })()
    },[isFocused])

    const deleteOne = (name)=>{
        setPhotos(dat=>dat.filter(x=>x.filename !== name))
    }
    const bigPhoto = (item)=>{navigation.navigate('photo', {item: item, setGal: deleteOne })}

    const deleteSelected = async()=>{
        const fPhotos = photos.filter(x=>x.sel)
        if(fPhotos.length == 0) return alert("Nalezy cos wybrać");

        await MediaLibrary.deleteAssetsAsync(fPhotos);
        
        setPhotos(dat=>{
            dat.forEach(el=>{
                el.sel = false;
            })
            return dat;
        })
        refresh();
    }

  return (
    <View style={styles.container}>
        <View style={styles.btnContainer}>
            <MyButton style={styles.buttons} textStyle={styles.buttonsText}
            onPress={()=>setLayout(dat=>!dat)}>Layout</MyButton>
            <MyButton style={styles.buttons} textStyle={styles.buttonsText}
            onPress={()=>navigation.navigate('camera')}>Camera</MyButton>
            <MyButton style={styles.buttons} textStyle={styles.buttonsText}
            onPress={deleteSelected}>Delete</MyButton>
        </View>
        {
            (photos.length > 0)?
            <FlatList 
                data={photos}
                numColumns={layout? 4 : 1}
                renderItem={({item, index})=>
                    <FotoItem key={index} item={item} index={index}
                     setPhotos={setPhotos} layout={layout}
                     bigPhoto={bigPhoto}/>
                }
                keyExtractor={item=>item.id}
                key={layout? 4 : 1}
            />  
            :
            <ActivityIndicator />
        }
    </View>
  )
}

const dims = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222'
    },
    btnContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 75,
        position:'relative',
        borderColor: colors.mainTextColor,
        borderWidth: 1
    },
    buttons:{
        backgroundColor: colors.bgColor,
        width: dims.width / 4.5,
        height: 35,

        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',

        borderRadius: 10
    },
    buttonsText:{
        fontSize: 22,
        textAlign: 'center',
        color: colors.mainTextColor
    }
  });