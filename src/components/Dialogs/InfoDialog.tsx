import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BlurView } from "@react-native-community/blur";
const InfoDialog = ({title,message,btn,message2,message3,btnFunc}:{title:string,message:string,btn:string,message2?:string,message3?:string,btnFunc:()=>void}) => {
  return (
    <>
      <BlurView
        style={{position:'absolute',zIndex:15,width:'100%',height:'100%'}}
        blurType="light"
        blurAmount={4}
        reducedTransparencyFallbackColor="white"
      />
      <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,justifyContent:'center',alignItems:'center',zIndex:10}}>
        <View className='bg-customsalmon w-[90%] rounded-2xl h-[165px] items-center justify-evenly'>
          <View className='items-center mb-4 w-[90%] mx-auto'>
            <Text className='text-xl font-bold text-white mb-1'>{title}</Text>
            <Text className='text-lg font-semibold text-white'>{message}</Text>
            {message2 && <Text className='text-lg font-semibold text-white'>{message2}</Text>}
            {message3 && <Text className='text-lg font-semibold text-white'>{message3}</Text>}
          </View>
          <View className='flex-row gap-5'>
            <TouchableOpacity onPress={btnFunc} className='bg-white px-10 rounded-xl py-1'>
              <Text className='text-black font-bold text-lg'>{btn}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

export default InfoDialog