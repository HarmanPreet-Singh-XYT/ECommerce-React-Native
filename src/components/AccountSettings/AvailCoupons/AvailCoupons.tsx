import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppSelector } from '../../../hooks'
import formatDate from '../../../api/dateConvert'

const AvailCoupons = () => {
  const coupons = useAppSelector((state) => state.userState.coupons)
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
      <View className='w-[100%] h-[100%]'>
        <View className='self-center w-[90%] my-4'>
          <Text className='text-black text-xl font-bold'>Available Coupons</Text>
        </View>
        <ScrollView>
          {coupons.map((each)=>
          <TouchableOpacity key={each.couponid} className='w-[90%] mb-4 self-center bg-customsalmon rounded-xl px-4 py-4 min-h-[120px]'>
            <View className='flex-row justify-between items-center'>
              <View className='bg-white rounded-xl px-1 py-1 w-auto'><Text className='text-[#4ADE80] self-center font-bold'>Upto ${each.maxdiscountamount}/{each.discountpercentage}%</Text></View>
              <Text className='text-[12px] text-[#FFBCB5]'>Valid till {formatDate(each.validuntil)}</Text>
            </View>
            <View className='my-4'>
              <Text className='text-white font-medium mb-1'>{each.description}</Text>
              <Text className='font-bold text-[12px] text-[#FFBCB5]'>{'('}Minimum Purchase Amount: {each.minpurchaseamount}{')'}</Text>
            </View>
              <View className='px-4 py-1 w-auto bg-white rounded-xl '><Text className='text-[#1E40AF] text-center font-bold'>{each.code}</Text></View>
          </TouchableOpacity>)}
        </ScrollView>
      </View>
    </View>
  )
}

export default AvailCoupons