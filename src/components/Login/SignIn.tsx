import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Google } from '../NativeSVG'
import Checkbox from '../Checkbox'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'
import { Formik } from 'formik'
import useAuth from '../../controllers/Authentication'
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import * as Yup from 'yup';
import { useApp } from '../../helpers/AccountDialog'
import InfoDialog from '../Dialogs/InfoDialog'
import Loading from '../Dialogs/Loading'

const SignIn = () => {
    GoogleSignin.configure();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [isChecked, setisChecked] = useState(false);
    const {checkLogin, checkAuthLogin} = useAuth();
    const { toggleIsIncorrect, toggleServerError, appState } = useApp();
    // const [State, setState] = useState<any>({});
    const [loading, setloading] = useState(false);
    async function login(e:any,remember:boolean){
        setloading(true);
        await checkLogin({email:e.email,password:e.password},remember,setloading);
    }
    function toggleCheck(){
        setisChecked(!isChecked);
    };
    const responseGoogle = async (authResult:any) => {
      try {
          await checkAuthLogin(authResult.email,setloading);
      } catch (e) {
              setloading(false)
      }
    };
  
    // const googleLogin = useGoogleLogin({
    //   onSuccess: responseGoogle,
    //   onError: responseGoogle,
    //   flow: "auth-code",
    // });
    const _signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        // setState({ userInfo, error: undefined });
        responseGoogle(userInfo.user);
      } catch (error) {
        if (error) {
          switch (error) {
            case statusCodes.SIGN_IN_CANCELLED:
              // user cancelled the login flow
              break;
            case statusCodes.IN_PROGRESS:
              // operation (eg. sign in) already in progress
              break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              // play services not available or outdated
              break;
            default:
            // some other error happened
          }
        } else {
          // an error that's not related to google sign in occurred
        }
      }
    };
    const signinValidationSchema = Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .min(5, 'Email must be at least 5 characters')
        .max(128, 'Email must be at most 128 characters')
        .required('Email Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(32, 'Password must be at most 32 characters')
        .required('Password Required'),
    });
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
      {loading && <Loading/>}
      {appState.serverError && <InfoDialog title='Server Error' message='We are currently facing downtime, please try again lator.' btn='Close' btnFunc={toggleServerError}/>}
      {appState.isIncorrect && <InfoDialog title='Incorrect' message='Email or Password is incorrect, please check again and try.' btn='Close' btnFunc={toggleIsIncorrect}/>}
      
      <ScrollView className='w-[100%] h-[100%]'>
        <View className='flex-row gap-2 w-[90%] mx-auto mt-2'>
          <Text className='text-black text-2xl font-bold'>Welcome Back</Text>
        </View>
        <View className='flex-row gap-2 w-[90%] mx-auto mb-4 mt-2'>
          <Text className='text-black text-xl font-bold'>Sign in With</Text>
        </View>
        <TouchableOpacity onPress={()=>_signIn()} className='flex-row mx-auto w-[250px] mt-2 h-[50px] border-[1px] rounded-xl border-customsalmon justify-center items-center'>
            <Google/>
            <Text className='text-lg ml-2 font-semibold text-black text-center'>Google</Text>
        </TouchableOpacity>
        
        <View className='w-[90%] mx-auto flex-row items-center justify-between my-4'>
            <View className='w-[45%] h-[1px] bg-customsalmon'></View>
            <Text className='text-black text-lg font-medium'>or</Text>
            <View className='w-[45%] h-[1px] bg-customsalmon'></View>
        </View>
        <Formik validationSchema={signinValidationSchema} initialValues={{ email: '',password:'' }}
      onSubmit={values => login(values,isChecked)}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }:{handleChange:any,handleBlur:any,handleSubmit:any,values:any,errors:any,touched:any}) => (
        <View>
          {touched.email && errors.email && <Text className='text-customsalmon text-center'>{errors.email}</Text>}
          {touched.password && errors.password && <Text className='text-customsalmon text-center'>{errors.password}</Text>}

          <View className='w-[90%] mx-auto'>
              <Text className='text-lg text-black font-semibold'>Email</Text>
              <TextInput maxLength={128} placeholder='Enter your email' inputMode='email' placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('email')} onChangeText={handleChange('email')} textAlignVertical='center' className='w-[100%] font-bold text-md px-6 h-[45px] text-white bg-customsalmon rounded-xl mt-4'/>
              <Text className='text-lg text-black font-semibold mt-6'>Password</Text>
              <TextInput maxLength={32} secureTextEntry={true} placeholder='********' placeholderTextColor={'#FFBCB5'} onBlur={handleBlur('password')} onChangeText={handleChange('password')} textAlignVertical='center' className='w-[100%] font-bold text-md px-6 h-[45px]  text-white bg-customsalmon rounded-xl mt-4'/>
          </View>
          <View className='my-8 w-[90%] mx-auto justify-between flex-row items-center'>
              <View className='flex-row items-center'>
                  <Checkbox isChecked={isChecked} toggleCheck={toggleCheck}/>
                  <Text className='text-md font-medium ml-2 text-customsalmon'>Remember me</Text>
              </View>
              <TouchableOpacity onPress={()=>navigation.navigate('ResetPassword')}>
                  <Text className='text-[#FF5C50] underline text-md font-semibold'>Forgot Password?</Text>
              </TouchableOpacity>
          </View>
          <TouchableOpacity disabled={loading} onPress={()=>handleSubmit()} className='w-[85%] mx-auto h-[60px] justify-center rounded-2xl bg-customsalmon'>
              <Text className='text-lg font-semibold text-white text-center'>{loading ? <View className='w-[100%] items-center justify-center'><ActivityIndicator size={32} color={'white'}/></View> : 'Sign in to your account'}</Text>
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