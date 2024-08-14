import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Switch from './Switch';
const Settings = () => {
  const [isSwitchOn, setisSwitchOn] = useState(false);
  const [isSwitchOn2, setisSwitchOn2] = useState(false);
  function toggleSwitch(){
    setisSwitchOn(!isSwitchOn);
  }
  function toggleSwitch2(){
    setisSwitchOn2(!isSwitchOn2);
  }
  return (
    <View className='bg-customsalmon h-auto w-[90%] self-center rounded-xl my-6'>
      <TouchableOpacity onPress={toggleSwitch} className='flex-row justify-between px-4 py-4 items-center'>
        <View className='w-[75%]'>
          <Text className='font-bold text-white text-lg'>Haptic Feedback</Text>
          <Text className='font-medium text-white w-[100%]'>Vibration upon clicking a button</Text>
        </View>
        <View>
          <Switch value={isSwitchOn} toggleSwitch={toggleSwitch}/>
        </View>
      </TouchableOpacity>
      <View className='w-[100%] h-[1px] bg-white'></View>
      <TouchableOpacity onPress={toggleSwitch2} className='flex-row justify-between px-4 py-4 items-center'>
        <View className='w-[75%]'>
          <Text className='font-bold text-white text-lg'>Notifications</Text>
          <Text className='font-medium text-white'>Get Latest Deals and updates via notifcations</Text>
        </View>
        <View>
          <Switch value={isSwitchOn2} toggleSwitch={toggleSwitch2}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Settings