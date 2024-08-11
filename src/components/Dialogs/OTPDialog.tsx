import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from "@react-native-community/blur";
import { OtpInput } from "react-native-otp-entry";
import Countdown from '../Login/ForgotPassword/OTPTimer';
interface params{
    OTP:string
};

const OTPDialog = ({btn1,btn2,btn1Func,btn2Func,resendFunc,resendDisabled,toggleResend}:{btn1:string,btn2:string,btn1Func:()=>void,btn2Func:(values:params)=>void,resendFunc:()=>void,resendDisabled:boolean,toggleResend:()=>void}) => {
    const [OTP, setOTP] = useState('');
    return (
    <>
      <BlurView
        style={{position:'absolute',zIndex:1,width:'100%',height:'100%'}}
        blurType="light"
        blurAmount={4}
        reducedTransparencyFallbackColor="white"
      />
      <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,justifyContent:'center',alignItems:'center',zIndex:10}}>
        <View className='bg-white border-[1px] border-customsalmon w-[90%] rounded-2xl h-auto py-4 items-center justify-evenly'>
          <View className='items-center mb-2 w-[95%] mx-auto'>
            <Text className='text-xl font-bold text-black mb-2'>OTP Sent</Text>
            <Text className='text-lg font-medium text-black text-center'>An OTP has been Sent on your Email Address</Text>
            <Text className='text-lg font-bold text-black'>Please check you Email Inbox</Text>
            <View className='mt-4 w-[95%]'>
                <Countdown onComplete={toggleResend}/>
                <OtpInput theme={{pinCodeContainerStyle:{backgroundColor:'salmon',width:'20%'},pinCodeTextStyle:{color:'white',fontSize:36,fontWeight:'bold'},focusStickStyle:{backgroundColor:'white'}}} textInputProps={{accessibilityLabel:"One-Time Password"}} focusColor={'salmon'} numberOfDigits={4} onFilled={(text) => setOTP(text)} />
            </View>
          </View>
          <View className='flex-row gap-5 mt-2'>
            <TouchableOpacity onPress={btn1Func} className='bg-white px-8 rounded-xl py-1 border-[1px] border-customsalmon'>
              <Text className='text-black font-bold text-lg'>{btn1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>btn2Func({OTP})} className='bg-customsalmon border-[1px] border-white px-8 rounded-xl py-1'>
              <Text className='text-white font-bold text-lg'>{btn2}</Text>
            </TouchableOpacity>
          </View>
          <View className='flex-row items-center'>
            <Text className='text-black font-bold text-lg mr-2 my-2'>Didn't receive OTP?</Text>
            <TouchableOpacity onPress={resendFunc} disabled={resendDisabled}><Text className='text-customsalmon font-bold underline text-lg'>Resend OTP</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

export default OTPDialog;