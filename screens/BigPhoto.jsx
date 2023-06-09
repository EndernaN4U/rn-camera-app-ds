import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton';
import * as Sharing from 'expo-sharing';
import colors from '../data/colors.json';
import * as MediaLibrary from "expo-media-library";
import { getIP } from '../src/getip';

export default function BigPhoto({navigation, route}) {
    const {item} = route.params;

    const share = ()=>{
        Sharing.isAvailableAsync().then(isit=>{
            if(!isit) return alert("No permision");
            Sharing.shareAsync(item.uri)
        })
    }

    const deletep = ()=>{
        MediaLibrary.deleteAssetsAsync([item]).then(isit=>{
            navigation.goBack({fn: item.filename});
        });
    }

    const handleUpload = ()=>{
        console.log(item);
        const data = new FormData();
        data.append('photo', {
            uri: item.uri,
            type: 'image/*',
            name: item.filename
        })

        (async()=>{
            const {ip, port} = await getIP();
            fetch(`http://${ip}:${port}/upload`, {
              method: 'POST',
              body: data
            })
        })()
    }
    
  return (
    <ScrollView style={styles.container}>
        <View style={styles.imageView}>
            <Image style={{...styles.image, aspectRatio: item.width/item.height}}
             source={{uri: item.uri, width: item.width, height: item.height}}/>
        </View>
        <Text style={styles.textStyle}>{item.width} x {item.height}</Text>
        <View style={styles.buttonView}>
            <MyButton onPress={share} style={styles.buttons} textStyle={styles.buttonsText}>Share</MyButton>
            <MyButton onPress={deletep} style={styles.buttons} textStyle={styles.buttonsText}>Delete</MyButton>
            <MyButton onPress={handleUpload} style={styles.buttons} textStyle={styles.buttonsText}>Upload</MyButton>
        </View>
    </ScrollView>
  )
}

const dims = Dimensions.get('screen');
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#222",
        flex: 1
    },
    imageView:{
        marginVertical: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonView:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    image:{
        maxWidth: dims.width - 60,
        aspectRatio: 9/16
    },
    buttons:{
        backgroundColor: colors.bgColor,
        width: dims.width / 4,
        height: 50,
        marginBottom: 20,

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
    textStyle:{
        textAlign: 'center',
        color: colors.mainTextColor,
        fontSize: 24,
        marginBottom: 30
    }
})