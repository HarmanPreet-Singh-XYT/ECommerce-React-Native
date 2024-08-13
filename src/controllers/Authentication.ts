import { useApp } from "../helpers/AccountDialog"; // Adjust the import path as necessary
import { useAppDispatch } from "../hooks";
import { setDefaultAccount } from "./UserAccount";
import signInHandler from '../api/signin';
import signUpHandler from '../api/signup';
// import sessionHandler from "../api/sessionauth";
import authDataHandler from "../api/googleAuth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import sessionHandler from "../api/sessionauth";
import userData from "./userData";

const useAuth = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { toggleIsIncorrect, toggleIsExists, toggleServerError, setLoggedIn } = useApp();
  const dispatch = useAppDispatch();
  const { grabUserData } = userData();
  const checkLogin = async (form: { email: string; password: string }, remember: boolean,setloading:React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      // const res = await axios.post('/api/signin', { email: form.email, password: form.password, remember });
      const res = await signInHandler({email:form.email,password:form.password,remember})
      switch (res.status) {
        case 200:
          try {
            const data = {
              userID: res.data.userData.userID,
              userName: res.data.userData.userName,
              email: res.data.userData.email,
              mobile_number: res.data.userData.mobile_number,
              dob: res.data.userData.dob,
            };
            dispatch(setDefaultAccount(data));
            await grabUserData();
            setloading(false);
            setLoggedIn(true);
            navigation.navigate('Home');
          } catch (tokenError) {
            setloading(false);
            toggleServerError(); // Optionally, handle token verification errors differently
          }
          break;
        case 205:
          setloading(false);
          toggleIsIncorrect();
          break;
      }
    } catch (err) {
      setloading(false);
      toggleServerError();
    }
  };

  const registerUser = async (
    form: {
      userName: string;
      email: string;
      password: string;
      mobile_number: number;
      dob: string;
    },
    promotional: boolean,
    setloading:React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      
      const res = await signUpHandler(form,promotional);
      
      switch (res.status) {
        case 200:
          setloading(false);
          setLoggedIn(true);
          navigation.navigate('Home');
          break;
        case 205:
          setloading(false);
          toggleIsExists();
          break;
      }
    } catch (err) {
      toggleServerError();
    }
  };
  const checkSession = async () => {
      try {
        const res = await sessionHandler();
        switch (res.status) {
          case 200:
            try {
              const data = {
                userID: res.data.userData.userID,
                userName: res.data.userData.userName,
                email: res.data.userData.email,
                mobile_number: res.data.userData.mobile_number,
                dob: res.data.userData.dob,
              };
              dispatch(setDefaultAccount(data));
              
              setLoggedIn(true);
              return {success:true,data};
            } catch (tokenError) {
              // console.log('Login Failed')
              return {success:false};
            }
          case 500:
            // console.log('Server Error');
            return {success:false};
        }
      } catch (err) {
        return {success:false};
        // console.log("Login Failed");
      }
  };
  const checkAuthLogin = async (authMail:string,setloading:React.Dispatch<React.SetStateAction<boolean>>)=>{
    try {
      const res = await authDataHandler(authMail);
      switch (res.status) {
        case 200:
          try {
            const data = {
              userID: res.data.userData.userID,
              userName: res.data.userData.userName,
              email: res.data.userData.email,
              mobile_number: res.data.userData.mobile_number,
              dob: res.data.userData.dob,
            };
            
            dispatch(setDefaultAccount(data));
            await grabUserData();
            setloading(false);
            setLoggedIn(true);
            navigation.navigate('Home');
          } catch (tokenError) {
            
            toggleServerError(); // Optionally, handle token verification errors differently
          }
          break;
        case 205:
          setloading(false);
          toggleIsIncorrect();
          break;
      }
    } catch (error) {

      setloading(false);
      toggleServerError();
    }
    }
  return { checkLogin, registerUser, checkSession, checkAuthLogin };
};

export default useAuth;
