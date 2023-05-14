import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import MyButton from '../components/MyButton';

export default function BigPhoto({navigation, route}) {
    const {item} = route.params;
    
  return (
    <View>
        <View>
            <Text>{item.id}</Text>
            <Image style={styles.image}
             source={{uri: item.uri, width: 350, height: 600}}/>
        </View>
        <View>
            <MyButton>Share</MyButton>
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