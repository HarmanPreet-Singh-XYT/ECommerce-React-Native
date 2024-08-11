import axios from 'axios';
import { sign } from 'react-native-pure-jwt';
async function encrypt(key:string){
  const encryptedKey =  await sign({Application:'React Native'},key,{
      alg: "HS256"
    })
  return encryptedKey
}
const url = process.env.BACKEND_URL;
const authKey = process.env.AUTH_KEY as string;
export async function categoryFilterHandler({minPrice,maxPrice,categoryID,minRating,categoryName}:{minPrice:number,maxPrice:number,categoryID:number,minRating:number,categoryName:string|string[]}) {
  const sendingKey = await encrypt(authKey);
  try {
    const response = await axios.get(`${url}/api/filter/category/${minPrice}/${maxPrice}/${categoryID}/${minRating}/${categoryName}`,{
        headers: { authorization:`Bearer ${sendingKey}` },
    });
    return {status:response.status,data:response.data}
  } catch (error) {
    return {status:500,error: 'Internal Server Error' }
  }
};
export async function categoryOnlyFilterHandler({categoryID,categoryName}:{categoryID:number,categoryName:string|string[]}) {
    const sendingKey = await encrypt(authKey);
    try {
      const response = await axios.get(`${url}/api/filter/category-only/${categoryID}/${categoryName}`,{
          headers: { authorization:`Bearer ${sendingKey}` },
      });
      return {status:response.status,data:response.data}
    } catch (error) {
      return {status:500,error: 'Internal Server Error' }
    }
};