import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from "@react-native-community/blur";
import { Formik,ErrorMessage } from 'formik';
import { Calendar } from 'react-native-calendars';
import { Calendar as Cal } from '../NativeSVG'
import * as Yup from 'yup';
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
    const getValidationSchema = () => {
      switch (dialogType) {
        case 'name':
          return Yup.string()
            .min(4, 'Name must be at least 4 characters')
            .max(64, 'Name must be at most 64 characters')
            .required('Name Required');
        case 'email':
          return Yup.string()
            .email('Invalid email address')
            .min(5, 'Email must be at least 5 characters')
            .max(128, 'Email must be at most 128 characters')
            .required('Email Required');
        case 'number':
          return Yup.string()
            .length(10, 'Mobile number must be exactly 10 digits')
            .required('Mobile Number Required');
        case 'password':
          return Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .max(32, 'Password must be at most 32 characters')
            .required('Password Required');
        default:
          return Yup.string(); // No validation if dialogType does not match
      }
    };
    
    const validationSchema = Yup.object({
      parameter: Yup.string().test('is-correct-type', 'Invalid input', function(value) {
        const schema = getValidationSchema();
        return schema.isValidSync(value);
      }),
    });
    return (
    <>
      <BlurView
        style={{position:'absolute',zIndex:1,width:'100%',height:'100%'}}
        blurType="light"
        blurAmount={4}
        reducedTransparencyFallbackColor="white"
      />
      <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,justifyContent:'center',alignItems:'center',zIndex:10}}>
      <Formik validationSchema={validationSchema} initialValues={{parameter:''}}
      onSubmit={values => btn2Func(values)}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }:{handleChange:any,handleBlur:any,handleSubmit:any,values:any,errors:any,touched:any}) => (
        <View className='bg-white border-[1px] border-customsalmon w-[90%] rounded-2xl h-auto py-6 items-center justify-evenly'>
          {touched.parameter && errors.parameter && <Text className='text-customsalmon text-center'>{errors.parameter}</Text>}
          <View className='items-center mb-6 w-[95%] mx-auto'>
            <Text className='text-lg font-bold text-black mb-2'>{title}</Text>
            <Text className='text-md font-medium text-black text-center mb-1'>{message}</Text>
            {message2 && <Text className='text-md font-semibold text-white'>{message2}</Text>}
            {message3 && <Text className='text-md font-semibold text-white'>{message3}</Text>}
            <Text className='text-md font-bold text-black mb-4'>{parameterMessage}</Text>
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
            <TouchableOpacity onPress={btn1Func} className='bg-white px-8 rounded-xl py-2 border-[1px] border-customsalmon'>
              <Text className='text-black font-bold text-md'>{btn1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleSubmit()} className='bg-customsalmon border-[1px] border-white px-8 rounded-xl py-2'>
              <Text className='text-white font-bold text-md'>{btn2}</Text>
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