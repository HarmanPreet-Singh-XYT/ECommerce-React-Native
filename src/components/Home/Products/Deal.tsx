import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import SaleBar from '../SaleBar'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import Rating from '../../Stars';
import { dealDataHandler } from '../../../api/homeData';
import DealTime from './Deal/DealTime';
interface DealProduct {
    productid: number;
    title: string;
    stars: number;
    description: string;
    price: number;
    discount: number;
    sold: number;
    available: number;
    rating: number;
    imglink: string;
    imgalt: string;
    end_time:string;
}
const Deal = () => {
    const data = useRef<DealProduct[]>([]);
    const [loading, setloading] = useState(true);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    async function sync(){
        const res = await dealDataHandler();
        switch (res.status) {
          case 200:
            data.current = res.deals.data;
            setloading(false);
            break;
        }
    }
    useLayoutEffect(() => {
      sync();
    }, [])
  return (
    <>
        <View className='border-b-[1px] border-customsalmon w-[75%] mx-auto py-2 mb-3 text-center'>
            <Text className='mx-auto text-black font-bold text-[22px]'>Deal of The Day</Text>
        </View>
        {loading && <ActivityIndicator style={{marginHorizontal:'auto'}} size={96} color={'salmon'}/>}
        {!loading && 
            data.current.map((each,index)=>
            <View key={index} className='h-[680px] w-[90%] mb-2 mx-auto border-[1px] border-customsalmon rounded-2xl'>
                <View className='w-[90%] h-[100%] mx-auto'>
                <TouchableOpacity onPress={()=>navigation.navigate('Product',{productID:each.productid})}><Image source={{uri:each.imglink}} className='max-w-[100%] w-[100%] mx-auto h-[320px] max-h-[320px]'/></TouchableOpacity>
                <View className='my-[1px] w-[100px] h-[20px]'><Rating rating={each.stars} size={16}/></View>
                <TouchableOpacity onPress={()=>navigation.navigate('Product',{productID:each.productid})}><Text className='text-black font-bold text-lg'>{each.title}</Text></TouchableOpacity>
                <Text className='my-1 text-gray-400 text-[12px]'>{each.description}</Text>
                <View className='flex-row gap-6 items-center'>
                    <Text className='text-customsalmon font-bold text-2xl'>${each.discount}</Text>
                    <Text className='line-through text-lg font-bold text-gray-400'>${each.price}</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Product',{productID:each.productid})} className='bg-customsalmon mt-2 w-[200px] h-[40px] rounded-lg justify-center'><Text className='text-center text-lg font-semibold text-white'>Checkout Product</Text></TouchableOpacity>
                <SaleBar sold={each.sold} available={each.available}/>
                <View>
                    <Text className='text-black font-bold text-[12px]'>HURRY UP! OFFER ENDS IN:</Text>
                </View>
                <DealTime endTime={each.end_time} />
                </View>
            </View>
            )
            
            
        }
        
        {/* </View> */}
    </>
  )
}

export default Deal