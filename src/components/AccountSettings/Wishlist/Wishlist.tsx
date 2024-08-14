import { View, Text, ScrollView, TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import formatDate from '../../../api/dateConvert'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { cartDeleteHandler } from '../../../api/itemLists'
import { removeItemFromWishlist } from '../../../controllers/CartWishlist'
import Loading from '../../Dialogs/Loading'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'

const Wishlist = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const wishlist = useAppSelector((state) => state.cartWishlist.wishlist);
  const defaultAccount = useAppSelector((state) => state.userState.defaultAccount)
  const [loading, setloading] = useState(false);
  const dispatch = useAppDispatch();
  async function removeItem(cartItemID:number,productID:number){
    setloading(true);
    await cartDeleteHandler({userID:defaultAccount.userID,cartItemID});
    dispatch(removeItemFromWishlist(productID));
    setloading(false);
  }
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
      {loading && <Loading/>}
      <View className='w-[100%] h-[100%]'>
        <View className='self-center w-[90%] my-4'>
          <Text className='text-black text-xl font-bold'>Wishlist</Text>
        </View>
        <ScrollView>
          {wishlist.map((each)=>
          <View key={each.productID} className='w-[90%] mb-4 self-center border-[1px] flex-row border-customsalmon rounded-xl px-4 py-4 min-h-[120px]'>
            <TouchableOpacity onPress={()=>navigation.navigate('Product',{productID:each.productID})} className='border-[1px] rounded-xl px-1 py-1 border-customsalmon mr-2'>
              <Image width={100} height={100} alt={each.productAlt} source={{uri:each.productImg}}/>
            </TouchableOpacity>
            <View className='justify-between'>
              <TouchableOpacity onPress={()=>navigation.navigate('Product',{productID:each.productID})}><Text className='text-customsalmon font-bold'>{each.productName}</Text></TouchableOpacity>
              <View className='flex-row justify-between w-[80%] items-center'>
                <TouchableOpacity onPress={()=>removeItem(each.wishlistItemID,each.productID)} className='py-1 px-6 bg-customsalmon rounded-xl'><Text className='text-white font-bold'>Remove</Text></TouchableOpacity>
                <Text className='font-bold text-customsalmon text-lg'>${each.productPrice}</Text>
              </View>
            </View>
          </View>)}
        </ScrollView>
      </View>
    </View>
  )
}

export default Wishlist