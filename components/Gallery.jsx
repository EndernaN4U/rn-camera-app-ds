import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as MediaLibrary from "expo-media-library";

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
        {
            (photos.length > 0)?
            <FlatList 
                data={photos}
                numColumns={4}
                renderItem={({item})=><Image source={{uri: item.uri, width: dims.width/4, height: dims.width/4}}/>}
            />  
            :
            <Text>{photos.length}</Text>
        }
    </View>
  )
}

const dims = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  });