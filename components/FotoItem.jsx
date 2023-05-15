import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import React, {useRef} from 'react'
import colors from '../data/colors.json'

export default function FotoItem({item, index, layout, setPhotos, bigPhoto}) {
    const timing = useRef(-1);

  return (
    <View   
        onTouchStart={()=>{
            timing.current = 1;
            setTimeout(()=>{
                if(timing.current == 1){
                    setPhotos(dat=>{
                        dat[index].sel = !dat[index].sel
                        return [...dat]
                    })
                }
                else if(timing.current == 0) bigPhoto(item)
            },100)
        }}
        onTouchEnd={()=>{
            timing.current = 0;
        }}
        onTouchCancel={()=>{
            timing.current = -1;
        }}
        
        style={{
        height: layout?dims.width/4:210,
        width: layout?dims.width/4:dims.width,
        ...styles.imageView}}
    >

        <Image 
            style={styles.image} source={{
            uri: item.uri,
            width: layout?dims.width/4.5:dims.width,
            height: layout?dims.width/4.5:200
        }}/>

        <Text style={styles.imageText}>{item.id}</Text>

        {
            item.sel?
            <View style={styles.selView}>
                <Text style={styles.selText}>X</Text>
            </View>
            :
            <></>
        }
    </View>
  )
}

const dims = Dimensions.get('screen');

const styles = StyleSheet.create({
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
    selView:{
        backgroundColor: 'black',
        position: 'absolute',
        opacity: 0.3,
        height: '100%',
        width: '100%',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selText:{
        fontSize: 40,
        color: 'red',
        opacity: 2
    }
  });