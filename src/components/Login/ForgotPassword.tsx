import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'
import { Formik } from 'formik'
import resetPassHandler from '../../api/resetPass'
import forgotOTPHandler from '../../api/sendOTP'
import { useApp } from '../../helpers/AccountDialog'
import Loading from '../Dialogs/Loading'
import InfoDialog from '../Dialogs/InfoDialog'
import OTPDialog from '../Dialogs/OTPDialog'
interface userData{
    email:string;
    password:string;
}
const ForgotPassword = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [otpPopup, setotpPopup] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(true);
    const [resent, setResent] = useState(false);
    const [success, setSuccess] = useState(false);
    const [expiredOTP, setExpiredOTP] = useState(false);
    const [incorrectOTP, setIncorrectOTP] = useState(false);
    const [form, setForm] = useState<userData>({email:'',password:''});
    const [loading, setloading] = useState(false);
    const {toggleIsPassword,appState,toggleServerError,toggleIsIncorrect} = useApp();
    async function resetPassProceed(data:userData,otp:string){
        setloading(true);
        const dataStructure = {email:data.email,password:data.password,otp}
        const resetPassword = await resetPassHandler(dataStructure);
        switch (resetPassword.status) {
            case 200:
                setSuccess(true);
                setloading(false);
                setotpPopup(false);
                break;
            case 205:
                setIncorrectOTP(true);
                setloading(false);
                break;
            case 210:
                setExpiredOTP(true);
                setloading(false);
                break;
            default:
                toggleServerError();
                setloading(false);
                break;
        }
    }
    async function resetPass({email,password,repassword}:{email:string,password:string,repassword:string}) {
        setloading(true);
        const data = {
            email:email,
            password:password,
        };
        if(password === repassword){
            setForm(data);
            const sendMail = await forgotOTPHandler(data.email);
            switch (sendMail.status) {
                case 200:
                    setotpPopup(true);
                    setloading(false);
                    break;
                case 205:
                    toggleIsIncorrect();
                    setloading(false);
                    break;
                default:
                    toggleServerError;
                    setloading(false);
                    break;
            }
        }else {toggleIsPassword();setloading(false)}
    };
    async function resendOTP(){
        setloading(true);
        const sendMail = await forgotOTPHandler(form.email);
            switch (sendMail.status) {
                case 200:
                    setResent(true);
                    setloading(false);
                    break;
                default:
                    toggleServerError;
                    setloading(false);
                    break;
        }
    }
    function toggleResend(){
        setResendDisabled(!resendDisabled);
    }
    function toggleExpiredOTP(){
        setExpiredOTP(false);
    }
    function toggleIncorrectOTP(){
        setIncorrectOTP(false);
    };
    function toggleResent(){
        setResent(false);
    };
    async function handleOTPSubmission({OTP}:{OTP:string}){
        await resetPassProceed({email:form.email,password:form.password},OTP);
    };
    function toggleOTPPopup(){
        setotpPopup(false);
    };
    function successRedirect(){
        navigation.navigate('Signin')
    }
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
        {(loading && otpPopup) && <Loading/>}
        {otpPopup && <OTPDialog toggleResend={toggleResend} btn1='Cancel' resendDisabled={resendDisabled} btn2='Submit' btn1Func={toggleOTPPopup} btn2Func={handleOTPSubmission} resendFunc={resendOTP}/>}
        {resent && <InfoDialog title='OTP Resent' message='OTP has been resent, you may receive OTP in few seconds.' btn='Close' btnFunc={toggleResent}/>}
        {success && <InfoDialog title='Successful' message='Changed password successfully, please Login via New Password' btn='Close' btnFunc={successRedirect}/>}
        {incorrectOTP && <InfoDialog title='OTP Incorrect' message='The given OTP is incorrect, please check the OTP and enter again.' btn='Close' btnFunc={toggleIncorrectOTP}/>}
        {expiredOTP && <InfoDialog title='OTP Expired' message='OTP has expired, please click on Resent OTP to receive another OTP.' btn='Close' btnFunc={toggleExpiredOTP}/>}
        {appState.isIncorrect && <InfoDialog title='Incorrect' message='Please check the credentials as they are incorrect.' btn='Close' btnFunc={toggleIsIncorrect}/>}
        {appState.isPassword && <InfoDialog title='Password does not match' message='Entered password does not match with Re-Entered Password' btn='Close' btnFunc={toggleIsPassword}/>}
        {appState.serverError && <InfoDialog title='Server Error' message='We are currently facing downtime, please try again lator.' btn='Close' btnFunc={toggleServerError}/>}
      <ScrollView className='w-[100%] h-[100%]'>
        <View className='flex-row w-[90%] mx-auto mb-6 mt-4'>
          <Text className='text-black text-xl font-bold'>Sign in With</Text>
        </View>
        <Formik initialValues={{ email: '',password:'',repassword:'', }}
      onSubmit={values => resetPass(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
                <View className='w-[90%] mx-auto'>
                    <Text className='text-lg text-black font-semibold'>Email</Text>
                    <TextInput placeholder='Enter your email' inputMode='email' placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('email')} onChangeText={handleChange('email')} textAlignVertical='center' className='w-[100%] font-bold text-md px-6 h-[45px] text-white bg-customsalmon rounded-xl mt-4'/>
                    <Text className='text-lg text-black font-semibold mt-6'>Password</Text>
                    <TextInput secureTextEntry={true} placeholder='********' placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('password')} onChangeText={handleChange('password')} textAlignVertical='center' className='w-[100%] font-bold text-md px-6 h-[45px]  text-white bg-customsalmon rounded-xl mt-4'/>
                    <Text className='text-lg text-black font-semibold mt-6'>Re-Enter Password</Text>
                    <TextInput secureTextEntry={true} placeholder='********' placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('repassword')} onChangeText={handleChange('repassword')} textAlignVertical='center' className='w-[100%] font-bold text-md px-6 h-[45px]  text-white bg-customsalmon rounded-xl mt-4'/>
                </View>
                <View className='my-5 w-[90%] mx-auto justify-between flex-row items-center'>
                </View>
                <TouchableOpacity disabled={loading} onPress={()=>handleSubmit()} className='w-[85%] mx-auto h-[50px] justify-center rounded-2xl bg-customsalmon'>
                    <Text className='text-lg font-bold text-white text-center'>{loading ? <View className='mx-auto'><ActivityIndicator size={32} color={'white'}/></View> : 'Get OTP & Reset Password'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.goBack()} className='mx-auto mt-6'><Text className='text-lg text-customsalmon font-bold'>Go Back</Text></TouchableOpacity>
            </View>
        )}
        </Formik>
      </ScrollView>
    </View>
  )
}

export default ForgotPassword