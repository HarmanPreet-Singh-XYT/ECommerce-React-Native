import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Google } from '../NativeSVG'
import Checkbox from '../Checkbox'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'
import { Formik } from 'formik'
import useAuth from '../../controllers/Authentication'
const SignIn = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isChecked, setisChecked] = useState(false);
    const [enabled, setEnabled] = useState(false)
    const {checkLogin} = useAuth();
    const [loading, setloading] = useState(false);
    async function login(e:any,remember:boolean){
        setloading(true);
        await checkLogin({email:e.email,password:e.password},remember,setloading);
    }
    function toggleCheck(){
        setisChecked(!isChecked);
    }
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
      <ScrollView className='w-[100%] h-[100%]'>
        <View className='flex-row gap-2 w-[90%] mx-auto mt-2'>
          <Text className='text-black text-2xl font-bold'>Welcome Back</Text>
        </View>
        <View className='flex-row gap-2 w-[90%] mx-auto mb-4 mt-2'>
          <Text className='text-black text-xl font-bold'>Sign in With</Text>
        </View>
        <TouchableOpacity className='flex-row mx-auto w-[250px] mt-2 h-[50px] border-[1px] rounded-xl border-customsalmon justify-center items-center'>
            <Google/>
            <Text className='text-lg ml-2 font-semibold text-black text-center'>Google</Text>
        </TouchableOpacity>
        <View className='w-[90%] mx-auto flex-row items-center justify-between my-4'>
            <View className='w-[45%] h-[1px] bg-customsalmon'></View>
            <Text className='text-black text-lg font-medium'>or</Text>
            <View className='w-[45%] h-[1px] bg-customsalmon'></View>
        </View>
        <Formik initialValues={{ email: '',password:'' }}
      onSubmit={values => login(values,isChecked)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <View className='w-[90%] mx-auto'>
              <Text className='text-lg text-black font-semibold'>Email</Text>
              <TextInput placeholder='Enter your email' inputMode='email' placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('email')} onChangeText={handleChange('email')} textAlignVertical='center' className='w-[100%] font-bold text-md px-6 h-[45px] text-white bg-customsalmon rounded-xl mt-4'/>
              <Text className='text-lg text-black font-semibold mt-6'>Password</Text>
              <TextInput secureTextEntry={true} placeholder='********' placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('password')} onChangeText={handleChange('password')} textAlignVertical='center' className='w-[100%] font-bold text-md px-6 h-[45px]  text-white bg-customsalmon rounded-xl mt-4'/>
          </View>
          <View className='my-8 w-[90%] mx-auto justify-between flex-row items-center'>
              <View className='flex-row items-center'>
                  <Checkbox isChecked={isChecked} toggleCheck={toggleCheck}/>
                  <Text className='text-md font-medium ml-2 text-customsalmon'>Remember me</Text>
              </View>
              <View>
                  <Text className='text-[#FF5C50] underline text-md font-semibold'>Forgot Password?</Text>
              </View>
          </View>
          <TouchableOpacity disabled={loading} onPress={()=>handleSubmit()} className='w-[85%] mx-auto h-[60px] justify-center rounded-2xl bg-customsalmon'>
              <Text className='text-lg font-semibold text-white text-center'>{loading ? <ActivityIndicator size={32} color={'white'}/> : 'Sign in to your account'}</Text>
          </TouchableOpacity>
          <View className='flex-row w-[90%] mx-auto my-8'>
              <Text className='text-md text-customsalmon mr-2'>Don't have an account yet?</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Signup')}><Text className='underline text-md text-[#FF5C50] font-semibold'>Sign up</Text></TouchableOpacity>
          </View>
        </View>
        
        )}
        </Formik>
        
      </ScrollView>
    </View>
  )
}

export default SignIn