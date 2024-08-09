import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Cross, Facebook, Instagram, Linkedin, Twitter } from '../../NativeSVG'
import { useApp } from '../../../helpers/AccountDialog';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMenu } from '../../../helpers/MenuContext';
const Menu = () => {
    const {appState} = useApp();
    const loggedIn = appState.loggedIn;
    const { toggleSidebar } = useMenu();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    function router(action:string){
        switch (action) {
            case 'register':
                toggleSidebar();
                navigation.navigate('Signup');
                break;
            case 'login':
                toggleSidebar();
                navigation.navigate('Signin')
                break;
            case 'order':
                toggleSidebar();
                navigation.navigate('Orders')
                break;
            case 'settings':
                toggleSidebar();
                navigation.navigate('AccountSettings')
                break;
            default:
                break;
        }
    }
  return (
    <View className='w-[80%] mx-auto h-[75%] justify-between'>
        <View className='w-[100%]'>
            <View className='pb-2 w-[100%] border-b-[1px] border-customsalmon flex-row items-center justify-between'>
                <Text className='text-2xl text-customsalmon font-bold'>Menu</Text>
                <TouchableOpacity onPress={toggleSidebar}><Cross/></TouchableOpacity>
            </View>
            <View className='py-6 w-[100%] border-b-[1px] border-customsalmon flex-row justify-between'>
                <TouchableOpacity className='w-[40px] h-[40px] bg-customsalmon rounded-lg items-center justify-center'><Facebook/></TouchableOpacity>
                <TouchableOpacity className='w-[40px] h-[40px] bg-customsalmon rounded-lg items-center justify-center'><Twitter/></TouchableOpacity>
                <TouchableOpacity className='w-[40px] h-[40px] bg-customsalmon rounded-lg items-center justify-center'><Instagram/></TouchableOpacity>
                <TouchableOpacity className='w-[40px] h-[40px] bg-customsalmon rounded-lg items-center justify-center'><Linkedin/></TouchableOpacity>
            </View>
        </View>
        <View>
            {
                !loggedIn ? <>
                <TouchableOpacity onPress={()=>router('register')} className='py-4 w-[100%] border-b-[1px] border-customsalmon'><Text className='text-lg text-[#A9A9A9]'>Register</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>router('login')} className='py-4 w-[100%] border-b-[1px] border-customsalmon'><Text className='text-lg text-[#A9A9A9]'>Sign In</Text></TouchableOpacity>
                </>
                :
                <>
                <TouchableOpacity onPress={()=>router('settings')} className='py-4 w-[100%] border-b-[1px] border-customsalmon'><Text className='text-lg text-[#A9A9A9]'>Settings</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>router('order')} className='py-4 w-[100%] border-b-[1px] border-customsalmon'><Text className='text-lg text-[#A9A9A9]'>Orders</Text></TouchableOpacity>
                </>
            }
        </View>
        <View>
            {loggedIn && <TouchableOpacity className='w-[100%]'><Text className='text-lg text-[#A9A9A9]'>Sign Out</Text></TouchableOpacity>}
        </View>
    </View>
     
  )
}

export default Menu