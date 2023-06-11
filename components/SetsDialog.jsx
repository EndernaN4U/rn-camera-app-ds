import { View, Text } from 'react-native'
import React, { useRef, useState } from 'react'
import Dialog from "react-native-dialog"
import { setIP } from '../src/getip';

export default function SetsDialog({vis, setVis, stngs}) {
    const [ip, stIP] = useState(stngs.ip);
    const [port, stPort] = useState(stngs.port);
    return (
    <View>
      <Dialog.Container visible={vis}>
      <Dialog.Title>Change IP</Dialog.Title>
      <Dialog.Input label="IP" value={ip} onChangeText={(txt)=>stIP(txt)} />
      <Dialog.Input label="PORT" value={port} onChangeText={(txt)=>stPort(txt)}/>
      <Dialog.Button label="Cancel" onPress={()=>setVis(false)}/>
      <Dialog.Button label="Change" onPress={()=>{
        setIP(ip,port);
        setVis(false);
        }}/>
    </Dialog.Container>
    </View>
  )
}