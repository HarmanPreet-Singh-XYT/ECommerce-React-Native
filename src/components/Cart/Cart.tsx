import { View, Text, TouchableOpacity, ScrollView, Image, Touchable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Cross, Minus, Plus } from '../NativeSVG'
import { useApp } from '../../helpers/AccountDialog';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMenu } from '../../helpers/MenuContext';
import { cartDeleteHandler } from '../../api/itemLists';
import { cartQuantityHandler } from '../../api/userUpdate';
import { removeItemFromCart, setCart } from '../../controllers/CartWishlist';
import { useAppSelector, useAppDispatch } from '../../hooks';
const Cart = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
const { appState } = useApp();
  const [loading, setloading] = useState(false);
  const isLogged = appState.loggedIn;
  const cartlist = useAppSelector((state) => state.cartWishlist.cart);
  const defaultAccount = useAppSelector((state) => state.userState.defaultAccount)
  const dispatch = useAppDispatch();
  const { toggleCart } = useMenu();
  let total = cartlist.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.quantity * currentValue.productPrice;
  }, 0);
  async function removeItem(cartItemID:number,productID:number){
    setloading(true);
    isLogged && await cartDeleteHandler({userID:defaultAccount.userID,cartItemID});
    dispatch(removeItemFromCart(productID));
    setloading(false);
  }
  const changeValue = async (action:string,cartitemID:number,selectedQuantity:number,productID:number)=>{
    switch (action) {
      case 'increase':
        if(10 > selectedQuantity && 9 > selectedQuantity) {
          setloading(true);
          isLogged && await cartQuantityHandler(cartitemID,productID,defaultAccount.userID,'increment');
          dispatch(setCart((cartlist.map((each)=>each.cartItemID===cartitemID ? {...each,quantity:each.quantity+1} : each))));
          setloading(false);
        };
        break;
      case 'decrease':
        if(selectedQuantity > 1){
          setloading(true);
          isLogged && await cartQuantityHandler(cartitemID,productID,defaultAccount.userID,'decrement');
          dispatch(setCart((cartlist.map((each)=>each.cartItemID===cartitemID ? {...each,quantity:each.quantity-1} : each))));
          setloading(false);
        };
        break;
    }
  }
  return (
    <View className='w-[85%] mx-auto h-[92%] justify-between'>
        <View className='w-[100%]'>
            <View className='pb-2 w-[100%] border-b-[1px] border-customsalmon flex-row items-center justify-between'>
                <Text className='text-2xl text-customsalmon font-bold'>Shopping Cart</Text>
                <TouchableOpacity onPress={toggleCart}><Cross/></TouchableOpacity>
            </View>
            <ScrollView className='mt-6 w-[100%]'>
                {cartlist.map((each)=><View key={each.cartItemID} className='flex-row justify-between mb-4'>
                    <View>
                        <TouchableOpacity onPress={()=>{toggleCart();navigation.navigate('Product',{productID:each.productID})}} className='border-[1px] border-customsalmon px-1 py-1 rounded-xl'>
                        <Image source={{uri:each.productImg}} alt={each.productAlt} width={75} height={80}/>
                        </TouchableOpacity>
                        {loading ? <ActivityIndicator color={'salmon'} size={16}/>
                        : <TouchableOpacity disabled={loading} onPress={()=>removeItem(each.cartItemID,each.productID)}><Text className='font-bold text-customsalmon text-center'>Remove</Text></TouchableOpacity>}
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>{toggleCart();navigation.navigate('Product',{productID:each.productID})}}><Text className='text-black font-medium text-lg w-[200px]'>{each.productName}</Text></TouchableOpacity>
                        <View className='flex-row justify-between items-center'><Text className='text-customsalmon'><Text className='text-[10px]'>Color:</Text>{each.productColor}</Text><Text className='font-bold text-lg text-black'>${each.productPrice}</Text></View>
                        <Text className='text-customsalmon'><Text className='text-[10px]'>Size:  </Text>{each.productSize}</Text>
                            <View className='flex-row items-center justify-between'>
                                <Text className='text-customsalmon'>Qty</Text>
                                <View className='px-1 border-[1px] border-customsalmon rounded-sm'>
                                    <Text className='font-bold text-lg h-[25px] items-center justify-center text-black'>{each.quantity}</Text>
                                </View>
                                <View className='flex-row items-center'>
                                    <TouchableOpacity disabled={loading} onPress={()=>changeValue('decrease',each.cartItemID,each.quantity,each.productID)} className='border-[1px] px-4 border-customsalmon py-1.5 px- rounded-l-md'>{loading ? <ActivityIndicator color={'salmon'} size={16}/> : <Minus width={12} height={16}/>}</TouchableOpacity>
                                    <TouchableOpacity disabled={loading} onPress={()=>changeValue('increase',each.cartItemID,each.quantity,each.productID)} className='border-[1px] px-4 border-customsalmon py-1.5 rounded-r-md'>{loading ? <ActivityIndicator color={'salmon'} size={16}/> : <Plus width={16} height={16}/>}</TouchableOpacity>
                                </View>
                        </View>
                    </View>
                </View>)}
            </ScrollView>
        </View>
        <View className='border-t-[1px] border-customsalmon justify-between'>
            <View className='mt-4'>
                <View className='flex-row justify-between'>
                    <Text className='text-lg font-semibold text-black'>Subtotal</Text>
                    <Text className='text-lg font-bold text-black'>${total}</Text>
                </View>
                <Text className='text-customsalmon'>Shipping and taxes are calculated at checkout</Text>
            </View>
            <TouchableOpacity disabled={loading} className='bg-customsalmon py-3 my-4 rounded-xl'>{loading ? <ActivityIndicator color={'white'} size={24}/> : <Text className='font-bold text-white text-center text-lg'>Checkout</Text>}</TouchableOpacity>
            <View className='flex-row gap-2 justify-center'>
                <Text>or</Text>
                <TouchableOpacity onPress={toggleCart}><Text className='text-customsalmon font-bold'>Continue Shopping</Text></TouchableOpacity>
            </View>
        </View>
    </View>
     
  )
}

export default Cart