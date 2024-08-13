import { View, Text, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import BottomBar from '../BottomBar'
import { orderDetailHandler } from '../../api/orders';
import formatDate from '../../api/dateConvert'
import Loading from '../Dialogs/Loading';
interface Address {
  username: string;
  contactnumber: string;
  addressline1: string;
  addressline2: string;
  city: string;
  state: string;
  country: string;
  postalcode: string;
}

// Main interface for the order
interface Order {
  orderid: number;
  createdat: string;
  deliveredat: string;
  orderstatus: string;
  paymentstatus: string;
  paymentmethod: string;
  username: string;
  email: string;
  mobile_number: string;
  title: string;
  discount: string;
  price:string;
  shippingcost: string;
  quantity: number;
  imglink: string;
  imgalt: string;
  billingaddress: Address;
  addressid: number;
  colorid: number | null;
  sizeid: number | null;
  productid: number;
  order_code: string;
  totalamount: string;
  shippingaddress: Address;
  colorname: string | null;
  sizename: string | null;
}
const emptyOrder: Order = {
  orderid: 0,
  createdat: "",
  deliveredat: "",
  orderstatus: "",
  paymentstatus: "",
  paymentmethod: "",
  username: "",
  email: "",
  mobile_number: "",
  title: "",
  discount: "0.00",
  price:"0.00",
  shippingcost: "0.00",
  quantity: 0,
  imglink: "https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg",
  imgalt: "",
  billingaddress: {
      username: "",
      contactnumber: "",
      addressline1: "",
      addressline2: "",
      city: "",
      state: "",
      country: "",
      postalcode: ""
  },
  addressid: 0,
  colorid: null,
  sizeid: null,
  productid: 0,
  order_code: "",
  totalamount: "0.00",
  shippingaddress: {
      username: "",
      contactnumber: "",
      addressline1: "",
      addressline2: "",
      city: "",
      state: "",
      country: "",
      postalcode: ""
  },
  colorname: null,
  sizename: null
};
const OrderSummary = ({navigation,route}:{navigation:any,route:any}) => {
    const dataVar = useRef<Order>(emptyOrder);
    const data = dataVar.current
    const [loading, setloading] = useState(true);
    const found = useRef<boolean>(false)
    const dataChecked = useRef(false);
    const loggedIn = useRef(true);
    const paymentCharge = useRef(0);
    const shipping = parseFloat(data.shippingcost);
    const taxes = parseFloat(data.price) * 0.18 * data.quantity;
    const subTotalWithoutTax = (parseFloat(data.price) * 0.82) * data.quantity; // 100% - 18% tax
    const discount = (parseFloat(data.price) - parseFloat(data.discount)) * data.quantity;
    const totalAmount = subTotalWithoutTax - discount + shipping + taxes + paymentCharge.current; // Assuming paymentCharge is 0 for simplicity
    const formattedSubTotal = subTotalWithoutTax.toFixed(2);
    const formattedShipping = shipping.toFixed(2);
    const formattedTaxes = taxes.toFixed(2);
    const formattedDiscount = discount.toFixed(2);
    const formattedTotalAmount = totalAmount.toFixed(2);
    const params = { orderid: route.params.orderID }
    async function fetchData(){
      const response = await orderDetailHandler(params.orderid);
      switch (response.status) {
        case 200:
          if(response.data.data != undefined) {
            dataVar.current = response.data.data
            found.current = true;
            dataChecked.current = true;
            if(response.data.data.paymentmethod==='Payment on Delivery') paymentCharge.current=15;
            setloading(false);
          };
          break;
        case 404:
          dataChecked.current = true;
          setloading(false);
          break;
        case 500:
          loggedIn.current = false;
          setloading(false);
          break;
      }
    }
    useLayoutEffect(() => {
      fetchData();
    }, [])
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
        {loading && <Loading/>}
      <ScrollView className='w-[100%] h-[100%]'>
        <View className='w-[90%] self-center my-6'>
            <Text className='text-xl text-black font-bold'>Order Details</Text>
        </View>
        <View className='w-[90%] h-[225px] border-[1px] self-center rounded-xl border-customsalmon mb-4'>
            <View className='w-[90%] self-center h-[100%]'>
                <Text className='font-bold text-black text-lg my-2'>Order Info</Text>
                <View className='flex-row mt-2 justify-between mb-4'>
                    <View>
                        <Text className='text-customsalmon font-bold mb-1'>Order Date</Text>
                        <Text className='text-black font-medium'>{formatDate(data.createdat)}</Text>
                    </View>
                    <View>
                        <Text className='text-customsalmon font-bold mb-1'>Delivery Date</Text>
                        <Text className='text-black font-medium'>{formatDate(data.deliveredat)}</Text>
                    </View>
                </View>
                <View className='flex-row justify-between mb-4'>
                    <View>
                        <Text className='text-customsalmon font-bold mb-1'>Status</Text>
                        <Text className='text-black font-medium'>{data.orderstatus}</Text>
                    </View>
                    <View className='right-1'>
                        <Text className='text-customsalmon font-bold mb-1'>Payment Status</Text>
                        <Text className='text-black font-medium'>{data.paymentstatus}</Text>
                    </View>     
                 </View>
                 <View className='flex-row justify-between mb-4'>
                    <View>
                        <Text className='text-customsalmon font-bold mb-1'>Payment Method</Text>
                        <Text className='text-black font-medium'>{data.paymentmethod}</Text>
                    </View>
                    <View className='right-6'>
                        <Text className='text-customsalmon font-bold mb-1'>Order ID</Text>
                        <Text className='text-black font-medium'>#{data.order_code}{data.orderid}</Text>
                    </View>     
                 </View>
            </View>
        </View>
        <View className='w-[90%] h-[180px] border-[1px] self-center rounded-xl border-customsalmon mb-4'>
            <View className='w-[90%] self-center h-[100%]'>
                <Text className='font-bold text-black text-lg my-2'>Customer</Text>
                <View className='flex-row mt-2 justify-between mb-6'>
                    <View>
                        <Text className='text-customsalmon font-bold mb-1'>Name</Text>
                        <Text className='text-black font-medium'>{data.username}</Text>
                    </View>
                    <View>
                        <Text className='text-customsalmon font-bold mb-1'>Email</Text>
                        <Text className='text-black font-medium'>{data.email}</Text>
                    </View>
                </View>
                <View className='flex-row justify-between mb-4'>
                    <View>
                        <Text className='text-customsalmon font-bold mb-1'>Phone Number</Text>
                        <Text className='text-black font-medium'>+91 {data.mobile_number}</Text>
                    </View>   
                 </View>
            </View>
        </View>
        <View className='w-[90%] h-[250px] border-[1px] self-center rounded-xl border-customsalmon mb-4'>
            <View className='w-[90%] self-center h-[100%]'>
                <Text className='font-bold text-black text-lg my-2'>Address</Text>
                <View className='flex-row mt-2 mb-6'>
                    <View>
                        <Text className='text-customsalmon font-bold mb-1'>Shipping Address</Text>
                        <Text className='text-black font-medium'>{data.shippingaddress.addressline1}</Text>
                        <Text className='text-black font-medium'>{data.shippingaddress.addressline2}</Text>
                        <Text className='text-black font-medium'>{data.shippingaddress.city}, {data.shippingaddress.state}, {data.shippingaddress.country}, {data.shippingaddress.postalcode}</Text>
                    </View>
                </View>
                <View className='flex-row mb-4'>
                    <View>
                        <Text className='text-customsalmon font-bold mb-1'>Billing Address</Text>
                        <Text className='text-black font-medium'>{data.billingaddress.addressline1}</Text>
                        <Text className='text-black font-medium'>{data.billingaddress.addressline2}</Text>
                        <Text className='text-black font-medium'>{data.billingaddress.city}, {data.billingaddress.state}, {data.billingaddress.country}, {data.billingaddress.postalcode}</Text>
                    </View>   
                 </View>
            </View>
        </View>
        <View className='h-[125px] w-[90%] my-4 self-center border-[1px] p-2 flex-row border-customsalmon rounded-xl'>
            <View className='w-[35%] min-w-[120px] h-[100%] items-center justify-center p-1 rounded-xl border-[1px] border-customsalmon mr-2'>
                <Image source={{uri:data.imglink}} alt={data.imgalt} width={120} height={80}/>
            </View>
            <View className='w-[65%] justify-between'>
                <Text className='font-bold text-black'>{data.title}</Text>
                <View>
                    <View className='w-[40%] justify-between flex-row mb-1'>
                        <Text className='text-[12px] font-medium text-black'>Size:</Text>
                        <Text className='text-black text-[12px] left-1.5 font-bold'>{data.sizename}</Text>
                    </View>
                    <View className='w-[40%] justify-between flex-row mb-1'>
                        <Text className='text-[12px] font-medium text-black'>Color:</Text>
                        <Text className='text-black text-[12px] font-bold'>{data.colorname}</Text>
                    </View>
                    <View className='flex-row justify-between w-[95%] items-center'>
                        <View className='w-[50%] justify-between flex-row mb-1'>
                            <View className='flex-row w-[65%] justify-between'>
                                <Text className='font-medium text-black'>Quantity:</Text>
                                <Text className='text-black font-bold'>{data.quantity}</Text>
                            </View>
                        </View>
                        <Text className='text-lg font-bold text-black'>
                                ${data.discount}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
        <View className='border-[1px] my-4 rounded-xl items-center border-customsalmon w-[90%] self-center'>
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
                {paymentCharge.current > 0 &&
                <View className='py-3 w-[100%] items-center border-b-[1px] border-customsalmon'>
                    <View className='w-[90%] justify-between flex-row'>
                        <Text className='font-semibold text-lg text-black'>Payment Processing fee</Text>
                        <Text className='font-bold text-lg text-customsalmon'>${paymentCharge.current}</Text>
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
      </ScrollView>
      <BottomBar/>
    </View>
  )
}

export default OrderSummary