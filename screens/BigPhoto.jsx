import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton';
import * as Sharing from 'expo-sharing';
import colors from '../data/colors.json';
import * as MediaLibrary from "expo-media-library";

export default function BigPhoto({navigation, route}) {
    const {item, setGal} = route.params;

    const share = ()=>{
        Sharing.isAvailableAsync().then(isit=>{
            if(!isit) return alert("No permision");
            Sharing.shareAsync(item.uri)
        })
    }

    const deletep = ()=>{
        MediaLibrary.deleteAssetsAsync([item]).then(isit=>{
            setGal(item.filename)
            navigation.goBack();
        });
        
    }
    
  return (
    <View style={styles.container}>
        <View style={styles.imageView}>
            <Image style={styles.image}
             source={{uri: item.uri, width: 350, height: 600}}/>
        </View>
        <View style={styles.buttonView}>
            <MyButton onPress={share} style={styles.buttons} textStyle={styles.buttonsText}>Share</MyButton>
            <MyButton onPress={deletep} style={styles.buttons} textStyle={styles.buttonsText}>Delete</MyButton>
        </View>
    </View>
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
        maxWidth: 350,
        maxHeight: 600,
        aspectRatio: 9/16
    },
    buttons:{
        backgroundColor: colors.bgColor,
        width: dims.width / 3,
        height: 50,

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
})