import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { BlurView } from "@react-native-community/blur";
import { Formik } from 'formik';
import StarRating from 'react-native-star-rating-widget';
import * as Yup from 'yup';
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
const WriteReview = ({title,message,btn1,btn2,message2,message3,btn1Func,btn2Func,stars,setstars,isEdit=false,selectedReview}:{title:string,message:string,btn1:string,btn2:string,message2?:string,message3?:string,btn1Func:()=>void,btn2Func:({title,description}:{title:string,description:string})=>void,stars:number,setstars:React.Dispatch<React.SetStateAction<number>>,isEdit?:boolean,selectedReview:Review|null}) => {
  function setStars(starsNum:number){
    (starsNum>=1) && setstars(starsNum)
  };
  const reviewValidationSchema = Yup.object({
    title: Yup.string()
      .min(2, 'Title must be at least 2 characters')
      .max(50, 'Title must be at most 50 characters')
      .required('Required'),
    description: Yup.string()
      .min(2, 'Description must be at least 2 characters')
      .max(500, 'Description must be at most 500 characters')
      .required('Required'),
  });
  return (
    <>
      <BlurView
        style={{position:'absolute',zIndex:1,width:'100%',height:'100%'}}
        blurType="light"
        blurAmount={4}
        reducedTransparencyFallbackColor="white"
      />
      <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,justifyContent:'center',alignItems:'center',zIndex:10}}>
      {!isEdit && <Formik validationSchema={reviewValidationSchema} initialValues={{title:'',description:'',}}
          onSubmit={values => {btn1Func();btn2Func(values)}}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }:{handleChange:any,handleBlur:any,handleSubmit:any,values:any,errors:any,touched:any}) => (
        <View className='bg-white border-[1px] border-customsalmon w-[90%] rounded-2xl h-auto py-4 items-center justify-evenly'>
          {touched.title && errors.title && <Text className='text-customsalmon text-center'>{errors.title}</Text>}
          {touched.description && errors.description && <Text className='text-customsalmon text-center'>{errors.description}</Text>}
          <View className='items-center mb-2 w-[90%] mx-auto'>
            <Text className='text-xl font-bold text-black mb-2'>{title}</Text>
            <Text className='text-lg font-semibold text-black'>{message}</Text>
            {message2 && <Text className='text-lg font-semibold text-black'>{message2}</Text>}
            {message3 && <Text className='text-lg font-semibold text-black'>{message3}</Text>}
          </View>
          <View className='w-[90%] gap-5'>
            <View className='flex-row items-center justify-between'>
              <Text className='font-bold text-black'>Stars</Text>
              <View className='w-[72%]'>
              <StarRating
                color='#FA8072'
                rating={stars}
                onChange={(star)=>setStars(star)}
                starSize={36}
              />
              </View>
            </View>
            <View className='flex-row items-center justify-between'>
              <Text className='font-bold text-black'>Title</Text>
              <View className='w-[75%]'>
                <TextInput textAlignVertical='center' onBlur={handleBlur('title')} onChangeText={handleChange('title')} placeholderTextColor={'#FFBCB5'} placeholder='Review Description in 500 Characters' className='w-[100%] font-bold text-white h-[40px] px-2 bg-customsalmon rounded-2xl'/>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <Text className='font-bold text-black'>Description</Text>
              <View className='w-[75%]'>
                <TextInput textAlignVertical='top' multiline={true} onBlur={handleBlur('description')} onChangeText={handleChange('description')} placeholderTextColor={'#FFBCB5'} placeholder='Review Description in 500 Characters' className='w-[100%] h-[150px] font-bold text-white px-2 bg-customsalmon rounded-2xl' />
              </View>
            </View>
          </View>
          <View className='flex-row gap-5 mt-2'>
            <TouchableOpacity onPress={btn1Func} className='bg-white border-[1px] border-customsalmon px-8 rounded-xl py-1'>
              <Text className='text-black font-bold text-lg'>{btn1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleSubmit()} className='bg-customsalmon border-[1px] border-white px-8 rounded-xl py-1'>
              <Text className='text-white font-bold text-lg'>{btn2}</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
        </Formik>}
        {(isEdit && selectedReview) && <Formik validationSchema={reviewValidationSchema} initialValues={{title:selectedReview.title,description:selectedReview.comment,}}
          onSubmit={values => {btn1Func();btn2Func(values)}}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }:{handleChange:any,handleBlur:any,handleSubmit:any,values:any,errors:any,touched:any}) => (
        <View className='bg-white border-[1px] border-customsalmon w-[90%] rounded-2xl h-auto py-4 items-center justify-evenly'>
          {touched.title && errors.title && <Text className='text-customsalmon text-center'>{errors.title}</Text>}
          {touched.description && errors.description && <Text className='text-customsalmon text-center'>{errors.description}</Text>}
          <View className='items-center mb-2 w-[90%] mx-auto'>
            <Text className='text-xl font-bold text-black mb-2'>{title}</Text>
            <Text className='text-lg font-semibold text-black'>{message}</Text>
            {message2 && <Text className='text-lg font-semibold text-black'>{message2}</Text>}
            {message3 && <Text className='text-lg font-semibold text-black'>{message3}</Text>}
          </View>
          <View className='w-[90%] gap-5'>
            <View className='flex-row items-center justify-between'>
              <Text className='font-bold text-black'>Stars</Text>
              <View className='w-[72%]'>
              <StarRating
                color='#FA8072'
                rating={stars}
                onChange={(star)=>setStars(star)}
                starSize={36}
              />
              </View>
            </View>
            <View className='flex-row items-center justify-between'>
              <Text className='font-bold text-black'>Title</Text>
              <View className='w-[75%]'>
                <TextInput maxLength={50} textAlignVertical='center' defaultValue={selectedReview.title} onBlur={handleBlur('title')} onChangeText={handleChange('title')} placeholderTextColor={'#FFBCB5'} placeholder='Review Description in 500 Characters' className='w-[100%] font-bold text-white h-[40px] px-2 bg-customsalmon rounded-2xl'/>
              </View>
            </View>
            <View className='flex-row justify-between'>
              <Text className='font-bold text-black'>Description</Text>
              <View className='w-[75%]'>
                <TextInput maxLength={500} textAlignVertical='top' multiline={true} defaultValue={selectedReview.comment} onBlur={handleBlur('description')} onChangeText={handleChange('description')} placeholderTextColor={'#FFBCB5'} placeholder='Review Description in 500 Characters' className='w-[100%] h-[150px] font-bold text-white px-2 bg-customsalmon rounded-2xl' />
              </View>
            </View>
          </View>
          <View className='flex-row gap-5 mt-2'>
            <TouchableOpacity onPress={btn1Func} className='bg-white border-[1px] border-customsalmon px-8 rounded-xl py-1'>
              <Text className='text-black font-bold text-lg'>{btn1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleSubmit()} className='bg-customsalmon border-[1px] border-white px-8 rounded-xl py-1'>
              <Text className='text-white font-bold text-lg'>{btn2}</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
        </Formik>}
      </View>
    </>
  )
}

export default WriteReview;