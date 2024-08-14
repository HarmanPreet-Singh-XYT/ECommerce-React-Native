import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, {  useState } from 'react'
import { AddressPlus, Bin, Pen, RightArrow } from '../NativeSVG'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userAddressDefaultHandler } from '../../api/userUpdate';
import { setAddress } from '../../controllers/UserAccount';
import AccountDialogs from './AccountDialogs';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
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
const AccountSettings = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [dialogType, setdialogType] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const defaultAccount = useAppSelector((state) => state.userState.defaultAccount)
    const addresses = useAppSelector((state) => state.userState.addresses);
    const dispatch = useAppDispatch();
    const [selectedAddress, setselectedAddress] = useState<Address>({
        addressID:0,
        addressType:'HOME',
        contactNumber:0,
        addressLine1:'',
        addressLine2:'',
        city:'',
        state:'',
        country:'',
        postalCode:'',
        userName:'',
        is_default:true
    });
    async function changeDefault(addressID:number,userID:number){
        setLoading(true);
        const response = await userAddressDefaultHandler(addressID,userID);
        switch (response.status) {
          case 200:
            dispatch(setAddress(addresses.map((each)=>each.addressID === addressID
            ? { ...each, is_default: true }
            : { ...each, is_default: false })))
            setLoading(false);
            break;
        
          default:
            setdialogType('defaultAddressError');
            setLoading(false);
            break;
        }
      };
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
        <AccountDialogs setdialogType={setdialogType} dialogType={dialogType} selectedAddress={selectedAddress} loading={loading} setLoading={setLoading}/>
        <ScrollView className='w-[100%] h-[100%]'>
            <View className='flex-row w-[90%] mx-auto mb-6 mt-4'>
                <Text className='text-black text-xl font-bold'>Basic Info</Text>
            </View>
            <View>
                <View className='w-[90%] mx-auto'>
                    <Text className='text-black font-bold'>Name</Text>
                    <View className='justify-between flex-row items-center'>
                        <TextInput readOnly value={defaultAccount.userName} textAlignVertical='center' className='w-[75%] font-bold px-6 h-[45px] text-white bg-[#FFBCB5] rounded-xl mt-2'/>
                        <TouchableOpacity onPress={()=>setdialogType('name')}><Pen/></TouchableOpacity>
                    </View>
                </View>
                <View className='w-[90%] mx-auto mt-6'>
                    <Text className='text-black font-bold'>Date of Birth</Text>
                    <View className='justify-between flex-row items-center'>
                        <TextInput readOnly value={defaultAccount.dob} textAlignVertical='center' className='w-[75%] font-bold px-6 h-[45px] text-white bg-[#FFBCB5] rounded-xl mt-2'/>
                        <TouchableOpacity onPress={()=>setdialogType('date of birth')}><Pen/></TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className='flex-row w-[90%] mx-auto mb-6 mt-6'>
                <Text className='text-black text-xl font-bold'>Account Info</Text>
            </View>
            <View>
                <View className='w-[90%] mx-auto'>
                    <Text className='text-black font-bold'>Email</Text>
                    <View className='justify-between flex-row items-center'>
                        <TextInput readOnly value={defaultAccount.email} textAlignVertical='center' className='w-[75%] font-bold px-6 h-[45px] text-white bg-[#FFBCB5] rounded-xl mt-2'/>
                        <TouchableOpacity onPress={()=>setdialogType('email')}><Pen/></TouchableOpacity>
                    </View>
                </View>
                <View className='w-[90%] mx-auto mt-6'>
                    <Text className='text-black font-bold'>Mobile Number</Text>
                    <View className='justify-between flex-row items-center'>
                        <TextInput readOnly value={defaultAccount.mobile_number.toString()} textAlignVertical='center' className='w-[75%] font-bold px-6 h-[45px] text-white bg-[#FFBCB5] rounded-xl mt-2'/>
                        <TouchableOpacity onPress={()=>setdialogType('number')}><Pen/></TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className='flex-row w-[90%] mx-auto mb-6 mt-6 justify-between items-center'>
                <Text className='text-black text-xl font-bold'>Manage Addresses</Text>
                <TouchableOpacity onPress={()=>setdialogType('newaddress')}><AddressPlus/></TouchableOpacity>
            </View>
            <View className='w-[90%] mx-auto'>
                {addresses.map((each)=>
                    <View key={each.addressID} className='w-[100%] min-h-[150px] border-customsalmon border-[1px] rounded-2xl py-2 px-2'>
                        <View className='justify-between flex-row items-center'>
                            <View className='bg-customsalmon w-[60px] rounded-lg'><Text className='px-1 py-1 text-white font-bold text-center'>{each.addressType}</Text></View>
                            <TouchableOpacity disabled={each.is_default} style={{backgroundColor:each.is_default ? 'salmon' : '#FFBCB5'}} onPress={()=>changeDefault(each.addressID,defaultAccount.userID)} className='w-[75px] rounded-lg'><Text className='px-1 py-1 text-white font-bold text-center'>Default</Text></TouchableOpacity>
                        </View>
                        <Text className='text-lg text-black font-bold'>{each.userName}</Text>
                        <View className='py-2'>
                            <Text className='text-black font-medium'>{each.addressLine1}</Text>
                            <Text className='text-black font-medium'>{each.addressLine2}, {each.city}</Text>
                            <Text className='text-black font-medium'>{each.state}, {each.country}</Text>
                        </View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-black'>Postal Code - <Text className='font-medium'>{each.postalCode}</Text></Text>
                            <View className='flex-row'>
                                <TouchableOpacity onPress={()=>{setdialogType('address');setselectedAddress(each)}} className='bg-customsalmon w-[75px] h-[25px] items-center justify-center rounded-l-xl'><Pen width={15} height={15} color='white'/></TouchableOpacity>
                                <TouchableOpacity onPress={()=>{setdialogType('deleteaddress');setselectedAddress(each)}} className='bg-white w-[75px] h-[25px] border-[1px] border-customsalmon items-center justify-center rounded-r-xl'><Bin/></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </View>
            <View className='flex-row w-[90%] mx-auto mb-4 mt-6'>
                <Text className='text-black text-xl font-bold'>Other Options</Text>
            </View>
            <View className='h-auto w-[90%] mx-auto border-customsalmon border-[1px] rounded-2xl mb-12'>
                <TouchableOpacity onPress={()=>navigation.navigate('GiftCards')} className='flex-row px-4 py-3 justify-between'>
                    <Text className='text-lg font-bold text-customsalmon'>Available Gift Cards</Text>
                    <RightArrow/>
                </TouchableOpacity>
                <View className='w-full h-[1px] bg-customsalmon'></View>
                <TouchableOpacity onPress={()=>navigation.navigate('Coupons')} className='flex-row px-4 py-3 justify-between'>
                    <Text className='text-lg font-bold text-customsalmon'>Available Coupons</Text>
                    <RightArrow/>
                </TouchableOpacity>
                <View className='w-full h-[1px] bg-customsalmon'></View>
                <TouchableOpacity onPress={()=>navigation.navigate('Wishlist')} className='flex-row px-4 py-3 justify-between'>
                    <Text className='text-lg font-bold text-customsalmon'>My Wishlist</Text>
                    <RightArrow/>
                </TouchableOpacity>
                <View className='w-full h-[1px] bg-customsalmon'></View>
                <TouchableOpacity onPress={()=>navigation.navigate('Support')} className='flex-row px-4 py-3 justify-between'>
                    <Text className='text-lg font-bold text-customsalmon'>Support</Text>
                    <RightArrow/>
                </TouchableOpacity>
            </View>
            <View className='flex-row w-[90%] mx-auto mb-4'>
                <TouchableOpacity onPress={()=>setdialogType('password')} className='bg-customsalmon w-[50%] justify-center rounded-l-xl'><Text className='text-white py-2 text-center font-bold text-lg'>Change Password</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('AppSettings')} className='bg-white border-customsalmon border-[1px] w-[50%] justify-center rounded-r-xl'><Text className='text-black py-2 text-center font-bold text-lg'>App Settings</Text></TouchableOpacity>
            </View>
        </ScrollView>
    </View>
  )
}

export default AccountSettings