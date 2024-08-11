import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { sign } from 'react-native-pure-jwt';
// import { cookies } from 'next/headers';
async function encrypt(key:string){
  const encryptedKey =  await sign({Application:'React Native'},key,{
      alg: "HS256"
    })
  return encryptedKey
}
const url = process.env.BACKEND_URL;
const authKey = process.env.AUTH_KEY as string;
export default async function authDataHandler(code:string) {
  const sendingKey = await encrypt(authKey);
  try {
    const response = await axios.post(`${url}/api/auth/google`,{code},{
        headers: { authorization:`Bearer ${sendingKey}` },
    });
    await AsyncStorage.setItem('sessionhold', response.data.token);
    // cookies().set({
    //   name: 'sessionhold',
    //   value: response.data.token,
    //   httpOnly: true,
    //   secure:true,
    //   maxAge:24 * 60 * 60 * 1000 * 7
    // })
    return {status:response.status,data:response.data}
  } catch (error) {
    return {status:500,error: 'Internal Server Error' }
  }
};