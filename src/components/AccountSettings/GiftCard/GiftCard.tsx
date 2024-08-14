import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../../hooks'
import formatDate from '../../../api/dateConvert'
const GiftCard = () => {
  const giftCards = useAppSelector((state) => state.userState.giftCards)
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
      <View className='w-[100%] h-[100%]'>
        <View className='self-center w-[90%] my-4'>
          <Text className='text-black text-xl font-bold'>Gift Cards</Text>
        </View>
        <ScrollView>
          {giftCards.map((each)=>
          <TouchableOpacity key={each.cardid} className='w-[90%] mb-4 self-center bg-customsalmon rounded-xl px-4 py-4 min-h-[200px]'>
            <View className='border-[1px] border-white rounded-xl px-1 py-1 w-[100px]'><Text className='text-white self-center font-bold'>{each.balance} {each.currency}</Text></View>
            <View className='flex-row justify-between my-2'>
              <Text className='text-white font-bold'>{each.cardname}</Text>
              <Text className='text-white font-bold'>{each.cardcode}</Text>
            </View>
            <Text className='text-white'>Sent By <Text className='font-bold text-white'>{each.sendername}</Text></Text>
            <Text className='text-white'>"{each.message}"</Text>
            <View className='h-[1px] bg-white my-4'></View>
            <Text className='text-white'>{each.description}</Text>
            <View className='flex-row justify-between mt-2'>
              <Text className='text-white font-bold'>Expiring on</Text>
              <Text className='text-white font-bold'>{formatDate(each.expirydate)}</Text>
            </View>
          </TouchableOpacity>)}
        </ScrollView>
      </View>
    </View>
  )
}

export default GiftCard