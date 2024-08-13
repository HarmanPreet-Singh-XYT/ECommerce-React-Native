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
import ConfirmationDialog from '../Dialogs/ConfirmationDialog'
import { reviewCreateHandler, reviewDeleteHandler, reviewEditHandler } from '../../api/reviews'
import InfoDialog from '../Dialogs/InfoDialog'
import Loading from '../Dialogs/Loading'
import WriteReview from '../Dialogs/WriteReview'
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
    const [VariableSetup, setVariableSetup] = useState(false);
    const dataVar = useRef<Product>(defaultData);
    const [selectedReview, setselectedReview] = useState<null|Review>(null)
    const data = dataVar.current;
    const [selectedColor, setSelectedColor] = useState<ProductColor>({colorid:0,colorname:'Default',colorclass:'col_default'});
    const [selectedSize, setSelectedSize] = useState<ProductSize>({sizeid:0,sizename:'Default',instock:true});
    const [selectedImage, setselectedImage] = useState({imgLink:'',imgAlt:''});
    const [quantity, setQuantity] = useState<number>(1);
    const [dataChecked, setdataChecked] = useState<boolean>(false);
    const [loading, setloading] = useState<boolean>(false);
    const [processLoading, setprocessLoading] = useState(false);
    const [dialogType, setdialogType] = useState<null|string>(null)
    const dispatch = useAppDispatch();
    const [InfoType, setInfoType] = useState<null|string>(null);
    const [stars, setstars] = useState(5);
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
        setVariableSetup(true);
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
    async function delReviewPopup(){
      dialogType!==null;
      deleteForm();
    }
    function cancelPopup(){
      setdialogType(null);
  }
  async function deleteForm(){
      setprocessLoading(true);
      if(selectedReview != null){
          const response = await reviewDeleteHandler({reviewID:selectedReview.reviewid,userID:defaultAccount.userID,productID:route.params.productID})
          switch (response.status) {
              case 200:
                  setdialogType(null);
                  setprocessLoading(false);
                  setInfoType('deleted');
                  break;
              case 205:
                  setdialogType(null);
                  setprocessLoading(false);
                  setInfoType('notExists');
                  break;
              case 500:
                  setdialogType(null);
                  setprocessLoading(false);
                  setInfoType('error');
                  break;
          }
      }else{
          setprocessLoading(false);
          setInfoType('error');
      }
  }
  async function toggleInfo(){
      setInfoType(null);
  };
  async function createForm({title,description}:{title:string,description:string}){
    setprocessLoading(true);
    if(stars<1) {
      setInfoType('star');
        return;
    }
    const values = {
        title:title,
        description:description,
    }
    const response = await reviewCreateHandler({userID:defaultAccount.userID,productID:route.params.productID,rating:stars,title:values.title,comment:values.description})
    switch (response.status) {
        case 200:
            setdialogType(null);
            setprocessLoading(false);
            setInfoType('successful');
            break;
        case 205:
            setdialogType(null);
            setprocessLoading(false);
            setInfoType('exists');
            break;
        case 210:
            setdialogType(null);
            setprocessLoading(false);
            setInfoType('noOrder');
            break;
        case 500:
            setdialogType(null);
            setprocessLoading(false);
            setInfoType('error');
            break;
    }
  };
  async function editForm({title,description}:{title:string,description:string}){
    setloading(true);
    const values = {
        title:title,
        description:description,
    }
    if(selectedReview != null){
        const response = await reviewEditHandler({reviewID:selectedReview.reviewid, userID:defaultAccount.userID, productID:route.params.productID, rating:stars, title:values.title, comment:values.description})
        switch (response.status) {
            case 200:
                setdialogType(null);
                setloading(false);
                setInfoType('successful');
                break;
            case 205:
                setdialogType(null);
                setloading(false);
                setInfoType('notExists');
                break;
            case 500:
                setdialogType(null);
                setloading(false);
                setInfoType('error');
                break;
        }
    }else{
        setdialogType(null);
        setloading(false);
        setInfoType('error');
    }
    
  }
  return (
    <View className='bg-white h-[100%] w-[100%] border-t-[1px] border-customsalmon'>
      {dialogType==='writeReview' && <WriteReview selectedReview={selectedReview} setstars={setstars} stars={stars} title='Write a Review' message='Share your Thoughts' btn1='Cancel' btn2='Submit' btn1Func={cancelPopup} btn2Func={createForm}/>}
      {dialogType==='editReview' && <WriteReview isEdit={true} selectedReview={selectedReview} setstars={setstars} stars={stars} title='Edit your Review' message='Share your Thoughts' btn1='Cancel' btn2='Submit' btn1Func={cancelPopup} btn2Func={editForm}/>}
      {(processLoading || loading) && <Loading/>}
      {dialogType==='deletePopup' && <ConfirmationDialog title='Confirmation' message='Are you sure, you want to delete the Review?' btn1='Cancel' btn2='Delete' btn1Func={cancelPopup} btn2Func={delReviewPopup}/>}
      {InfoType==='error' && <InfoDialog title='Server Error' message='We are currently facing downtime, please try again lator.' btn='Close' btnFunc={toggleInfo}/>}
      {InfoType==='notExists' && <InfoDialog title='Does not exist' message='The selected review cannot be deleted as it does not exist.' btn='Close' btnFunc={toggleInfo}/>}
      {InfoType==='deleted' && <InfoDialog title='Successful' message='The review has been succesfully deleted, you may see update in few minutes.' btn='Close' btnFunc={toggleInfo}/>}
      {InfoType==='exists' && <InfoDialog title='Already exists' message='You have already reviewed this product, please edit or delete previous review before submitting new one.' btn='Close' btnFunc={toggleInfo}/>}
      {InfoType==='noOrder' && <InfoDialog title='Purchase product' message='Please purchase product before reviewing.' btn='Close' btnFunc={toggleInfo}/>}
      {InfoType==='successful' && <InfoDialog title='Successful' message='Succesfully Completed the action, you may see update in few minutes.' btn='Close' btnFunc={toggleInfo}/>}
      {InfoType==='star' && <InfoDialog title='Rating' message='Rating below 1 star is not allowed' btn='Close' btnFunc={toggleInfo}/>}
      <ScrollView className='w-[100%] h-[100%]'>
        {(dataChecked && data!=undefined && VariableSetup && !loading) && <>
        <View className='flex-row gap-2 w-[90%] mx-auto my-4'>
          <Text className='text-black font-bold'>{data.categories.maincategory}</Text>
          <Text className='text-black font-bold'>{'>'}</Text>
          <Text className='text-black font-bold'>{data.categories.subcategory}</Text>
        </View>
        <ImageSec data={data.imgcollection} mainImage={{imgalt:selectedImage.imgAlt,imglink:selectedImage.imgLink}} setSelectedImage={setselectedImage}/>
        <DetailPanel data={data} itemStateUpdate={itemStateUpdate} quantity={quantity} actionFunc={changeValue} handleRef={handleClick} selectedColor={selectedColor} selectedSize={selectedSize} setSelectedColor={setSelectedColor} setSelectedSize={setSelectedSize} btnLoading={btnLoading}/>
        <View ref={ref}>
          <ReviewsSec setdialogType={setdialogType} setselectedReview={setselectedReview} data={data.reviews} reviewCount={data.reviewcount} productID={data.productid}/>
        </View>
        </>}
      </ScrollView>
      <BottomBar/>
    </View>
  )
}

export default Product