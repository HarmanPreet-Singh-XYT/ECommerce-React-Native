import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from "@react-native-community/blur";
import { Formik } from 'formik';
import { Calendar } from 'react-native-calendars';
import { Calendar as Cal } from '../NativeSVG'
interface params{
    parameter:string
};
interface date{
    dateString:string;
    day:number;
    month:number;
    timestamp:number;
    year:number;
};
const SettingParameter = ({title,message,btn1,btn2,message2,message3,btn1Func,btn2Func,parameterMessage,placeholder,dialogType,selectedDate, setSelectedDate}:{title:string,message:string,btn1:string,btn2:string,message2?:string,message3?:string,btn1Func:()=>void,btn2Func:(values:params)=>void,parameterMessage:string,placeholder:string,dialogType:string,selectedDate:string,setSelectedDate:React.Dispatch<React.SetStateAction<string>>}) => {
    const [UIState, setUIState] = useState({calendar:false});
    
    function toggleCalendar(){
        setUIState({...UIState,calendar:!UIState.calendar});
    };
    return (
    <>
      <BlurView
        style={{position:'absolute',zIndex:1,width:'100%',height:'100%'}}
        blurType="light"
        blurAmount={4}
        reducedTransparencyFallbackColor="white"
      />
      <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,justifyContent:'center',alignItems:'center',zIndex:10}}>
      <Formik initialValues={{parameter:''}}
      onSubmit={values => btn2Func(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View className='bg-white border-[1px] border-customsalmon w-[90%] rounded-2xl h-auto py-4 items-center justify-evenly'>
          <View className='items-center mb-2 w-[95%] mx-auto'>
            <Text className='text-xl font-bold text-black mb-2'>{title}</Text>
            <Text className='text-lg font-medium text-black text-center'>{message}</Text>
            {message2 && <Text className='text-lg font-semibold text-white'>{message2}</Text>}
            {message3 && <Text className='text-lg font-semibold text-white'>{message3}</Text>}
            <Text className='text-lg font-bold text-black'>{parameterMessage}</Text>
           {dialogType==='name' && <TextInput placeholder={`Enter your ${placeholder}`} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('parameter')} onChangeText={handleChange('parameter')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6'/>}
           {dialogType==='email' && <TextInput inputMode='email' maxLength={128} placeholder={`Enter your ${placeholder}`} onBlur={handleBlur('parameter')} onChangeText={handleChange('parameter')} placeholderTextColor={'#FFBCB5'} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6'/>}
           {dialogType==='number' && <TextInput inputMode='tel' maxLength={10} placeholder={`Enter your ${placeholder}`} onBlur={handleBlur('parameter')} onChangeText={handleChange('parameter')} placeholderTextColor={'#FFBCB5'} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6'/>}
           {dialogType==='password' && <TextInput secureTextEntry={true} maxLength={10} placeholder={`Enter your ${placeholder}`} onBlur={handleBlur('parameter')} onChangeText={handleChange('parameter')} placeholderTextColor={'#FFBCB5'} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6'/>}
            {dialogType==='date of birth' && <><View style={{marginBottom:UIState.calendar ? 6 : 0}} className='flex-row items-center w-[80%]  mt-4'>
                    <TextInput value={selectedDate} readOnly placeholder='yyyy-mm-dd' placeholderTextColor={'#FFBCB5'} textAlignVertical='center' className='w-[85%] font-bold text-md px-6 h-[40px] text-white bg-customsalmon rounded-l-xl'/>
                    <View className='w-[50px] font-bold text-md px-2 right-2 h-[40px] text-white bg-customsalmon rounded-r-xl'><TouchableOpacity onPress={toggleCalendar}><Cal/></TouchableOpacity></View>
                </View>
                {UIState.calendar && <Calendar onDayPress={(day:date)=>{setSelectedDate(day.dateString);setUIState({...UIState,calendar:false})}}/>}</>
            }
          </View>
          <View className='flex-row gap-5'>
            <TouchableOpacity onPress={btn1Func} className='bg-white px-8 rounded-xl py-1 border-[1px] border-customsalmon'>
              <Text className='text-black font-bold text-lg'>{btn1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleSubmit()} className='bg-customsalmon border-[1px] border-white px-8 rounded-xl py-1'>
              <Text className='text-white font-bold text-lg'>{btn2}</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
        </Formik>
      </View>
    </>
  )
}

export default SettingParameter