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
export default async function signInHandler({email,password,remember}:{email:string,password:string,remember:boolean}) {
  const url = process.env.BACKEND_URL;
  const authKey = process.env.AUTH_KEY as string;
  const sendingKey = await encrypt(authKey);

  try {
    const response = await axios.post(`${url}/api/user/signin/${remember}`, { email, password }, {
      headers: { authorization:`Bearer ${sendingKey}` },
    });
    try {
      await AsyncStorage.setItem('sessionhold', response.data.token);
    } catch (error) {
    }
    // if(remember){
    //   cookies().set({
    //     name: 'sessionhold',
    //     value: response.data.token,
    //     httpOnly: true,
    //     secure:true,
    //     maxAge:24 * 60 * 60 * 1000 * 7
    //   })
    // }else{
    //   cookies().set({
    //     name: 'sessionhold',
    //     value: response.data.token,
    //     httpOnly: true,
    //     secure:true,
    //     maxAge:24 * 60 * 60 * 1000
    //   })
    // }
    return {status:response.status,data:response.data}
  } catch (error) {
    return {status:500,error: 'Internal Server Error' }
  }
};