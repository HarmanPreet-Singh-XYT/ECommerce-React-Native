import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Cart } from '../NativeSVG'
import BottomBar from '../BottomBar'
import { ordersHandler } from '../../api/orders'
import formatDate from '../../api/dateConvert'
interface orderDataflow{
    orderid:number;
    totalamount:number;
    orderstatus:string;
    createdat:string;
    deliveredat:string;
    title:string;
    imglink:string;
    imgalt:string;
    description:string;
    discount:number;
    order_code:string;
    productid:string
}
const Orders = () => {
    const [menu, setmenu] = useState<null | number>(null);
    const loggedIn = useRef(true);
    const found = useRef(false);
    const dataVar = useRef<orderDataflow[]>([])
    const data = dataVar.current;
    const [loading, setLoading] = useState(true);
    const toggleMenu = (index:number)=>{
        if(typeof(menu)==='number') setmenu(null);
        else setmenu(index);
    };
    async function orderData(){
        const temp_data = await ordersHandler();
        switch (temp_data.status) {
            case 200:
                if(temp_data.data.data != undefined){
                    dataVar.current = temp_data.data.data;
                    found.current = true;
                }
                setLoading(false);
                break;
            case 250:
                loggedIn.current = false;
                setLoading(false);
                break;
            default:
                setLoading(false);
                break;
        }
    }
    useEffect(() => {
      orderData();
    }, []);
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
        <ScrollView className='w-[100%] h-[100%]'>
            <View className='flex-row w-[90%] mx-auto mb-6 mt-4'>
                <Text className='text-black text-xl font-bold'>Order history</Text>
            </View>
            {data.map((each)=>
            <View key={each.orderid} className='border-[1px] border-customsalmon h-[380px] w-[90%] mx-auto rounded-2xl'>
                <View className='flex-row justify-between h-[20%]'>
                    <View className='items-center h-[100%] w-[50%] justify-center'>
                            <Text className='text-black font-bold'>Order Number</Text>
                            <Text className='text-customsalmon font-bold text-lg'>{each.order_code}{each.orderid}</Text>
                    </View>
                    <View className='w-[1px] h-[100%] bg-customsalmon'></View>
                    <View className='items-center h-[100%] w-[50%] justify-center'>
                            <Text className='text-black font-bold'>Total amount</Text>
                            <Text className='text-customsalmon font-bold text-lg'>${each.totalamount}</Text>
                    </View>
                </View>
                <View className='w-[100%] h-[50%] items-center justify-between border-t-[1px] px-4 border-customsalmon flex-row'>
                    <View className='border-customsalmon border-[1px] rounded-2xl px-1 py-1'>
                        <Image source={{uri:'https://codewithsadee.github.io/anon-ecommerce-website/assets/images/products/shirt-2.jpg'}} width={160} height={120}/>
                    </View>
                    <View className='justify-between h-[65%] w-[45%]'>
                        <Text className='font-bold text-black w-[100%]'>{each.title}</Text>
                        <View>
                            <Text className='font-bold text-[12px] text-black'>Order Placed on:</Text>
                            <Text className='font-bold text-customsalmon'>{formatDate(each.createdat)}</Text>
                        </View>
                        <Text className='font-bold text-black text-lg text-right'>${each.discount}</Text>
                    </View>
                </View>
                <View className='w-[100%] h-[30%] items-center border-t-[1px] border-customsalmon'>
                    <View className='w-[100%] h-[50%] flex-row items-center justify-center'>
                        <View className='bg-customsalmon rounded-full px-1 py-1 mr-2'><Cart width={15} height={15}/></View>
                        <Text className='text-lg text-customsalmon font-semibold'>Coming on {formatDate(each.deliveredat)}</Text>
                    </View>
                    <View className='w-[100%] h-[50%] justify-between flex-row'>
                        <TouchableOpacity className='bg-customsalmon h-full w-[50%] justify-center rounded-bl-2xl'><Text className='text-lg font-bold text-white text-center'>View Order</Text></TouchableOpacity>
                        <View className='w-[1px] h-[100%] bg-white'></View>
                        <TouchableOpacity className='bg-customsalmon h-full w-[50%] justify-center rounded-br-2xl'><Text className='text-lg font-bold text-white text-center'>Buy again</Text></TouchableOpacity>
                    </View>
                </View>
            </View>)}
            
        </ScrollView>
        <BottomBar/>
    </View>
  )
}

export default Orders