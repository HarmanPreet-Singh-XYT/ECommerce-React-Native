import { View, Text, Image,TouchableOpacity } from 'react-native'
import React, { SetStateAction } from 'react'
interface ProductImage {
  imageid: number;
  imglink: string;
  imgalt: string;
}
interface MainImage {
  imglink: string;
  imgalt: string;
}
const ImageSec = ({data,mainImage,setSelectedImage}:{data:ProductImage[],mainImage:MainImage,setSelectedImage:React.Dispatch<SetStateAction<{imgLink:string,imgAlt:string}>>}) => {
  return (
    <View className='w-[90%] mx-auto'>
        <View className='w-[100%] border-[1px] border-customsalmon rounded-2xl py-4 mb-4'>
        <Image source={{uri:mainImage.imglink}} alt={mainImage.imgalt}  className='w-[95%] h-[300px] bg-black' />
        </View>
        <View className='flex-row mx-auto w-[100%] flex-wrap'>
          {
            data.map((each)=>
              <TouchableOpacity onPress={()=>setSelectedImage({imgLink:each.imglink,imgAlt:each.imgalt})} key={each.imageid} style={{borderWidth:mainImage.imglink===each.imglink ? 2 : 1}} className='border-customsalmon w-[90px] rounded-2xl px-3'>
                <Image source={{uri:each.imglink}} alt={each.imgalt} className='w-[65px] rounded-2xl mx-auto h-[70px] my-1' />
              </TouchableOpacity>
            )
          }
          
        </View>
    </View>
  )
}

export default ImageSec