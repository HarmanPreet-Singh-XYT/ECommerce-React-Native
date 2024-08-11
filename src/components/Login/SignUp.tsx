import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Checkbox from '../Checkbox'
import { Calendar as Cal } from '../NativeSVG'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Formik } from 'formik'
import useAuth from '../../controllers/Authentication'
import { useApp } from '../../helpers/AccountDialog'
interface date{
  dateString:string;
  day:number;
  month:number;
  timestamp:number;
  year:number;
}
const SignUp = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isChecked, setisChecked] = useState({termsConditons:false,promotion:false});
    const [UIState, setUIState] = useState({calendar:false});
    const [selectedDate, setSelectedDate] = useState('');
    function toggleCheckTerms(){
        setisChecked({...isChecked,termsConditons:!isChecked.termsConditons});
    };
    function togglePromotion(){
        setisChecked({...isChecked,promotion:!isChecked.promotion});
    };
    function toggleCalendar(){
      setUIState({...UIState,calendar:!UIState.calendar});
    };
    const [updates, setUpdates] = useState(false);
    const {registerUser} = useAuth();
    const {toggleAgreement, toggleIsPassword, toggleIsOpenAgreement} = useApp();
    const [loading, setloading] = useState(false)
    async function register(e:any,agreement:boolean,promotion:boolean) {
        const data = {
            userName:e.name,
            email:e.email,
            password:e.password,
            mobile_number:e.mobileNumber,
            dob:selectedDate
        };
        if(e.password === e.repassword){
            if(agreement) {setloading(true);await registerUser(data,promotion,setloading);}
            else toggleIsOpenAgreement();
        }else toggleIsPassword();
    };
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
      <ScrollView className='w-[100%] h-[100%]'>
        <View className='flex-row w-[90%] mx-auto mb-6 mt-4'>
          <Text className='text-black text-xl font-bold'>Create new account</Text>
        </View>
        <Formik initialValues={{ name:'',email: '',password:'',repassword:'',mobileNumber:'' }}
        onSubmit={values => register(values,isChecked.termsConditons,isChecked.promotion)}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View className='w-[90%] mx-auto'>
                <Text className='text-lg text-black font-semibold'>Full Name</Text>
                <TextInput placeholder='Enter your name' placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('name')} onChangeText={handleChange('name')} textAlignVertical='center' className='w-[100%] font-bold text-md px-6 h-[45px] text-white bg-customsalmon rounded-xl mt-4'/>
                <Text className='text-lg text-black font-semibold mt-6'>Email</Text>
                <TextInput placeholder='Enter your email' inputMode='email' placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('email')} onChangeText={handleChange('email')} textAlignVertical='center' className='w-[100%] font-bold text-md px-6 h-[45px] text-white bg-customsalmon rounded-xl mt-4'/>
                <Text className='text-lg text-black font-semibold mt-6'>Password</Text>
                <TextInput secureTextEntry={true} placeholder='********' placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('password')} onChangeText={handleChange('password')} textAlignVertical='center' className='w-[100%] font-bold text-md px-6 h-[45px]  text-white bg-customsalmon rounded-xl mt-4'/>
                <Text className='text-lg text-black font-semibold mt-6'>Re-enter Password</Text>
                <TextInput secureTextEntry={true} placeholder='********' placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('repassword')} onChangeText={handleChange('repassword')} textAlignVertical='center' className='w-[100%] font-bold text-md px-6 h-[45px]  text-white bg-customsalmon rounded-xl mt-4'/>
                <Text className='text-lg text-black font-semibold mt-6'>Mobile Number</Text>
                <TextInput inputMode='tel' placeholder='Enter your mobile number' placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('mobileNumber')} onChangeText={handleChange('mobileNumber')} textAlignVertical='center' className='w-[100%] font-bold text-md px-6 h-[45px] text-white bg-customsalmon rounded-xl mt-4'/>
                <Text className='text-lg text-black font-semibold mt-6'>Date of Birth</Text>
                <View style={{marginBottom:UIState.calendar ? 6 : 0}} className='flex-row items-center  mt-4'>
                    <TextInput value={selectedDate} readOnly placeholder='yyyy-mm-dd' placeholderTextColor={'#FFBCB5'} textAlignVertical='center' className='w-[85%] font-bold text-md px-6 h-[45px] text-white bg-customsalmon rounded-l-xl'/>
                    <View className='bg-customsalmon h-[45px] w-[15%] rounded-r-xl justify-center items-center'><TouchableOpacity onPress={toggleCalendar}><Cal/></TouchableOpacity></View>
                </View>
                {UIState.calendar && <Calendar onDayPress={(day:date)=>{setSelectedDate(day.dateString);setUIState({...UIState,calendar:false})}}/>}
            </View>
            <View className='my-8 w-[90%] mx-auto justify-between items-center'>
                <View className='flex-row items-start mt-4'>
                    <Checkbox isChecked={isChecked.termsConditons} toggleCheck={toggleCheckTerms}/>
                    <Text className='text-md font-medium ml-3 w-[90%] bottom-0.5 text-customsalmon'>By signing up, you are creating a H-Comm account, and you agree to H-Comm Terms & Conditions and Privacy Policy</Text>
                </View>
                <View className='flex-row items-start mt-4'>
                    <Checkbox isChecked={isChecked.promotion} toggleCheck={togglePromotion}/>
                    <Text className='text-md font-medium ml-3 w-[90%] bottom-0.5 text-customsalmon'>Email me about product updates and resources.</Text>
                </View>
            </View>
            <TouchableOpacity onPress={()=>handleSubmit()} className='w-[85%] mx-auto h-[60px] justify-center rounded-2xl bg-customsalmon'>
                <Text className='text-lg font-bold text-white text-center'>Sign up with H-Comm</Text>
            </TouchableOpacity>
          </View>)}
        </Formik>
        <View className='flex-row w-[90%] mx-auto my-8'>
            <Text className='text-md text-customsalmon mr-2'>Already have an account?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Signin')}><Text className='underline text-md text-[#FF5C50] font-semibold'>Sign in</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default SignUp