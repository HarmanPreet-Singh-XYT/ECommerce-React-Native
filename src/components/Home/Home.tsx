import { View, Text, ScrollView, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import Deal from './Products/Deal'
import Products from './Products/Products'
import BottomBar from '../BottomBar'

const Home = () => {
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
      <ScrollView className='w-[100%] h-[100%]'>
        <Deal/>
        <Products/>
      </ScrollView>
      <BottomBar/>
    </View>
  )
}

export default Home