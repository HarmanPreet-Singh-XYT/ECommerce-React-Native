// "use server"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
export default async function sessionHandler() {
  const url = process.env.BACKEND_URL;
  const authKey = process.env.AUTH_KEY as string;
  const sendingKey = await encrypt(authKey);
  const token = await getData();
  if(token){
    try {
        const response = await axios.post(`${url}/api/user/session-check`, {token}, {
          headers: { authorization:`Bearer ${sendingKey}` },
        });
        return {status:response.status,data:response.data}
    } catch (error) {
        return {status:500,error: 'Internal Server Error' }
    }
  }else
    return {status:500,error: 'Token Not Found' };
    
};