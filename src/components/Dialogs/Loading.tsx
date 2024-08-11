import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { BlurView } from "@react-native-community/blur";
const Loading = () => {
  return (
    <>
      <BlurView
        style={{position:'absolute',zIndex:20,width:'100%',height:'100%'}}
        blurType="light"
        blurAmount={4}
        reducedTransparencyFallbackColor="white"
      />
      <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,justifyContent:'center',alignItems:'center',zIndex:25}}>
        <View className='bg-white px-12 border-[1px] border-customsalmon rounded-xl py-6'>
            <ActivityIndicator color={'salmon'} size={96}/>
        </View>
      </View>
    </>
  )
}

export default Loading