import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { SetStateAction } from 'react'
import { Cart, Globe, Heart, Minus, Plus, Return, Rupee } from '../NativeSVG'
import Rating from '../Stars'
import { useApp } from '../../helpers/AccountDialog';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
// Interface for individual reviews
interface Review {
    reviewid: number;
    userid: number;
    rating: number;
    title:string;
    comment: string;
    username: string;
    createdat: string;
    productstars:number;
  }
  
  // Interface for images in imgcollection
  interface ProductImage {
    imageid: number;
    imglink: string;
    imgalt: string;
  }
  
  // Interface for sizes
  interface ProductSize {
    sizeid: number;
    sizename: string;
    instock: boolean;
  }
  
  // Interface for colors
  interface ProductColor {
    colorid: number;
    colorname: string;
    colorclass: string;
  }
  
  // Interface for categories
  interface Categories {
    subcategory: string;
    maincategory: string;
  }
  
  // Main interface for the product
  interface Product {
    productid:number,
    title: string;
    description: string;
    stock: number;
    discountedprice: string;
    price: string;
    stars: number;
    seller: string;
    reviewcount: number;
    categories: Categories;
    imglink: string;
    imgalt: string;
    imgcollection: ProductImage[] | [];
    colors: ProductColor[] | [];
    sizes: ProductSize[] | [];
    reviews: Review[] | [];
  };
