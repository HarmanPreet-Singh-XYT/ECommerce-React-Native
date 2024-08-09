import axios from 'axios';
import { sign } from 'react-native-pure-jwt';
async function encrypt(key:string){
    const encryptedKey =  await sign({},key,{
      alg: "HS256"
    })
    return encryptedKey
}
export default async function resetPassHandler({email,password,otp}:{email:string,password:string,otp:string}) {
  const url = process.env.BACKEND_URL;
  const authKey = process.env.AUTH_KEY as string;
  const sendingKey = await encrypt(authKey);
  try {
    const response = await axios.post(`${url}/api/user/reset-password`, {email,password,otp}, {
      headers: { authorization:`Bearer ${sendingKey}` },
    });
    return {status:response.status,data:response.data}
  } catch (error) {
    return {status:500,error: 'Internal Server Error' }
  }
};