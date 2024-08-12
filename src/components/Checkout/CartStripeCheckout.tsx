import { useStripe } from "@stripe/stripe-react-native";
import { useState, useEffect } from "react";
import {  View, TouchableOpacity, Text } from "react-native";
import { cardCheckoutHandler, cartCardCheckoutHandler, paymentGatewayCartHandler } from "../../api/paymentSystem";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
export default function CartStripeCheckout({customerName,email,contactNumber,userID}:{customerName:string,email:string,contactNumber:number,userID:number}) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const customAppearance = {
    shapes: {
      borderRadius: 12,
      borderWidth: 0.5,
    },
    primaryButton: {
      shapes: {
       borderRadius: 15,
      },
    },
    colors: {
      primary: '#FA8072',
      background: '#ffffff',
      componentBackground: '#ffffff',
      componentBorder: '#FA8072',
      componentDivider: '#FA8072',
      primaryText: '#000000',
      secondaryText: '#000000',
      componentText: '#000000',
      placeholderText: '#73757b',
    },
   };
    async function createOrder(paymentid:string,paymentStatus:string){
        setLoading(true);
        const createOrder = await cartCardCheckoutHandler(userID,paymentid,paymentStatus)
        switch (createOrder.status) {
            case 200:
                setLoading(false);
                navigation.navigate('Confirmation',{orderID:'Cart',statusCode:200});
                break;
            default:
                navigation.navigate('Confirmation',{orderID:'Cart',statusCode:400});
                break;
        }
      }
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const fetchPaymentSheetParams = async () => {
    async function paymentGateway(userID:number){
        const ClientS = await paymentGatewayCartHandler(userID);
        return ClientS.clientSecret;
    }
    const paymentIntent = await paymentGateway(userID);

    return {
      paymentIntent,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "H-Comm Ecommerce",
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      appearance:customAppearance,
      defaultBillingDetails: {
        name:customerName,
        email:email,
        phone:contactNumber.toString(),
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      navigation.navigate('Confirmation',{orderID:0,statusCode:400});
    } else {
        const randomNum:any = Math.random;
      createOrder(`${(Math.round(randomNum*100))}`,'Succeeded');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View>
      {/* <CardForm style={styles.cardForm}/> */}
      <TouchableOpacity style={{backgroundColor:!loading ? '#FFBCB5' : '#FA8072'}} disabled={!loading} onPress={openPaymentSheet} className='w-[90%] self-center py-2 my-6 rounded-xl'><Text className='text-white text-center font-bold text-lg'>Pay Now</Text></TouchableOpacity>
    </View>
  );
}