import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton';
import * as Sharing from 'expo-sharing';
import colors from '../data/colors.json'

export default function BigPhoto({navigation, route}) {
    const {item} = route.params;

    const share = ()=>{
        Sharing.isAvailableAsync().then(isit=>{
            if(!isit) return alert("No permision");
            Sharing.shareAsync(item.uri)
        })
    }
    
  return (
    <View>
        <View>
            <Text>{item.id}</Text>
            <Image style={styles.image}
             source={{uri: item.uri, width: 350, height: 600}}/>
        </View>
        <View>
            <MyButton onPress={share} style={styles.buttons} textStyle={styles.buttonsText}>Share</MyButton>
            <MyButton style={styles.buttons} textStyle={styles.buttonsText}>Delete</MyButton>
        </View>
    </View>
  )
}

const dims = Dimensions.get('screen');
const styles = StyleSheet.create({
    image:{
        maxWidth: 350,
        maxHeight: 600
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
})