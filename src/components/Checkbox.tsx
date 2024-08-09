import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Tick } from './NativeSVG'

const Checkbox = ({isChecked,toggleCheck}:{isChecked:boolean,toggleCheck:()=>void}) => {

  return (
    <TouchableOpacity style={{backgroundColor:isChecked ? '#FA8072' : '#FFBCB5'}} onPress={toggleCheck} className='w-[20px] h-[20px] items-center justify-center rounded-lg'>{isChecked && <Tick/>}</TouchableOpacity>
  )
}

export default Checkbox