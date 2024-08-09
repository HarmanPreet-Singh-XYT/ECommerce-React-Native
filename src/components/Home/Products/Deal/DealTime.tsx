import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
interface PropType {
    endTime: string;
  }
const DealTime: React.FC<PropType> = ({ endTime }) => {
    const calculateTimeRemaining = () => {
        const now = new Date();
        const end = new Date(endTime);
        const timeDifference = end.getTime() - now.getTime();
    
        if (timeDifference <= 0) {
          return {
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00'
          };
        }
    
        const seconds = Math.floor((timeDifference / 1000) % 60).toString().padStart(2, '0');
        const minutes = Math.floor((timeDifference / 1000 / 60) % 60).toString().padStart(2, '0');
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    
        return {
          days,
          hours,
          minutes,
          seconds
        };
      };
    
      const [timeRemaining, setTimeRemaining] = useState({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00'
      });
    
      useEffect(() => {
        setTimeRemaining(calculateTimeRemaining());
    
        const timer = setInterval(() => {
          setTimeRemaining(calculateTimeRemaining());
        }, 1000);
    
        return () => clearInterval(timer);
      }, []);
  return (
    <View className='flex-row mt-3 justify-between'>
        <View className='w-[75px] h-[75px] bg-customsalmon rounded-xl justify-center items-center'>
        <Text className='text-3xl font-bold text-white p-0 m-0 top-1 mb-1'>{timeRemaining.days}</Text>
        <Text className='text-white p-0 m-0 bottom-1 text-[12px]'>Days</Text>
        </View>
        <View className='w-[75px] h-[75px] bg-customsalmon rounded-xl justify-center items-center'>
        <Text className='text-3xl font-bold text-white p-0 m-0 top-1 mb-1'>{timeRemaining.hours}</Text>
        <Text className='text-white p-0 m-0 bottom-1 text-[12px]'>Hours</Text>
        </View>
        <View className='w-[75px] h-[75px] bg-customsalmon rounded-xl justify-center items-center'>
        <Text className='text-3xl font-bold text-white p-0 m-0 top-1 mb-1'>{timeRemaining.minutes}</Text>
        <Text className='text-white p-0 m-0 bottom-1 text-[12px]'>Min</Text>
        </View>
        <View className='w-[75px] h-[75px] bg-customsalmon rounded-xl justify-center items-center'>
        <Text className='text-3xl font-bold text-white p-0 m-0 top-1 mb-1'>{timeRemaining.seconds}</Text>
        <Text className='text-white p-0 m-0 bottom-1 text-[12px]'>Sec</Text>
        </View>
    </View>
  )
}

export default DealTime