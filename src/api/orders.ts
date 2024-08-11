"use server"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import { cookies } from 'next/headers';
import { sign } from 'react-native-pure-jwt';
async function encrypt(key:string){
    const encryptedKey =  await sign({Application:'React Native'},key,{
      alg: "HS256"
    })
    return encryptedKey
}
const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('sessionhold');
      if (value !== null) {
        return value;
      }else{
        return false;
      }
    } catch (e) {
      return false;
    }
};
const url = process.env.BACKEND_URL;
const authKey = process.env.AUTH_KEY as string;
async function ordersHandler() {
  const sendingKey = await encrypt(authKey);
  const cookie = await getData();
  if(cookie){
    try {
        const response = await axios.post(`${url}/api/user/orders`, {userIDToken:cookie}, {
          headers: { authorization:`Bearer ${sendingKey}` },
        });
        return {status:response.status,data:response.data}
    } catch (error) {
        return {status:500,error: 'Internal Server Error' }
    }
  }else
    return {status:250,error: 'Cookie Not Found' };
    
};
async function orderDetailHandler(orderID:string) {
  const sendingKey = await encrypt(authKey);
  const cookie = await getData();
  if(cookie){
    try {
        const response = await axios.get(`${url}/api/user/order-detail/${cookie}/${orderID}`, {
          headers: { authorization:`Bearer ${sendingKey}` },
        });
        return {status:response.status,data:response.data}
    } catch (error) {
        return {status:404,error: 'Internal Server Error' }
    }
  }else
    return {status:500,error: 'Cookie Not Found' };
};
export {ordersHandler,orderDetailHandler};