const DetailPanel = ({data,quantity,actionFunc,handleRef,selectedColor,selectedSize,setSelectedColor,setSelectedSize,btnLoading,itemStateUpdate}:{itemStateUpdate:(action:string)=>void,data:Product,quantity:number,actionFunc:(action:string)=>void,handleRef:any,selectedColor:ProductColor,selectedSize:ProductSize,setSelectedColor:React.Dispatch<SetStateAction<ProductColor>>,setSelectedSize:React.Dispatch<SetStateAction<ProductSize>>,btnLoading:boolean}) => {
    const {appState} = useApp();
    const loggedIn = appState.loggedIn;
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    function percentageDifference(a:number, b:number) {
        const difference = Math.abs(a - b);
        const average = (a + b) / 2;
        const percentageDiff = (difference / average) * 100;
        return Math.round(percentageDiff);
    }
    function getDateAfterDays(days: number): string {
        const now = new Date();
        now.setDate(now.getDate() + days);
    
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(now);
        const day = parts.find(part => part.type === 'day')?.value ?? '';
        const month = parts.find(part => part.type === 'month')?.value ?? '';
    
        return `${day} ${month}`;
    };
  return (
    <View className='w-[90%] mx-auto border-[1px] border-customsalmon rounded-2xl mt-10'>
        <View className='my-4 w-[90%] mx-auto mt-6'>
            <View className='w-[100%] mx-auto border-b-[1px] border-customsalmon mb-6'>
                <Text className='text-xl text-black font-bold'>{data.title}</Text>
                <Text className='text-[#A9A9A9]'>By {data.seller}</Text>
                <View className='flex-row items-center mb-4'>
                    <Text className='text-black font-medium mr-2'>{data.stars}</Text>
                    <Rating rating={data.stars} size={20} starType={1} count={5}/>
                    <TouchableOpacity><Text className='text-customsalmon font-medium ml-2'>{data.reviewcount} Reviews</Text></TouchableOpacity>
                </View>
            </View>
            <View className='flex-row items-center gap-6'>
                <Text className='text-2xl text-black font-bold'>${data.discountedprice}</Text>
                <Text className='font-medium text-black text-xl line-through'>${data.price}</Text>
                <Text className='text-customsalmon text-md'>{percentageDifference(parseFloat(data.price),parseFloat(data.discountedprice))}% off</Text>
            </View>
            <View className='flex-row items-center my-2'>
                <Text className='font-bold text-black text-md'>{data.stock>0 ? 'In stock: ' : 'Out of Stock'}</Text>
                <Text className='text-black'>Dispatch in 5 working days</Text>
            </View>
            <View className='flex-row my-2'>
                <Text className='font-bold text-black text-md mr-14'>Quantity</Text>
                <View className='flex-row items-center'>
                    <TouchableOpacity onPress={()=>actionFunc('decrease')} className='border-[1px] border-customsalmon rounded-l-lg px-4 py-2.5'><Minus/></TouchableOpacity>
                    <View className='items-center px-4 border-y-[1px] border-customsalmon'>
                    <Text className='text-xl text-customsalmon'>{quantity}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>actionFunc('increase')} className='border-[1px] border-customsalmon px-5 rounded-r-lg py-1'><Plus/></TouchableOpacity>
                </View>
            </View>
            <View className='my-2'>
                <Text className='font-bold text-black text-md mb-1'>Color</Text>
                <View className='flex-row gap-4'>
                    {data.colors.map((each)=>
                    <TouchableOpacity onPress={()=>setSelectedColor(each)} style={{borderWidth:selectedColor.colorid===each.colorid ? 3 : 1}} key={each.colorid} className={`${each.colorclass} w-[50px] h-[50px] rounded-full border-customsalmon`}></TouchableOpacity>
                    )}
                </View>
            </View>
            <View className='my-2'>
                <Text className='font-bold text-black text-md mb-1'>Size</Text>
                <View className='flex-row gap-4 flex-wrap'>
                    {data.sizes.map((each)=>
                    <TouchableOpacity onPress={()=>setSelectedSize(each)} style={{borderWidth:each.sizeid===selectedSize.sizeid ? 2 : 1}} key={each.sizeid} className=' border-customsalmon rounded-xl'>
                        <Text className='text-black font-bold mx-4 my-2'>{each.sizename}</Text>
                    </TouchableOpacity>
                    )}
                </View>
            </View>
            <View className='flex-row justify-between my-6'>
                <TouchableOpacity disabled={btnLoading} onPress={()=>itemStateUpdate('cart')} className='w-[45%] h-[45px] bg-customsalmon items-center justify-center rounded-2xl'><Text className='font-bold text-white text-md'>{btnLoading ? <ActivityIndicator size={32} color={'white'}/> : 'ADD TO CART'}</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{loggedIn ? navigation.navigate('Checkout',{productID:data.productid,colorID:selectedColor.colorid,sizeID:selectedSize.sizeid}) : navigation.navigate('Signin')}} className='w-[45%] h-[45px] bg-white border-[2px] border-customsalmon items-center justify-center rounded-2xl'><Text className='font-bold text-customsalmon text-md'>BUY NOW</Text></TouchableOpacity>
            </View>
            <View className='flex-row justify-between pb-6 border-b-[1px] border-customsalmon'>
                <TouchableOpacity onPress={()=>itemStateUpdate('wishlist')} disabled={btnLoading} className='flex-row items-center'>
                    {btnLoading && <ActivityIndicator size={32} color={'salmon'}/>}
                    {!btnLoading && <><Heart/>
                    <Text className='text-customsalmon ml-2 font-medium'>Add to Wishlist</Text></>}
                </TouchableOpacity>
                <TouchableOpacity className='flex-row items-center'>
                    <><Globe/>
                    <Text className='text-customsalmon ml-2 font-medium'>Find Alternate Product</Text></>
                </TouchableOpacity>
            </View>
            <View className='my-2 py-6 border-b-[1px] border-customsalmon flex-row flex-wrap justify-between'>
                <View className='mb-4 flex-row items-center gap-2'><View className='bg-customsalmon rounded-full px-2 py-2'><Cart/></View><Text className='text-black font-medium w-[120px]'>Get it by Thu, {getDateAfterDays(10)}</Text></View>
                <View className='mb-4 flex-row items-center gap-2'><View className='bg-customsalmon rounded-full px-2 py-2'><Return/></View><Text className='text-black font-medium w-[120px]'>Easy Returns Available</Text></View>
                <View className='flex-row items-center gap-2'><View className='bg-customsalmon rounded-full px-2 py-2'><Rupee/></View><Text className='text-black font-medium w-[120px]'>Cash on Delivery Available</Text></View>
            </View>
            <View className='mt-2 mb-4'>
                <Text className='text-black font-bold text-md'>Description</Text>
                <Text className='text-black mt-1'>{data.description}</Text>
            </View>
        </View>
    </View>
  )
}

export default DetailPanel