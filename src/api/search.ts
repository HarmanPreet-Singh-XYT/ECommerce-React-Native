import axios from 'axios';
import { sign } from 'react-native-pure-jwt';
async function encrypt(key:string){
  const encryptedKey =  await sign({Application:'React Native'},key,{
      alg: "HS256"
    })
  return encryptedKey
}
export default async function searchProductHandler({productName}:{productName:string|string[]}) {
  const url = process.env.BACKEND_URL;
  const authKey = process.env.AUTH_KEY as string;
  const sendingKey = await encrypt(authKey);
  try {
    const response = await axios.get(`${url}/api/search/product/${productName}`,{
      headers: { authorization:`Bearer ${sendingKey}` },
    });
    return {status:response.status,data:response.data}
  } catch (error) {
    return {status:500,error: 'Internal Server Error' }
  }
};
export async function searchFilteredHandler({productName,minPrice,maxPrice,rating}:{productName:string|string[],minPrice:number,maxPrice:number,rating:number}) {
    const url = process.env.BACKEND_URL;
    const authKey = process.env.AUTH_KEY as string;
    const sendingKey = await encrypt(authKey);
    try {
      const response = await axios.get(`${url}/api/search/filtered-product/${productName}/${minPrice}/${maxPrice}/${rating}`,{
        headers: { authorization:`Bearer ${sendingKey}` },
      });
      return {status:response.status,data:response.data}
    } catch (error) {
      return {status:500,error: 'Internal Server Error' }
    }
};