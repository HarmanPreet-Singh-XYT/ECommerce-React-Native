import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Rating from '../Stars'
import { useAppSelector } from '../../hooks';
import formatDate from '../../api/dateConvert';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import { reviewDeleteHandler } from '../../api/reviews';
import InfoDialog from '../Dialogs/InfoDialog';
// Interface for individual reviews
interface Review {
    reviewid: number;
    userid: number;
    rating: number;
    title:string;
    comment: string;
    username: string;
    createdat:string;
    productstars:number;
}
const ReviewsSec = ({data,productID,reviewCount,setselectedReview,setdialogType}:{data:Review[],productID:number,reviewCount:number,setselectedReview:React.Dispatch<React.SetStateAction<Review|null>>,setdialogType:React.Dispatch<React.SetStateAction<null|string>>}) => {
    
    const [one, setone] = useState(0);
    const [two, settwo] = useState(0);
    const [three, setthree] = useState(0);
    const [four, setfour] = useState(0);
    const [five, setfive] = useState(0);
    
    const defaultAccount = useAppSelector((state) => state.userState.defaultAccount)
    let stars:any = {one:0,two:0,three:0,four:0,five:0};
    function addStars (num:number){
        if(num < 2){
            stars.one++;
        }
        else if(num < 3){
            stars.two++;
        }
        else if(num < 4){
            stars.three++;
        }
        else if(num < 5){
            stars.four++;
        }else{
            stars.five++;
        }
    }
    function varAssign(variable:string,number:number){
        switch (variable) {
            case 'one':
                setone(number);
                break;
            case 'two':
                settwo(number);
                break;
            case 'three':
                setthree(number);
                break;
            case 'four':
                setfour(number);
                break;
            case 'five':
                setfive(number);
                break;
        }
    }
    async function Calculate(){
        if(reviewCount > 0){
            await data.map((each)=>
                addStars(each.rating)
            );
            const sumTotal = Object.keys(stars).reduce((previous, key)=>{
                return previous + stars[key];
            }, 0);
            Object.keys(stars).forEach(function(key){ varAssign(key,Math.round(stars[key] * 100/sumTotal)); });
        } 
    }
    useEffect(() => {
      Calculate();

    }, [data]);
    
  return (
    <View className='w-[90%] mx-auto mt-6'>
        
      <Text className='text-black text-xl font-bold text-center mb-4'>Customer Reviews & Rating</Text>
      <View className='mb-4 gap-1'>
        <View className='flex-row items-center justify-between '>
            <View className='flex-row items-center'><Text className='text-black font-bold text-md'>5</Text><Rating count={1} size={14} rating={1}/></View>
            <View className='w-[80%]'>
                <View className='h-[16px] min-w-[100%] relative border-customsalmon border-[1px] rounded-xl'></View>
                <View style={{width:`${five}%`}} className='h-[16px] absolute bg-customsalmon rounded-xl'></View>
            </View>
            <Text className='font-bold text-md text-black'>{stars.five}</Text>
        </View>
        <View className='flex-row items-center justify-between '>
            <View className='flex-row items-center'><Text className='text-black font-bold text-md'>4</Text><Rating count={1} size={14} rating={1}/></View>
            <View className='w-[80%]'>
                <View className='h-[16px] relative min-w-[100%] border-customsalmon border-[1px] rounded-xl'></View>
                <View style={{width:`${four}%`}} className='h-[16px] absolute bg-customsalmon rounded-xl'></View>
            </View>
            <Text className='font-bold text-md text-black'>{stars.four}</Text>
        </View>
        <View className='flex-row items-center justify-between '>
            <View className='flex-row items-center'><Text className='text-black font-bold text-md'>3</Text><Rating count={1} size={14} rating={1}/></View>
            <View className='w-[80%]'>
                <View className='h-[16px] relative min-w-[100%] border-customsalmon border-[1px] rounded-xl'></View>
                <View style={{width:`${three}%`}} className='h-[16px] absolute bg-customsalmon rounded-xl'></View>
            </View>
            <Text className='font-bold text-md text-black'>{stars.three}</Text>
        </View>
        <View className='flex-row items-center justify-between '>
            <View className='flex-row items-center'><Text className='text-black font-bold text-md'>2</Text><Rating count={1} size={14} rating={1}/></View>
            <View className='w-[80%]'>
                <View className='h-[16px] relative min-w-[100%] border-customsalmon border-[1px] rounded-xl'></View>
                <View style={{width:`${two}%`}} className='h-[16px] absolute bg-customsalmon rounded-xl'></View>
            </View>
            <Text className='font-bold text-md text-black'>{stars.two}</Text>
        </View>
        <View className='flex-row items-center justify-between '>
            <View className='flex-row items-center'><Text className='text-black font-bold text-md'>1</Text><Rating count={1} size={14} rating={1}/></View>
            <View className='w-[80%]'>
                <View className='h-[16px] relative min-w-[100%] border-customsalmon border-[1px] rounded-xl'></View>
                <View style={{width:`${one}%`}} className='h-[16px] absolute bg-customsalmon rounded-xl'></View>
            </View>
            <Text className='font-bold text-md text-black'>{stars.one}</Text>
        </View>
      </View>
        <View className='h-[250px] rounded-2xl w-[100%] bg-customsalmon py-4 justify-between mb-8'>
            <View className='justify-evenly flex-row'>
                <View className='items-center'>
                    <Text className='text-2xl text-white font-bold mb-1'>{data.length > 0 ? data[0].productstars : 0}</Text>
                    <Rating rating={data.length > 0 ? data[0].productstars : 0} bgColor='white' size={24}/>
                    <Text className='text-white font-bold mt-2'>{reviewCount} Ratings</Text>
                </View>
                <View className='w-[2px] h-[90%] bg-white my-auto'>
                </View>
                <View className='items-center'>
                    <Text className='text-2xl text-white font-bold mb-1'>{data.length > 0 ? data[0].rating : 0}</Text>
                    <Rating rating={data.length > 0 ? data[0].rating : 0} bgColor='white' size={24}/>
                    <Text className='text-white font-bold mt-2'>Last Review</Text>
                </View>
            </View>
            <View className='mt-6'>
                <TouchableOpacity onPress={()=>setdialogType('writeReview')} className='bg-white mb-3 w-[85%] mx-auto rounded-full h-[40px] justify-center'><Text className='text-customsalmon text-lg font-bold text-center'>Write A Review</Text></TouchableOpacity>
                <TouchableOpacity className='bg-[#FF9C90] w-[50%] mx-auto rounded-full h-[40px] justify-center'><Text className='text-white font-bold text-center'>See All Reviews</Text></TouchableOpacity>
            </View>
        </View>
        <View className='mb-8'>
            <Text className='text-xl text-black font-bold mb-4'>Recent Reviews</Text>
            <View>
                <View className='border-[1px] border-customsalmon rounded-xl'>
                    {data.map((each)=><View key={each.reviewid} className='w-[92%] mx-auto py-4'>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-lg text-black font-bold'>@{each.username}</Text>
                            <Rating rating={each.productstars} size={16}/>
                        </View>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-md text-black font-medium'>{each.title}</Text>
                            <Text className='font-medium text-customsalmon'>{formatDate(each.createdat)}</Text>
                        </View>
                        <Text className='text-black font-medium w-[100%] my-2 text-[12px]'>
                            {each.comment}
                        </Text>
                        <View className='flex-row justify-between mt-4'>
                            {each.userid===defaultAccount.userID && <><TouchableOpacity onPress={()=>{setselectedReview(each);setdialogType('editReview')}} className='px-6 bg-customsalmon rounded-[10px] py-1'><Text className='font-bold text-md text-white'>Edit Review</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>{setselectedReview(each);setdialogType('deletePopup')}} className='px-6 rounded-[10px] border-customsalmon border-[1px] py-1'><Text className='font-bold text-md text-black'>Delete Review</Text></TouchableOpacity></>}
                        </View>
                    </View>)}
                </View>
            </View>
        </View>
    </View>
  )
}

export default ReviewsSec