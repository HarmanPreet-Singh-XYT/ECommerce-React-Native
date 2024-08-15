import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../hooks';
import { cartCashCheckoutHandler, checkoutCartProductDataHandler, paymentOnDeliveryHandler } from '../../api/paymentSystem';
import Rating from '../Stars';
import Loading from '../Dialogs/Loading';
import { StripeProvider } from '@stripe/stripe-react-native';
import CartStripeCheckout from './CartStripeCheckout';
import InfoDialog from '../Dialogs/InfoDialog';
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
interface ProductDetails {
    title: string;
    price: string;
    discount: string;
    sizename: string;
    colorname: string;
    imglink: string;
    imgalt: string;
    shippingcost: number;
    quantity:number;
}
const CartCheckout = ({navigation,route}:{navigation:any,route:any}) => {
    const Stripe_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY as string;
    const MERCHANT_ID = process.env.STRIPE_ID as string;
    const [DefaultAdd, setDefaultAdd] = useState(false);
    const defaultAccount = useAppSelector((state) => state.userState.defaultAccount);
    const addresses = useAppSelector((state) => state.userState.addresses);
    const [PaymentMethod, setPaymentMethod] = useState<'cash'|'card'>('card');
    const dataVar = useRef<ProductDetails[]>([]);
    const data = dataVar.current;
    const [paymentCharge, setPaymentCharge] = useState(0);
    const found = useRef(false);
    const [loading, setloading] = useState(true);
    const shipping = data.reduce((sum, item) => (sum + item.shippingcost)*item.quantity, 0);
    const taxes = data.reduce((sum, item) => sum + (parseFloat(item.price) * (18 / 100))*item.quantity, 0);
    const subTotal = data.reduce((sum, item) => sum + parseFloat(item.price)*item.quantity, 0);
    const subTotalWithoutTax = data.reduce((sum, item) => sum + (parseFloat(item.price)-(parseFloat(item.price)*18/100))*item.quantity, 0);
    const discount = data.reduce((sum, item) => sum + (parseFloat(item.price) - parseFloat(item.discount))*item.quantity, 0);
    const totalAmount = subTotal + paymentCharge - discount + shipping;

    const formattedSubTotal = subTotalWithoutTax.toFixed(2);
    const formattedShipping = shipping.toFixed(2);
    const formattedTaxes = taxes.toFixed(2);
    const formattedDiscount = discount.toFixed(2);
    const [dialogType, setdialogType] = useState<null|string>(null);
    const formattedTotalAmount = totalAmount.toFixed(2);
    const [DefaultAddress, setDefaultAddress] = useState<Address>({
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
    useEffect(()=>{
        if(addresses.length > 0){
            addresses.map((each)=>each.is_default && setDefaultAddress(each));
            addresses.map((each)=>each.is_default && setDefaultAdd(true));
        }else setdialogType('noAddress');
        sync();
    });
    async function dataRequest(){
        const response = await checkoutCartProductDataHandler(defaultAccount.userID);
        switch (response.status) {
            case 200:
            dataVar.current = response.data.products;
            found.current = true;
            break;
            case 500:
            navigation.navigate('Home');
            break;
        default:
            navigation.navigate('Home');
            break;
            }
    };
    async function sync(){
        await dataRequest();
        setloading(false);
    };
    async function createOrder(){
        setloading(true);
        const createOrder = await cartCashCheckoutHandler(defaultAccount.userID);
        switch (createOrder.status) {
            case 200:
                setloading(false);
                navigation.navigate('Confirmation',{orderID:createOrder.data.orderid,statusCode:200});
                break;
            default:
                navigation.navigate('Confirmation',{orderID:createOrder.data.orderid,statusCode:400});
                setloading(false);
                break;
        }
    }
    function redirectSettings(){
        navigation.navigate('AccountSettings');
    }
  return (
    
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
        {loading && <Loading/>}
        {!DefaultAdd && <InfoDialog title='No Address' message='We found no default address. Please add an address or set existing one default.' btn='Settings' btnFunc={redirectSettings}/>}
        {dialogType==='noAddress' && <InfoDialog title='No Address' message='We found no address. Please add an address to proceed with order.' btn='Settings' btnFunc={redirectSettings}/>}
      <ScrollView className='w-[100%] h-[100%]'>
        <View className='w-[90%] mx-auto mb-4 mt-4'>
            <Text className='text-black text-xl font-bold'>Delivery Details</Text>
        </View>
        <View className='w-[90%] mx-auto border-b-[1px] border-customsalmon pb-4'>
        <Text className='text-md font-bold text-black'>Your name</Text>
            <TextInput readOnly value={defaultAccount.userName} placeholder={`Enter your Name`} placeholderTextColor={'#FFBCB5'} textContentType='name' className='bg-customsalmon mt-1 font-bold text-white w-[100%] rounded-xl h-[40px] px-6 mx-auto'/>
            <Text className='text-md font-bold text-black mt-2'>your Email*</Text>
            <TextInput readOnly value={defaultAccount.email} inputMode='email' placeholder={`Enter your Email`} textContentType='emailAddress' placeholderTextColor={'#FFBCB5'} className='bg-customsalmon mt-1 font-bold text-white w-[100%] rounded-xl h-[40px] px-6 mx-auto'/>
            <Text className='text-md font-bold text-black mt-2'>Country*</Text>
            <TextInput readOnly value={DefaultAddress.country} placeholder={`Enter your Country`} placeholderTextColor={'#FFBCB5'} textContentType='countryName' className='bg-customsalmon mt-1 font-bold text-white w-[100%] rounded-xl h-[40px] px-6 mx-auto'/>
            <Text className='text-md font-bold text-black mt-2'>City*</Text>
            <TextInput readOnly value={DefaultAddress.city} placeholder={`Enter your City`} placeholderTextColor={'#FFBCB5'} className='bg-customsalmon mt-1 font-bold text-white w-[100%] rounded-xl h-[40px] px-6 mx-auto'/>
            <Text className='text-md font-bold text-black mt-2'>Phone Number*</Text>
            <View className='flex-row items-center h-[40px] mt-1'><TextInput readOnly value='+91' textAlignVertical='center' textAlign='center' className='font-bold text-white w-[15%] h-[40px] bg-[#FFBCB5] rounded-l-xl'/>
            <TextInput value={defaultAccount.mobile_number.toString()} placeholder={`Enter your Phone Number`} placeholderTextColor={'#FFBCB5'} inputMode='tel' textContentType='telephoneNumber' className='bg-customsalmon font-bold text-white w-[85%] rounded-r-xl h-[40px] px-6 mx-auto'/></View>
            <Text className='text-md font-bold text-black mt-2'>Pin Code</Text>
            <TextInput value={DefaultAddress.postalCode} readOnly placeholder={`Enter your Pin Code`} placeholderTextColor={'#FFBCB5'} inputMode='numeric' textContentType='postalCode' className='bg-customsalmon mt-1 font-bold text-white w-[100%] rounded-xl h-[40px] px-6 mx-auto'/>
            <Text className='text-md font-bold text-black mt-2'>Address 1</Text>
            <TextInput value={DefaultAddress.addressLine1} readOnly placeholder={`Enter your Address`} placeholderTextColor={'#FFBCB5'} textContentType='streetAddressLine1' className='bg-customsalmon mt-1 font-bold text-white w-[100%] rounded-xl h-[40px] px-6 mx-auto'/>
            <Text className='text-md font-bold text-black mt-2'>Address 2</Text>
            <TextInput value={DefaultAddress.addressLine2} readOnly placeholder={`Enter your Address`} inputMode='numeric' placeholderTextColor={'#FFBCB5'} textContentType='streetAddressLine2' className='bg-customsalmon mt-1 font-bold text-white w-[100%] rounded-xl h-[40px] px-6 mx-auto'/>
        </View>
        <View className='mb-4 mt-2'>
            <View className='w-[90%] mx-auto mb-4 mt-4'>
                <Text className='text-black text-xl font-bold'>Payment</Text>
            </View>
            <View className='w-[90%] mx-auto'>
                <TouchableOpacity onPress={()=>{setPaymentMethod('card');setPaymentCharge(0)}} className='bg-customsalmon rounded-xl h-[90px] w-[100%] mb-2 items-center flex-row px-6'>
                    <View className='w-[30px] h-[30px] items-center justify-center rounded-full bg-white border-[1px] border-customsalmon'>{PaymentMethod==='card' && <View className='bg-customsalmon w-[16px] h-[16px] rounded-full'></View>}</View>
                    <View className='ml-6'>
                        <Text className='font-bold text-lg text-white'>Online Payment</Text>
                        <Text className='font-bold text-[#FFBCB5]'>Pay with your Bank/Card</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setPaymentMethod('cash');setPaymentCharge(15)}} className='bg-customsalmon rounded-xl h-[90px] w-[100%] mb-2 items-center flex-row px-6'>
                    <View className='w-[30px] h-[30px] items-center justify-center rounded-full bg-white border-[1px] border-customsalmon'>{PaymentMethod==='cash' && <View className='bg-customsalmon w-[16px] h-[16px] rounded-full'></View>}</View>
                    <View className='ml-6'>
                        <Text className='font-bold text-lg text-white'>Payment on Delivery</Text>
                        <Text className='font-bold text-[#FFBCB5]'>+$15 Payment Processing fee</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        <View>
            <View className='w-[90%] mx-auto mb-4 mt-4'>
                <Text className='text-black text-xl font-bold'>Products</Text>
            </View>
        </View>
        {dataVar.current.map((each,index)=><View key={index} className='w-[90%] px-2 py-2 flex-row self-center border-[1px] items-center justify-between h-[150px] border-customsalmon rounded-xl mb-4'>
            <View className='border-[1px] border-customsalmon rounded-xl px-2 py-1'>
                <Image source={{uri:each.imglink}} alt={each.imgalt} width={120} height={120}/>
            </View>
            <View className='w-[60%] gap-1'>
                <Text className='text-customsalmon font-bold'>{each.title}</Text>
                <Text className='font-bold text-black'>Size: <Text className='font-medium text-customsalmon'>{each.sizename}</Text></Text>
                <Text className='font-bold text-black'>Color: <Text className='font-medium text-customsalmon'>{each.colorname}</Text></Text>
                <Text className='font-bold text-black'>Quantity: <Text className='font-medium text-customsalmon'>1</Text></Text>
                <View className='flex-row justify-between items-center'>
                    <Rating rating={5} size={16}/>
                    <Text className='font-bold line-through text-black'>${each.price}</Text>
                    <Text className='font-bold text-lg text-black'>${each.discount}</Text>
                </View>
            </View>
        </View>)}
        <View>
            <View className='mx-auto mb-4 mt-4'>
                <Text className='text-black text-center text-xl font-bold'>Summary</Text>
            </View>
            <View className='border-[1px] rounded-xl items-center border-customsalmon w-[90%] self-center'>
                <View className='py-3 w-[100%] items-center border-b-[1px] border-customsalmon'>
                    <View className='w-[90%] justify-between flex-row'>
                        <Text className='font-semibold text-lg text-black'>Subtotal</Text>
                        <Text className='font-bold text-lg text-customsalmon'>${formattedSubTotal}</Text>
                    </View>
                </View>
                <View className='py-3 w-[100%] items-center border-b-[1px] border-customsalmon'>
                    <View className='w-[90%] justify-between flex-row'>
                        <Text className='font-semibold text-lg text-black'>Shipping Charge</Text>
                        <Text className='font-bold text-lg text-customsalmon'>${formattedShipping}</Text>
                    </View>
                </View>
                {paymentCharge > 0 &&
                <View className='py-3 w-[100%] items-center border-b-[1px] border-customsalmon'>
                    <View className='w-[90%] justify-between flex-row'>
                        <Text className='font-semibold text-lg text-black'>Payment Processing fee</Text>
                        <Text className='font-bold text-lg text-customsalmon'>${paymentCharge}</Text>
                    </View>
                </View>
                }
                <View className='py-3 w-[100%] items-center border-b-[1px] border-customsalmon'>
                    <View className='w-[90%] justify-between flex-row'>
                        <Text className='font-semibold text-lg text-black'>Taxes</Text>
                        <Text className='font-bold text-lg text-customsalmon'>${formattedTaxes}</Text>
                    </View>
                </View>
                <View className='py-3 w-[100%] items-center border-b-[1px] border-customsalmon'>
                    <View className='w-[90%] justify-between flex-row'>
                        <Text className='font-semibold text-lg text-black'>Discount</Text>
                        <Text className='font-bold text-lg text-customsalmon'>${formattedDiscount}</Text>
                    </View>
                </View>
                <View className='py-3 w-[100%] items-center'>
                    <View className='w-[90%] justify-between flex-row'>
                        <Text className='font-bold text-xl text-black'>Total</Text>
                        <Text className='font-bold text-lg text-customsalmon'>${formattedTotalAmount}</Text>
                    </View>
                </View>
            </View>
        </View>
        {PaymentMethod==='card' && <View>
            {/* <View className='w-[90%] mb-4 mt-8 mx-auto'>
                <Text className='text-black text-xl font-bold'>Payment Through Card</Text>
            </View> */}
            <View>
            <StripeProvider
            publishableKey={Stripe_PUBLISHABLE_KEY}
            merchantIdentifier={MERCHANT_ID}
             >
                <CartStripeCheckout userID={defaultAccount.userID} customerName={defaultAccount.userName} email={defaultAccount.email} contactNumber={defaultAccount.mobile_number}/>
            </StripeProvider>
            </View>
        </View>}
        {PaymentMethod==='cash' &&
        <TouchableOpacity onPress={createOrder} className='w-[90%] self-center py-2 my-6 rounded-xl bg-customsalmon'><Text className='text-white text-center font-bold text-lg'>Order Now</Text></TouchableOpacity>}
      </ScrollView>
    </View>
  )
}

export default CartCheckout

