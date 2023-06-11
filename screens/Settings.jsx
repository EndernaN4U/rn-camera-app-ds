import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getIP, setIP } from '../src/getip'
import SetsDialog from '../components/SetsDialog';
import MyButton from '../components/MyButton';

export default function Settings() {
    const [stngs, setStngs] = useState(null);
    const [vis, setVis] = useState(false);

    const getip = async()=>setStngs({...await getIP()})
    useEffect(()=>{
        getip();
    })
  return (
    <View>
      {
        stngs?
        <>
            <Text>{stngs.ip}</Text>
            <Text>{stngs.port}</Text>
            <MyButton onPress={()=>setVis(true)}>Change</MyButton>
            <SetsDialog vis={vis} setVis={(x)=>{
              setVis(x);
              getip();
            }} stngs={stngs}/>
        </>
        :
        <></>
      }
    </View>
  )
}