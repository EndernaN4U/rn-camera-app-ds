import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton';
import * as Sharing from 'expo-sharing';

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
            <MyButton onPress={share}>Share</MyButton>
            <MyButton>Delete</MyButton>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    image:{
        maxWidth: 350,
        maxHeight: 600
    }
})