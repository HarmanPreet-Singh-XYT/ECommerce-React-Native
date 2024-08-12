import { View, Text, TouchableOpacity,BackHandler } from 'react-native'
import React, { useEffect } from 'react'

const Confirmation = ({navigation,route}:{navigation:any,route:any}) => {
    const confirmationType = route.params.statusCode;
    useEffect(() => {
        const backAction = () => {
          navigation.navigate('Home');
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
      }, []);
  return (
    <View style={{justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
      {confirmationType===400 && <View className='w-[90%] h-[200px] items-center justify-evenly bg-customsalmon rounded-xl'>
        <Text className='text-xl font-bold text-white'>Order Failed</Text>
        <Text className='text-lg font-medium text-white w-[90%]'>Due to Some reason, payment cannot be processed and thus the order cannot be placed, please try again.</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} className='bg-white py-2 w-[120px] rounded-xl items-center'><Text className='text-black font-bold'>Home</Text></TouchableOpacity>
      </View>}
      {confirmationType===200 && <View className='w-[90%] h-[200px] items-center justify-evenly bg-[#4BB543] rounded-xl'>
        <Text className='text-xl font-bold text-white'>Order Placed #{route.params.orderID}</Text>
        <Text className='text-lg font-medium text-white w-[90%]'>Your order has been successfully placed, and can be tracked from orders section</Text>
        <View className='flex-row gap-6'>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')} className='bg-white py-2 w-[120px] rounded-xl items-center'><Text className='text-black font-bold'>Home</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Orders')} className='bg-white py-2 w-[120px] rounded-xl items-center'><Text className='text-black font-bold'>Orders</Text></TouchableOpacity>
        </View>
      </View>}
    </View>
  )
}

export default Confirmation