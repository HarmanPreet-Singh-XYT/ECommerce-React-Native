import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Cross } from '../NativeSVG'
import { useApp } from '../../helpers/AccountDialog';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMenu } from '../../helpers/MenuContext';
import { cartDeleteHandler } from '../../api/itemLists';
import {  removeItemFromWishlist } from '../../controllers/CartWishlist';
import { useAppSelector, useAppDispatch } from '../../hooks';
const Wishlist = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
const { appState } = useApp();
  const [loading, setloading] = useState(false);
  const isLogged = appState.loggedIn;
  const cartlist = useAppSelector((state) => state.cartWishlist.wishlist);
  const defaultAccount = useAppSelector((state) => state.userState.defaultAccount)
  const dispatch = useAppDispatch();
  const { toggleFav } = useMenu();
  async function removeItem(cartItemID:number,productID:number){
    setloading(true);
    isLogged && await cartDeleteHandler({userID:defaultAccount.userID,cartItemID});
    dispatch(removeItemFromWishlist(productID));
    setloading(false);
  }

  return (
    <View className='w-[85%] mx-auto h-[92%] justify-between'>
        <View className='w-[100%]'>
            <View className='pb-2 w-[100%] border-b-[1px] border-customsalmon flex-row items-center justify-between'>
                <Text className='text-2xl text-customsalmon font-bold'>Favorites</Text>
                <TouchableOpacity onPress={toggleFav}><Cross/></TouchableOpacity>
            </View>
            <ScrollView className='mt-6 w-[100%]'>
                {cartlist.map((each)=><View key={each.wishlistItemID} className='flex-row justify-between'>
                    <View>
                        <TouchableOpacity onPress={()=>{toggleFav();navigation.navigate('Product',{productID:each.productID})}} className='border-[1px] border-customsalmon px-1 py-1 rounded-xl'>
                        <Image source={{uri:each.productImg}} alt={each.productAlt} width={75} height={80}/>
                        </TouchableOpacity>
                        {loading ? <ActivityIndicator color={'salmon'} size={16}/>
                        : <TouchableOpacity disabled={loading} onPress={()=>removeItem(each.wishlistItemID,each.productID)}><Text className='font-bold text-customsalmon text-center'>Remove</Text></TouchableOpacity>}
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>{toggleFav();navigation.navigate('Product',{productID:each.productID})}}><Text className='text-black font-medium text-lg w-[200px]'>{each.productName}</Text></TouchableOpacity>
                        <View className='flex-row justify-between'><View></View><Text className='font-bold text-lg text-black'>${each.productPrice}</Text></View>
                    </View>
                </View>)}
            </ScrollView>
        </View>
        <View className='border-t-[1px] border-customsalmon justify-between'>

            <TouchableOpacity onPress={toggleFav} disabled={loading} className='bg-customsalmon py-3 my-4 rounded-xl'>{loading ? <ActivityIndicator color={'white'} size={24}/> : <Text className='font-bold text-white text-center text-lg'>Continue Shopping</Text>}</TouchableOpacity>
        </View>
    </View>
     
  )
}

export default Wishlist