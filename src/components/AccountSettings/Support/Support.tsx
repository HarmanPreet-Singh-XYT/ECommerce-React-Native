import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import contactHandler from '../../../api/contact';
import Loading from '../../Dialogs/Loading';
import { Formik } from 'formik';
import InfoDialog from '../../Dialogs/InfoDialog';
import * as Yup from 'yup';
const Support = () => {
    const [commMethod,setCommMethod] = useState<'email'|'phone'>('email');
    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState<null | string>(null);
    async function formSubmit({name,email,number,message}:{name:string,email:string,number:string,message:string}){
        setloading(true);
        const data = {
            name:name,
            email:email,
            phone:number,
            method:commMethod,
            message:message
        }
        const response = await contactHandler(data);
        switch (response.status) {
            case 200:
                setmessage(`#${response.data.id} - Successfully sent your message, we will contact you under 24 hours. Thank you.`)
                setloading(false);
                break;
        
            default:
                setmessage('We faced an error while processing your request. Please try again later.')
                setloading(false);
                break;
        }
    }
    function toggleMessage(){
        setmessage(null);
    };
    const messageValidationSchema = Yup.object({
        name: Yup.string()
          .min(4, 'Name must be at least 4 characters')
          .max(64, 'Name must be at most 64 characters')
          .required('Name Required'),
        email: Yup.string()
          .email('Invalid email address')
          .min(5, 'Email must be at least 5 characters')
          .max(128, 'Email must be at most 128 characters')
          .required('Email Required'),
        number: Yup.string()
          .length(10, 'Contact number must be exactly 10 digits')
          .required('Contact Number Required'),
        message: Yup.string()
          .min(10, 'Message must be at least 10 characters')
          .max(500, 'Message must be at most 500 characters')
          .required('Message Required'),
      });
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
        {loading && <Loading/>}
        {message!==null && <InfoDialog title='Info' message={message} btn='Close' btnFunc={toggleMessage}/>}
        <Formik validationSchema={messageValidationSchema} initialValues={{name:'',email:'',number:'',message:''}}
        onSubmit={values => formSubmit(values)}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }:{handleChange:any,handleBlur:any,handleSubmit:any,values:any,errors:any,touched:any}) => (
        <View className='w-[90%] rounded-xl self-center my-auto p-4 h-auto border-[1px] border-customsalmon'>
            <Text className='self-center py-2 text-lg font-bold text-customsalmon'>Send Us a Message</Text>
            {touched.email && errors.email && <Text className='text-customsalmon text-center'>{errors.email}</Text>}
            {touched.number && errors.number && <Text className='text-customsalmon text-center'>{errors.number}</Text>}
            {touched.message && errors.message && <Text className='text-customsalmon text-center'>{errors.message}</Text>}
            {touched.name && errors.name && <Text className='text-customsalmon text-center'>{errors.name}</Text>}
            <View className='mb-4'>
                <Text className='font-bold text-black'>Name</Text>
                <TextInput maxLength={64} placeholder={`Enter your Name`} onBlur={handleBlur('name')} onChangeText={handleChange('name')} placeholderTextColor={'#FFBCB5'} className='bg-customsalmon mt-1 font-bold text-white w-[100%] rounded-xl h-[40px] px-6 mx-auto'/>
            </View>
            <View className='mb-4'>
                <Text className='font-bold text-black'>Email</Text>
                <TextInput inputMode='email' maxLength={128} placeholder={`Enter your Email`} onBlur={handleBlur('email')} onChangeText={handleChange('email')} placeholderTextColor={'#FFBCB5'} className='bg-customsalmon mt-1 font-bold text-white w-[100%] rounded-xl h-[40px] px-6 mx-auto'/>
            </View>
            <View className='mb-6'>
                <Text className='font-bold text-black'>Contact Number</Text>
                <TextInput inputMode='tel' maxLength={10} placeholder={`Enter your Contact Number`} onBlur={handleBlur('number')} onChangeText={handleChange('number')} placeholderTextColor={'#FFBCB5'} className='bg-customsalmon mt-1 font-bold text-white w-[100%] rounded-xl h-[40px] px-6 mx-auto'/>
            </View>
            <View className='mb-4'>
                <Text className='font-bold text-black'>Message</Text>
                <TextInput maxLength={500} multiline={true} placeholder={`Write your message in detail here`} onBlur={handleBlur('message')} onChangeText={handleChange('message')} textAlignVertical='top' placeholderTextColor={'#FFBCB5'} className='bg-customsalmon mt-1 font-bold text-white w-[100%] rounded-xl h-[125px] px-6 mx-auto'/>
            </View>
            <View>
                <Text className='font-bold text-black text-center mb-2'>Preferred Method of Communication</Text>
                <View className='flex-row justify-between'>
                    <View className='flex-row items-center gap-4'>
                        <TouchableOpacity onPress={()=>setCommMethod('email')} className='w-[30px] h-[30px] items-center justify-center rounded-full bg-white border-[1px] border-customsalmon'>{commMethod==='email' && <View className='bg-customsalmon w-[20px] h-[20px] rounded-full'></View>}</TouchableOpacity>
                        <Text className='font-bold text-black'>Email</Text>
                    </View>
                    <View className='flex-row items-center gap-4'>
                        <TouchableOpacity onPress={()=>setCommMethod('phone')} className='w-[30px] h-[30px] items-center justify-center rounded-full bg-white border-[1px] border-customsalmon'>{commMethod==='phone' && <View className='bg-customsalmon w-[20px] h-[20px] rounded-full'></View>}</TouchableOpacity>
                        <Text className='font-bold text-black'>Phone</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={()=>handleSubmit()} className='bg-customsalmon rounded-xl py-2 mt-6'><Text className='font-bold text-white text-center'>Send</Text></TouchableOpacity>
        </View>)}
        </Formik>
    </View>
  )
}

export default Support