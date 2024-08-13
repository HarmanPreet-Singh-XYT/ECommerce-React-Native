import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from "@react-native-community/blur";
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';
interface params{
    name:string;
    number:string;
    address1:string;
    address2:string;
    city:string;
    state:string;
    country:string;
    postalCode:string;
};
interface Address {
  addressID:number;
  addressType:string;
  contactNumber:number;
  addressLine1:string
  addressLine2:string
  city:string;
  state:string;
  country:string;
  postalCode:string;
  userName:string;
  is_default:boolean;
};
const AddressDialog = ({title,message,btn1,btn2,message2,message3,btn1Func,btn2Func,dialogType,selectedAddress,addressType,setaddressType}:{selectedAddress:Address,title:string,message:string,btn1:string,btn2:string,message2?:string,message3?:string,btn1Func:()=>void,btn2Func:(values:params)=>void,dialogType:string|null,addressType:string,setaddressType:React.Dispatch<React.SetStateAction<'HOME'|'WORK'>>}) => {
    const addressValidation = Yup.object({
      name: Yup.string()
      .min(4, 'Name must be at least 4 characters')
      .max(64, 'Name must be at most 64 characters')
      .required('Name Required'),
      number: Yup.string()
        .length(10, 'Contact number must be exactly 10 digits')
        .required('Number Required'),
      address1: Yup.string()
        .min(2, 'Address line 1 must be at least 2 characters')
        .max(128, 'Address line 1 must be at most 128 characters')
        .required('Address Required'),
      address2: Yup.string()
        .min(2, 'Address line 2 must be at least 2 characters')
        .max(128, 'Address line 2 must be at most 128 characters')
        .required('Address Required'),
      city: Yup.string()
        .min(2, 'City must be at least 2 characters')
        .max(60, 'City must be at most 60 characters')
        .required('City Required'),
      state: Yup.string()
        .min(2, 'State must be at least 2 characters')
        .max(16, 'State must be at most 16 characters')
        .required('State Required'),
      country: Yup.string()
        .min(2, 'Country must be at least 2 characters')
        .max(56, 'Country must be at most 56 characters')
        .required('Country Required'),
      postalCode: Yup.string()
        .min(6, 'Postal code must be at least 6 characters')
        .max(8, 'Postal code must be at most 8 characters')
        .required('Postal Code Required'),
    })
  return (
    <>
      <BlurView
        style={{position:'absolute',zIndex:1,width:'100%',height:'100%'}}
        blurType="light"
        blurAmount={4}
        reducedTransparencyFallbackColor="white"
      />
      <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,justifyContent:'center',alignItems:'center',zIndex:10}}>
      <Formik validationSchema={addressValidation} initialValues={{name:dialogType==='newaddress' ? '' : selectedAddress.userName,number:dialogType==='newaddress' ? '' : selectedAddress.contactNumber.toString(),address1:dialogType==='newaddress' ? '' : selectedAddress.addressLine1,address2:dialogType==='newaddress' ? '' : selectedAddress.addressLine2,city:dialogType==='newaddress' ? '' : selectedAddress.city,state:dialogType==='newaddress' ? '' : selectedAddress.state,country:dialogType==='newaddress' ? '' : selectedAddress.country,postalCode:dialogType==='newaddress' ? '' : selectedAddress.postalCode}}
      onSubmit={values => btn2Func(values)}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }:{handleChange:any,handleBlur:any,handleSubmit:any,values:any,errors:any,touched:any}) => (
        <View className='bg-white border-[1px] border-customsalmon w-[90%] rounded-2xl h-auto max-h-[90%] py-4 items-center justify-evenly'>
          <ScrollView className='w-[100%]'>
            <View className='items-center mb-2 w-[95%] mx-auto'>
              <Text className='text-xl font-bold text-black mb-2'>{title}</Text>
              <Text className='text-md font-medium text-black text-center'>{message}</Text>
              {message2 && <Text className='text-md font-semibold text-white'>{message2}</Text>}
              {message3 && <Text className='text-md font-semibold text-white'>{message3}</Text>}
              {dialogType==='newaddress' && <>
              {touched.name && errors.name && <Text className='text-customsalmon text-center'>{errors.name}</Text>}
              {touched.number && errors.number && <Text className='text-customsalmon text-center'>{errors.number}</Text>}
              {touched.address1 && errors.address1 && <Text className='text-customsalmon text-center'>{errors.address1}</Text>}
              {touched.address2 && errors.address2 && <Text className='text-customsalmon text-center'>{errors.address2}</Text>}
              {touched.city && errors.city && <Text className='text-customsalmon text-center'>{errors.city}</Text>}
              {touched.state && errors.state && <Text className='text-customsalmon text-center'>{errors.state}</Text>}
              {touched.country && errors.country && <Text className='text-customsalmon text-center'>{errors.country}</Text>}
              {touched.postalCode && errors.postalCode && <Text className='text-customsalmon text-center'>{errors.postalCode}</Text>}
              <Text className='text-md font-bold text-black mt-2'>Please Enter New Address</Text>
              <View className='w-[50%] justify-between flex-row'>
                <View className='flex-row items-center gap-2'>
                  <TouchableOpacity onPress={()=>setaddressType('WORK')} className='w-[25px] h-[25px] items-center justify-center rounded-full bg-white border-[1px] border-customsalmon'>{addressType==='WORK' && <View className='bg-customsalmon w-[16px] h-[16px] rounded-full'></View>}</TouchableOpacity>
                  <Text className='font-bold text-black text-md'>Work</Text>
                </View>
                <View className='flex-row items-center gap-2'>
                  <TouchableOpacity onPress={()=>setaddressType('HOME')} className='w-[25px] h-[25px] items-center justify-center rounded-full bg-white border-[1px] border-customsalmon'>{addressType==='HOME' && <View className='bg-customsalmon w-[16px] h-[16px] rounded-full'></View>}</TouchableOpacity>
                  <Text className='font-bold text-black text-md'>Home</Text>
                </View>
              </View> 
              <Text className='text-md font-bold text-black mt-2'>Name</Text>
              <TextInput maxLength={64} placeholder={`Enter your Name`} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('name')} onChangeText={handleChange('name')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>Contact Number</Text>
              <TextInput maxLength={10} inputMode='tel' placeholder={`Enter your Contact Number`} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('number')} onChangeText={handleChange('number')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>Address Line 1</Text>
              <TextInput maxLength={128} placeholder={`Enter your Address`} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('address1')} onChangeText={handleChange('address1')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>Address Line 2</Text>
              <TextInput maxLength={128} placeholder={`Enter your Address`} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('address2')} onChangeText={handleChange('address2')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>City</Text>
              <TextInput maxLength={60} placeholder={`Enter your City`} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('city')} onChangeText={handleChange('city')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>State</Text>
              <TextInput maxLength={16} placeholder={`Enter your State`} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('state')} onChangeText={handleChange('state')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>Country</Text>
              <TextInput maxLength={56} placeholder={`Enter your Country`} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('country')} onChangeText={handleChange('country')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>Postal Code</Text>
              <TextInput maxLength={8} placeholder={`Enter your Postal Code`} inputMode='numeric' placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('postalCode')} onChangeText={handleChange('postalCode')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/></>}
              
              
              {dialogType==='address' && <>
              {touched.name && errors.name && <Text className='text-customsalmon text-center'>{errors.name}</Text>}
              {touched.number && errors.number && <Text className='text-customsalmon text-center'>{errors.number}</Text>}
              {touched.address1 && errors.address1 && <Text className='text-customsalmon text-center'>{errors.address1}</Text>}
              {touched.address2 && errors.address2 && <Text className='text-customsalmon text-center'>{errors.address2}</Text>}
              {touched.city && errors.city && <Text className='text-customsalmon text-center'>{errors.city}</Text>}
              {touched.state && errors.state && <Text className='text-customsalmon text-center'>{errors.state}</Text>}
              {touched.country && errors.country && <Text className='text-customsalmon text-center'>{errors.country}</Text>}
              {touched.postalCode && errors.postalCode && <Text className='text-customsalmon text-center'>{errors.postalCode}</Text>}
              <Text className='text-md font-bold text-black mt-2'>Edit Address Details</Text>
              <View className='w-[50%] justify-between flex-row'>
                <View className='flex-row items-center gap-2'>
                  <TouchableOpacity onPress={()=>setaddressType('WORK')} className='w-[25px] h-[25px] items-center justify-center rounded-full bg-white border-[1px] border-customsalmon'>{addressType==='WORK' && <View className='bg-customsalmon w-[16px] h-[16px] rounded-full'></View>}</TouchableOpacity>
                  <Text className='font-bold text-black text-md'>Work</Text>
                </View>
                <View className='flex-row items-center gap-2'>
                  <TouchableOpacity onPress={()=>setaddressType('HOME')} className='w-[25px] h-[25px] items-center justify-center rounded-full bg-white border-[1px] border-customsalmon'>{addressType==='HOME' && <View className='bg-customsalmon w-[16px] h-[16px] rounded-full'></View>}</TouchableOpacity>
                  <Text className='font-bold text-black text-md'>Home</Text>
                </View>
              </View>
              <Text className='text-md font-bold text-black mt-2'>Name</Text>
              <TextInput maxLength={64} placeholder={`Enter your Name`} defaultValue={selectedAddress?.userName} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('name')} onChangeText={handleChange('name')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>Contact Number</Text>
              <TextInput maxLength={10} placeholder={`Enter your Contact Number`} defaultValue={selectedAddress?.contactNumber.toString()} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('number')} onChangeText={handleChange('number')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>Address Line 1</Text>
              <TextInput maxLength={128} placeholder={`Enter your Address`} defaultValue={selectedAddress?.addressLine1} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('address1')} onChangeText={handleChange('address1')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>Address Line 2</Text>
              <TextInput maxLength={128} placeholder={`Enter your Address`} defaultValue={selectedAddress?.addressLine2} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('address2')} onChangeText={handleChange('address2')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>City</Text>
              <TextInput maxLength={60} placeholder={`Enter your City`} defaultValue={selectedAddress?.city} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('city')} onChangeText={handleChange('city')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>State</Text>
              <TextInput maxLength={16} placeholder={`Enter your State`} defaultValue={selectedAddress?.state} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('state')} onChangeText={handleChange('state')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>Country</Text>
              <TextInput maxLength={56} placeholder={`Enter your Country`} defaultValue={selectedAddress?.country} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('country')} onChangeText={handleChange('country')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/>
              <Text className='text-md font-bold text-black mt-2'>Postal Code</Text>
              <TextInput maxLength={8} placeholder={`Enter your Postal Code`} inputMode='numeric' defaultValue={selectedAddress?.postalCode} placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('postalCode')} onChangeText={handleChange('postalCode')} className='bg-customsalmon mt-1 font-bold text-white w-[80%] rounded-xl h-[40px] px-6 mx-auto'/></>}
            </View>
            <View className='flex-row mx-auto mt-4'>
              <TouchableOpacity onPress={btn1Func} className='bg-white mr-4 px-10 rounded-xl py-1 border-[1px] border-customsalmon'>
                <Text className='text-black font-bold text-md'>{btn1}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>handleSubmit()} className='bg-customsalmon border-[1px] border-white px-10 rounded-xl py-1'>
                <Text className='text-white font-bold text-md'>{btn2}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        )}
        </Formik>
      </View>
    </>
  )
}

export default AddressDialog