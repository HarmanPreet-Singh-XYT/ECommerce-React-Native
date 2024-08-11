import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Bag, Blocks, BottomBarHeart, Home, Menu } from './NativeSVG'
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../helpers/MenuContext';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'
import Menubar from './SideMenu/Menubar';
import CartContainer from './Cart/CartContainer';
import WishlistContainer from './Wishlist/WishlistContainer';

const BottomBar = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { toggleCart, toggleFav, toggleSidebar, setSidebarType } = useMenu();
  return (
    <>
    <WishlistContainer/>
    <CartContainer/>
    <Menubar/>
    <View className='h-[60px] bg-white border-[1px] items-center border-customsalmon rounded-t-2xl justify-evenly flex-row'>
      <TouchableOpacity className='h-[60px] w-[10%] justify-center' onPress={()=>{toggleSidebar();setSidebarType("menu")}}><Menu/></TouchableOpacity>
      {/* <TouchableOpacity className='h-[60px] w-[10%] justify-center' onPress={()=>{toggleSidebar();setSidebarType("category")}}><Blocks/></TouchableOpacity> */}
      <TouchableOpacity className='h-[60px] w-[10%] justify-center' onPress={()=>navigation.navigate('Home')}><Home/></TouchableOpacity>
      <TouchableOpacity className='h-[60px] w-[10%] justify-center' onPress={()=>{toggleFav()}}><BottomBarHeart/></TouchableOpacity>
      <TouchableOpacity className='h-[60px] w-[10%] justify-center' onPress={()=>{toggleCart()}}><Bag/></TouchableOpacity>
    </View> 
    </>
  )
}

export default BottomBar