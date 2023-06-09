import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getIP, setIP } from '../src/getip'

export default function Settings() {
    const [stngs, setStngs] = useState(null);
    useEffect(()=>{
        (async()=>setStngs(await getIP()))()
    })
  return (
    <View>
      {
        stngs?
        <>
            <Text>{stngs.ip}</Text>
            <Text>{stngs.port}</Text>
        </>
        :
        <></>
      }
    </View>
  )
}