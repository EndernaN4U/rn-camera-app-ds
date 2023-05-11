import { View, Text, Image, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import MyButton from '../components/MyButton'
import React, { useEffect, useRef, useState } from 'react'
import * as MediaLibrary from "expo-media-library"
import colors from '../data/colors.json'

export default function Gallery() {
    const [photos, setPhotos] = useState([]);
    const [layout, setLayout] = useState(true);

    const timing = useRef(0);

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
            <MyButton style={styles.buttons} textStyle={styles.buttonsText}
            onPress={()=>setLayout(dat=>!dat)}>Layout</MyButton>
            <MyButton style={styles.buttons} textStyle={styles.buttonsText}>Camera</MyButton>
            <MyButton style={styles.buttons} textStyle={styles.buttonsText}>Delete</MyButton>
        </View>
        {
            (photos.length > 0)?
            <FlatList 
                data={photos}
                numColumns={layout? 4 : 1}
                renderItem={({item})=>
                <View onTouchStart={()=>timing.current = Date.now()}
                        onTouchEnd={()=>{
                            if(Date.now() - timing.current > 200){
                                alert('Long')
                            }
                            else alert('short')
                        }}
                 style={{
                    height: layout?dims.width/4:210,
                    width: layout?dims.width/4:dims.width,
                    ...styles.imageView
                }}>
                    <Image 
                        style={styles.image} source={{
                        uri: item.uri,
                        width: layout?dims.width/4.5:dims.width,
                        height: layout?dims.width/4.5:200
                    }}/>
                    <Text style={styles.imageText}>{item.id}</Text>
                </View>}
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
    image:{
        borderRadius: 20
    },
    imageView:{
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
    },
    gridView:{
        
    }
  });