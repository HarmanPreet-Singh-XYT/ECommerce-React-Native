import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Bag, Blocks, BottomBarHeart, Home, Menu } from './NativeSVG'
import { useNavigation } from '@react-navigation/native'
import { useMenu } from '../helpers/MenuContext';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'
import Menubar from './SideMenu/Menubar';

const BottomBar = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { toggleCart, toggleFav, toggleSidebar, setSidebarType } = useMenu();
  return (
    <>
    <Menubar/>
    <View className='h-[60px] bg-white border-[1px] items-center border-customsalmon rounded-t-2xl justify-evenly flex-row'>
      <TouchableOpacity onPress={()=>{toggleSidebar();setSidebarType("menu")}}><Menu/></TouchableOpacity>
      <TouchableOpacity onPress={()=>{toggleSidebar();setSidebarType("category")}}><Blocks/></TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')}><Home/></TouchableOpacity>
      <TouchableOpacity onPress={()=>{toggleFav()}}><BottomBarHeart/></TouchableOpacity>
      <TouchableOpacity onPress={()=>{toggleCart()}}><Bag/></TouchableOpacity>
    </View>
    </>
  )
}

export default BottomBar