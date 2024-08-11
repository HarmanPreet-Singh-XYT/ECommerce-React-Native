import AsyncStorage from "@react-native-async-storage/async-storage";

// "use server"
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
export default async function signOutHandler() {
  const cookie = await getData();
  if(cookie){
    try {
        await AsyncStorage.removeItem('sessionhold');
        return true;
    } catch (error) {
        return false;
    }
  }else
    return false;
    
};