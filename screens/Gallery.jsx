import { View, Text, Image, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import MyButton from './MyButton'
import React, { useEffect, useState } from 'react'
import * as MediaLibrary from "expo-media-library"
import colors from '../data/colors.json'

export default function Gallery() {
    const [photos, setPhotos] = useState([]);

    useEffect(()=>{
        (async()=>{
            let {status} = await MediaLibrary.requestPermissionsAsync();
            if(status !== 'granted') alert('Brak uprawnien');
            else{
                let obj = await MediaLibrary.getAssetsAsync({
                    first: 100,
                    mediaType: 'photo'
                })
                setPhotos(obj.assets);
            }
        })()
    },[])

  return (
    <View style={styles.container}>
        <View style={styles.btnContainer}>
            <MyButton style={styles.buttons} textStyle={styles.buttonsText}>Layout</MyButton>
            <MyButton style={styles.buttons} textStyle={styles.buttonsText}>Camera</MyButton>
            <MyButton style={styles.buttons} textStyle={styles.buttonsText}>Delete</MyButton>
        </View>
        <View>
        {
            (photos.length > 0)?
            <FlatList 
                data={photos}
                numColumns={4}
                renderItem={({item})=>
                <View style={styles.imageView}>
                    <Image style={styles.image} source={{uri: item.uri, width: dims.width/4.5, height: dims.width/4.5}}/>
                    <Text style={styles.imageText}>{item.id}</Text>
                </View>}
            />  
            :
            <ActivityIndicator />
        }
        </View>
    </View>
  )
}

const dims = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222'
    },
    image:{
        borderRadius: 20
    },
    imageView:{
        width: dims.width/4,
        height: dims.width/4,
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    imageText:{
        position: 'absolute',
        right: 10,
        bottom: 10,
        fontSize: 10,
        color: colors.mainTextColor
    },
    btnContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 75
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