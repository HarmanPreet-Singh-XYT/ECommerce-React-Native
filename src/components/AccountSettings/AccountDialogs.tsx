import { View, Text } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userAddressAddHandler, userAddressDefaultHandler, userAddressDeleteHandler, userAddressUpdateHandler, userUpdateHandler } from '../../api/userUpdate';
import { addAddress, removeAddress, setAddress, setDefaultAccount } from '../../controllers/UserAccount';
import InfoDialog from '../Dialogs/InfoDialog';
import Loading from '../Dialogs/Loading';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import SettingParameter from '../Dialogs/SettingParameter';
import React, { useState } from 'react'
import AddressDialog from '../Dialogs/AddressDialog';
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
const AccountDialogs = ({selectedAddress,setdialogType,dialogType,loading,setLoading}:{dialogType:string|null,setdialogType:React.Dispatch<React.SetStateAction<null|string>>,selectedAddress:Address,loading:boolean,setLoading:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const defaultAccount = useAppSelector((state) => state.userState.defaultAccount);
    const [processLoading, setprocessLoading] = useState(false);
    const addresses = useAppSelector((state) => state.userState.addresses);
    const [InfoType, setInfoType] = useState<string|null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [addressType, setaddressType] = useState<'HOME'|'WORK'>('HOME');
    const dispatch = useAppDispatch();
    
    async function toggleInfo(){
    setInfoType(null);
    };
    function deleteExecute(){
            setdialogType(null);
            deleteAddress(defaultAccount.userID,selectedAddress.addressID);
    };
    function cancelPopup(){
        setdialogType(null);
    };
    async function deleteAddress(userID:number,addressID:number){
        setLoading(true);
        await userAddressDeleteHandler(addressID,userID).then((res)=>res.status===200 ? dispatch(removeAddress(addressID)) : setdialogType('defaultAddressError'));
        setLoading(false);
        setInfoType('deleted');
    };
    async function formSubmitProfile({parameter}:{parameter:string}){
        const Dialog = dialogType;
        const userID = defaultAccount.userID;
        setdialogType(null);
        setLoading(true);
        const updateValue = parameter;
        switch (Dialog) {
            case 'name':
                await userUpdateHandler({ userID,userName:updateValue, email:false, mobile_number:false, dob:false,password:false }).then((res)=>
                    res.status===200 && dispatch(setDefaultAccount({ 
                        ...defaultAccount, 
                        userID, 
                        userName: updateValue 
                    })))
                setLoading(false);
                break;
            case 'date of birth':
                await userUpdateHandler({ userID,userName:false, email:false, mobile_number:false, dob:selectedDate,password:false  }).then((res)=>
                    res.status===200 && dispatch(setDefaultAccount({ 
                        ...defaultAccount, 
                        userID, 
                        dob: selectedDate 
                    })));
                setLoading(false);
                break;
            case 'email':
                await userUpdateHandler({ userID,userName:false, email:updateValue, mobile_number:false, dob:false,password:false  }).then((res)=>
                    res.status===200 && dispatch(setDefaultAccount({ 
                        ...defaultAccount, 
                        userID, 
                        email: updateValue 
                    })))
                setLoading(false);
                break;
            case 'number':
                await userUpdateHandler({ userID,userName:false, email:false, mobile_number:parseInt(updateValue), dob:false,password:false  }).then((res)=>
                    res.status===200 && dispatch(setDefaultAccount({ 
                        ...defaultAccount, 
                        userID, 
                        mobile_number: parseInt(updateValue)
                    })))
                setLoading(false);
                break;
            case 'password':
                await userUpdateHandler({ userID,userName:false, email:false, mobile_number:false, dob:false,password:updateValue  })
                setLoading(false);
                break;
            default:
                setdialogType('defaultAddressError');
                break;
        }
    }
    async function formSubmitAddress({name,number,address1,address2,city,state,country,postalCode}:params){
        const Dialog = dialogType;
        const userID = defaultAccount.userID;
        const addressID = selectedAddress.addressID;
        setdialogType(null);
        setLoading(true);
        const data = {
            addressType,
            contactNumber:parseInt(number),
            addressLine1:address1,
            addressLine2:address2,
            city:city,
            state:state,
            country:country,
            postalCode:postalCode,
            userName:name,
        }
        switch (Dialog) {
            case 'address':
                addressID != undefined && await userAddressUpdateHandler(data,userID,addressID).then((res)=>{
                    if(res.status===200){
                        dispatch(setAddress(addresses.map((each) => {
                            return each.addressID === addressID ? { ...data, addressID,is_default:false } : each;
                        })));
                    }
                })
                setLoading(false);
                break;
            case 'newaddress':
                await userAddressAddHandler(data,userID).then((res)=>{
                    if(res.status===200){
                        const newAddress = addresses.length===0 ? { ...data, addressID: res.addressID, is_default:true } : { ...data, addressID: res.addressID, is_default:false };
                        dispatch(addAddress(newAddress));
                    }
                })
                setLoading(false);
                break;
            default:
                setdialogType('defaultAddressError');
                break;
        }
    }
  return (
    <>
    {(processLoading||loading) && <Loading/>}
    {dialogType==='newaddress' && <AddressDialog selectedAddress={selectedAddress} dialogType={dialogType} setaddressType={setaddressType} addressType={addressType} title='Add New Address' message='Note: updating Profile will not affect existing orders.' btn1='Cancel' btn2='Update' btn1Func={cancelPopup} btn2Func={formSubmitAddress}/>}
    {dialogType==='address' && <AddressDialog selectedAddress={selectedAddress} dialogType={dialogType} setaddressType={setaddressType} addressType={addressType} title='Add New Address' message='Note: updating Profile will not affect existing orders.' btn1='Cancel' btn2='Update' btn1Func={cancelPopup} btn2Func={formSubmitAddress}/>}
    {dialogType==='deleteaddress' && <ConfirmationDialog title='Confirmation' message='Are you sure, you want to delete the Address?' btn1='Cancel' btn2='Delete' btn1Func={cancelPopup} btn2Func={deleteExecute}/>}
    {dialogType==='name' && <SettingParameter selectedDate={selectedDate} setSelectedDate={setSelectedDate} dialogType={dialogType} title='Update Name' placeholder='Name' message='Note: updating Profile will not affect existing orders.' btn1='Cancel' btn2='Update' parameterMessage='Please Enter New Name' btn1Func={cancelPopup} btn2Func={formSubmitProfile}/>}
    {dialogType==='date of birth' && <SettingParameter selectedDate={selectedDate} setSelectedDate={setSelectedDate} dialogType={dialogType} title='Update Date of Birth' placeholder='Date of Birth' message='Note: updating Profile will not affect existing orders.' btn1='Cancel' btn2='Update' parameterMessage='Please Enter New Date of Birth' btn1Func={cancelPopup} btn2Func={formSubmitProfile}/>}
    {dialogType==='email' && <SettingParameter selectedDate={selectedDate} setSelectedDate={setSelectedDate} dialogType={dialogType} title='Update Email' placeholder='Email' message='Note: updating Profile will not affect existing orders.' btn1='Cancel' btn2='Update' parameterMessage='Please Enter New Email' btn1Func={cancelPopup} btn2Func={formSubmitProfile}/>}
    {dialogType==='number' && <SettingParameter selectedDate={selectedDate} setSelectedDate={setSelectedDate} dialogType={dialogType} title='Update Mobile Number' placeholder='Mobile Number' message='Note: updating Profile will not affect existing orders.' btn1='Cancel' btn2='Update' parameterMessage='Please Enter New Mobile Number' btn1Func={cancelPopup} btn2Func={formSubmitProfile}/>}
    {dialogType==='password' && <SettingParameter selectedDate={selectedDate} setSelectedDate={setSelectedDate} dialogType={dialogType} title='Update Password' placeholder='Password' message='Note: updating Profile will not affect existing orders.' btn1='Cancel' btn2='Update' parameterMessage='Please Enter New Password' btn1Func={cancelPopup} btn2Func={formSubmitProfile}/>}
    {InfoType==='error' && <InfoDialog title='Server Error' message='We are currently facing downtime, please try again lator.' btn='Close' btnFunc={toggleInfo}/>}
    {InfoType==='notExists' && <InfoDialog title='Does not exist' message='The selected address cannot be deleted as it does not exist.' btn='Close' btnFunc={toggleInfo}/>}
    {InfoType==='deleted' && <InfoDialog title='Successful' message='The address has been succesfully deleted.' btn='Close' btnFunc={toggleInfo}/>}
    </>
  )
}

export default AccountDialogs