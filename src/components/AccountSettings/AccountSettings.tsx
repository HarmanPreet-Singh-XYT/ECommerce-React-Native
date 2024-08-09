import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { AddressPlus, Bin, Pen, RightArrow } from '../NativeSVG'

const AccountSettings = () => {
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
        <ScrollView className='w-[100%] h-[100%]'>
            <View className='flex-row w-[90%] mx-auto mb-6 mt-4'>
                <Text className='text-black text-xl font-bold'>Basic Info</Text>
            </View>
            <View>
                <View className='w-[90%] mx-auto'>
                    <Text className='text-black font-bold'>Name</Text>
                    <View className='justify-between flex-row items-center'>
                        <TextInput readOnly value='Demo User' textAlignVertical='center' className='w-[75%] font-bold px-6 h-[45px] text-white bg-[#FFBCB5] rounded-xl mt-2'/>
                        <TouchableOpacity><Pen/></TouchableOpacity>
                    </View>
                </View>
                <View className='w-[90%] mx-auto mt-6'>
                    <Text className='text-black font-bold'>Date of Birth</Text>
                    <View className='justify-between flex-row items-center'>
                        <TextInput readOnly value='2024-06-26' textAlignVertical='center' className='w-[75%] font-bold px-6 h-[45px] text-white bg-[#FFBCB5] rounded-xl mt-2'/>
                        <TouchableOpacity><Pen/></TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className='flex-row w-[90%] mx-auto mb-6 mt-6'>
                <Text className='text-black text-xl font-bold'>Account Info</Text>
            </View>
            <View>
                <View className='w-[90%] mx-auto'>
                    <Text className='text-black font-bold'>Email</Text>
                    <View className='justify-between flex-row items-center'>
                        <TextInput readOnly value='demo@demo.com' textAlignVertical='center' className='w-[75%] font-bold px-6 h-[45px] text-white bg-[#FFBCB5] rounded-xl mt-2'/>
                        <TouchableOpacity><Pen/></TouchableOpacity>
                    </View>
                </View>
                <View className='w-[90%] mx-auto mt-6'>
                    <Text className='text-black font-bold'>Mobile Number</Text>
                    <View className='justify-between flex-row items-center'>
                        <TextInput readOnly value='1234567891' textAlignVertical='center' className='w-[75%] font-bold px-6 h-[45px] text-white bg-[#FFBCB5] rounded-xl mt-2'/>
                        <TouchableOpacity><Pen/></TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className='flex-row w-[90%] mx-auto mb-6 mt-6 justify-between items-center'>
                <Text className='text-black text-xl font-bold'>Manage Addresses</Text>
                <TouchableOpacity><AddressPlus/></TouchableOpacity>
            </View>
            <View className='w-[90%] mx-auto'>
                {<View className='w-[100%] min-h-[150px] border-customsalmon border-[1px] rounded-2xl py-2 px-2'>
                    <View className='justify-between flex-row items-center'>
                        <View className='bg-customsalmon w-[60px] rounded-lg'><Text className='px-1 py-1 text-white font-bold text-center'>Home</Text></View>
                        <View className='bg-[#FFBCB5] w-[75px] rounded-lg'><Text className='px-1 py-1 text-white font-bold text-center'>Default</Text></View>
                    </View>
                    <Text className='text-lg text-black font-bold'>Random Guy</Text>
                    <View className='py-2'>
                        <Text className='text-black font-medium'>4, Chandan, 1 St Floor, Bb & Ci Railway Soc</Text>
                        <Text className='text-black font-medium'>Irla, Opp Pappilon Hotel, Vile Parle (west)</Text>
                        <Text className='text-black font-medium'>Maharashtra, India</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-black'>Postal Code - <Text className='font-medium'>400054</Text></Text>
                        <View className='flex-row'>
                            <TouchableOpacity className='bg-customsalmon w-[75px] h-[25px] items-center justify-center rounded-l-xl'><Pen width={15} height={15} color='white'/></TouchableOpacity>
                            <TouchableOpacity className='bg-white w-[75px] h-[25px] border-[1px] border-customsalmon items-center justify-center rounded-r-xl'><Bin/></TouchableOpacity>
                        </View>
                    </View>
                </View>}
            </View>
            <View className='flex-row w-[90%] mx-auto mb-4 mt-6'>
                <Text className='text-black text-xl font-bold'>Other Options</Text>
            </View>
            <View className='h-auto w-[90%] mx-auto border-customsalmon border-[1px] rounded-2xl mb-12'>
                <TouchableOpacity className='flex-row px-4 py-3 justify-between'>
                    <Text className='text-lg font-bold text-customsalmon'>Available Gift Cards</Text>
                    <RightArrow/>
                </TouchableOpacity>
                <View className='w-full h-[1px] bg-customsalmon'></View>
                <TouchableOpacity className='flex-row px-4 py-3 justify-between'>
                    <Text className='text-lg font-bold text-customsalmon'>Available Coupons</Text>
                    <RightArrow/>
                </TouchableOpacity>
                <View className='w-full h-[1px] bg-customsalmon'></View>
                <TouchableOpacity className='flex-row px-4 py-3 justify-between'>
                    <Text className='text-lg font-bold text-customsalmon'>My Wishlist</Text>
                    <RightArrow/>
                </TouchableOpacity>
                <View className='w-full h-[1px] bg-customsalmon'></View>
                <TouchableOpacity className='flex-row px-4 py-3 justify-between'>
                    <Text className='text-lg font-bold text-customsalmon'>Support</Text>
                    <RightArrow/>
                </TouchableOpacity>
            </View>
            <View className='flex-row w-[90%] mx-auto mb-4'>
                <TouchableOpacity className='bg-customsalmon w-[50%] justify-center rounded-l-xl'><Text className='text-white py-2 text-center font-bold text-lg'>Change Password</Text></TouchableOpacity>
                <TouchableOpacity className='bg-white border-customsalmon border-[1px] w-[50%] justify-center rounded-r-xl'><Text className='text-black py-2 text-center font-bold text-lg'>App Settings</Text></TouchableOpacity>
            </View>
        </ScrollView>
    </View>
  )
}

export default AccountSettings