import { View, Text } from 'react-native'
import React from 'react'
interface props{
    sold:number;
    available:number;
}
const calculatePercentage= (sold:number,available:number)=>{
    return sold*100/available
}
const SaleBar = ({sold,available}:props) => {
  return (
    <View className='justify-center my-4'>
        <View className='flex-row mb-[1.5px] justify-between'>
            <Text className='text-black text-[12px]'>ALREADY SOLD: <Text className='font-bold text-black'>{sold}</Text></Text>
            <Text className='text-black text-[12px]'>AVAILABLE: <Text className='font-bold text-black'>{available}</Text></Text>
        </View>
        <View className='relative'>
        <View className='h-[10px] rounded-2xl bg-customsalmon'></View>
            <View style={{width:`98%`,height:4,zIndex:2,position:'absolute',top:3,left:3.5,justifyContent:'center'}}>
                <View style={{width:`${calculatePercentage(sold,available)}%`,height:4,backgroundColor:'white',zIndex:5,position:'absolute',borderRadius:100}}></View>
            </View>
        </View>
    </View>
  )
}

export default SaleBar