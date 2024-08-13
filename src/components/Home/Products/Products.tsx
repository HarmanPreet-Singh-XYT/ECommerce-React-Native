import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Rating from '../../Stars';
import { homeProductsDataHandler } from '../../../api/homeData';
interface Color {
  colorid:number;
  name: string;
  colorname: string;
  colorclass: string;
}

interface Size {
  sizeid:number;
  name: string;
  sizename:string;
  instock: boolean;
}
interface ProductImage {
  imageid: number;
  imglink: string;
  imgalt: string;
}

// Interface for products
interface Product {
  productid: number;
  title: string;
  category: string;
  maincategory:string;
  price: string;
  discount: string;
  stars: number;
  isnew: boolean;
  issale: boolean;
  isdiscount: boolean;
  colors: Color[]; // assuming colors is an array of strings
  sizes: Size[];  // assuming sizes is an array of strings
  reviewCount: number;
  images: ProductImage;
}
const Products = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dataChecked = useRef(false);
  const products = useRef<Product[]>([]);
  const [loading, setloading] = useState(true);
  async function sync(){
    const res = await homeProductsDataHandler();
        switch (res.status) {
        case 200:
            products.current = res.data.data;
            dataChecked.current = true;
            setloading(false);
            break;
        default:
          dataChecked.current = true;
          setloading(false);
          break;
    }
  }
  useLayoutEffect(() => {
    sync();
  }, [])
  return (
    <>
      <View className='border-b-[1px] border-customsalmon w-[75%] mx-auto py-2 my-3 text-center'>
          <Text className='mx-auto text-black font-bold text-[22px]'>Products</Text>
      </View>
      <View className='mx-auto w-[90%] h-auto flex-wrap flex-row justify-between'>
        {loading && <View className='w-[100%] items-center'><ActivityIndicator size={96} color={'salmon'}/></View>}
        {!loading && products.current.map((each,index)=><TouchableOpacity key={each.productid} onPress={()=>navigation.navigate('Product',{productID:each.productid})} className='h-[300px] w-[180px] border-[1px] border-customsalmon rounded-2xl mb-6'>
          <Image source={{uri:each.images.imglink}} alt={each.images.imgalt} className='max-w-[100%] my-2 w-[90%] mx-auto h-[180px] max-h-[250px]'/>
          <View className='mx-auto w-[95%] justify-between h-[100px]'>
            <View>
              <Text className='text-customsalmon'>{each.category}</Text>
              <Text className=' text-black font-medium'>{each.title}</Text>
              <View className='h-[auto] w-[100px] flex-row items-center justify-evenly'><Rating rating={each.stars} size={12}/><Text className='text-customsalmon'>{each.reviewCount}</Text></View>
            </View>
            <View className='flex-row items-center gap-5'>
              <Text className='text-black text-lg font-bold'>${each.discount}</Text>
              <Text className='line-through text-black text-sm font-medium'>${each.price}</Text>
            </View>
          </View>
        </TouchableOpacity>)}
      </View>
    </>
  )
}

export default Products