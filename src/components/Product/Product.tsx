import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ImageSec from './ImageSec'
import DetailPanel from './DetailPanel'
import ReviewsSec from './ReviewsSec'
import BottomBar from '../BottomBar'
import { Route, useNavigation } from '@react-navigation/native'
import { cartAddHandler, wishlistAddHandler } from '../../api/itemLists'
import productDataHandler from '../../api/product'
import { addItemToCart, addItemToWishlist } from '../../controllers/CartWishlist'
import { useApp } from '../../helpers/AccountDialog'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
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
const defaultData = {
  productid:1,
  title: '',
  description: '',
  stock: 0,
  discountedprice: '',
  price: '',
  stars: 0,
  seller: '',
  reviewcount: 0,
  categories: {subcategory:'',maincategory:''},
  imglink: '',
  imgalt: '',
  imgcollection: [],
  colors: [],
  sizes: [],
  reviews: [],
};
interface Params {
  params:{productID:string};
}
const IDGenerator = ()=>{
  const ID = Math.round(Math.random() * 1000 * 1000 * 100);
  return ID;
}
const Product = ({navigation,route}:{navigation:any,route:any}) => {
    const { appState } = useApp();
    const isLogged = appState.loggedIn;
    const [btnLoading, setbtnLoading] = useState(false);
    const ref = useRef<any>(null);
    const colRef = useRef<string>('Default');
    const sizeRef = useRef<string>('Default');
    const totalQuantity = useRef<number>(1);
    const found = useRef<boolean>(true);
    const [selectedRating, setselectedRating] = useState<number>(1);
    const dataVar = useRef<Product>(defaultData);
    const [selectedReview, setselectedReview] = useState<null|Review>(null)
    const data = dataVar.current;
    const [selectedColor, setSelectedColor] = useState<ProductColor>({colorid:0,colorname:'Default',colorclass:'col_default'});
    const [selectedSize, setSelectedSize] = useState<ProductSize>({sizeid:0,sizename:'Default',instock:true});
    const [selectedImage, setselectedImage] = useState({imgLink:'',imgAlt:''});
    const [quantity, setQuantity] = useState<number>(1);
    const [dataChecked, setdataChecked] = useState<boolean>(false);
    const [loading, setloading] = useState<boolean>(false);
    const [dialogType, setdialogType] = useState<null|string>(null)
    const dispatch = useAppDispatch();
    const defaultAccount = useAppSelector((state) => state.userState.defaultAccount)
    const listID = {cartItemID:IDGenerator(),wishlistItemID:IDGenerator()};
    let cartItemData = {
      cartItemID:listID.cartItemID,
      productID:data.productid,
      productImg:data.imglink,
      productAlt:data.imgalt,
      productName:data.title,
      productPrice:parseInt(data.discountedprice),
      productColor:colRef.current,
      productSize:sizeRef.current,
      quantity: quantity,
    };
    let wishlistItem = {
      wishlistItemID:listID.wishlistItemID,
      productID:data.productid,
      productImg:data.imglink,
      productAlt:data.imgalt,
      productName:data.title,
      productPrice:parseInt(data.discountedprice),
    };
    async function dataRequest(){
      const response = await productDataHandler({productID:route.params.productID});
      
      switch (response.status) {
        case 200:
        dataVar.current = response.data.data;
        if(response.data.data != undefined) totalQuantity.current=response.data.data.stock;
        setdataChecked(true);
        break;
        case 500:
          found.current = false;
          setdataChecked(true);
          break;
        }
      }
    async function setUpData(){
      if(data != undefined){
        data.colors.length > 0 && setSelectedColor(data.colors[0]);
        data.sizes.length > 0 && setSelectedSize(data.sizes[0]);
        setselectedImage({imgLink:data.imglink,imgAlt:data.imgalt})
        if(data.sizes.length > 0 && data.colors.length > 0){
          cartItemData.productColor = data.colors[0].colorname;
          cartItemData.productSize = data.sizes[0].sizename;
        }
      }
    };
    async function dataInitializer(){
      !dataChecked && await dataRequest();
      dataChecked && await setUpData();
    }
    useEffect(() => {
      dataInitializer();
    }, [dataChecked])
    
    const changeValue = (action:string)=>{
      switch (action) {
        case 'increase':
          (totalQuantity.current > quantity && 9 > quantity) && setQuantity(quantity+1);
          break;
        case 'decrease':
          quantity>1 && setQuantity(quantity-1);
          break;
      }
    }
    const handleClick = () => {
      ref.current?.scrollIntoView({behavior: 'smooth'});
    };
    async function itemStateUpdate(key:string){
      setbtnLoading(true);
      switch (key) {
        case 'cart':
        isLogged && await cartAddHandler({cartItemID:listID.cartItemID,userID:defaultAccount.userID,productID:data.productid,productPrice:parseInt(data.discountedprice),colorID:selectedColor.colorid,sizeID:selectedSize.sizeid,quantity})
        dispatch(addItemToCart(cartItemData));
        setbtnLoading(false)
          break;
        case 'wishlist':
        isLogged && await wishlistAddHandler({wishlistItemID:listID.wishlistItemID,userID:defaultAccount.userID,productID:data.productid})
        dispatch(addItemToWishlist(wishlistItem));
        setbtnLoading(false);
          break;
      }
    }
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
      <ScrollView className='w-[100%] h-[100%]'>
      {loading && <ActivityIndicator style={{marginHorizontal:'auto'}} size={254} color={'salmon'}/>}
        {(dataChecked && data!=undefined) && <><View className='flex-row gap-2 w-[90%] mx-auto my-4'>
          <Text className='text-black font-bold'>{data.categories.maincategory}</Text>
          <Text className='text-black font-bold'>{'>'}</Text>
          <Text className='text-black font-bold'>{data.categories.subcategory}</Text>
        </View>
        <ImageSec data={data.imgcollection} mainImage={{imgalt:selectedImage.imgAlt,imglink:selectedImage.imgLink}} setSelectedImage={setselectedImage}/>
        <DetailPanel data={data} itemStateUpdate={itemStateUpdate} quantity={quantity} actionFunc={changeValue} handleRef={handleClick} selectedColor={selectedColor} selectedSize={selectedSize} setSelectedColor={setSelectedColor} setSelectedSize={setSelectedSize} btnLoading={btnLoading}/>
        <View ref={ref}>
          <ReviewsSec data={data.reviews} reviewCount={data.reviewcount} productID={data.productid}/>
        </View>
        </>}
      </ScrollView>
      <BottomBar/>
    </View>
  )
}

export default Product