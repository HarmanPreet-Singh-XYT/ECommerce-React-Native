import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home/Home';
import { Provider } from 'react-redux';
import { store } from './store';
import { MenuProvider } from './helpers/MenuContext';
import { AppProvider } from './helpers/AccountDialog';
import Product from './components/Product/Product';
import BackBtn from './components/BackBtn';
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import AccountSettings from './components/AccountSettings/AccountSettings';
import Orders from './components/Orders/Orders';
import ForgotPassword from './components/Login/ForgotPassword';
import ProductCheckout from './components/Checkout/ProductCheckout';
import Confirmation from './components/Confirmation/Confirmation';
import CartCheckout from './components/Checkout/CartCheckout';
import OrderSummary from './components/OrderSummary/OrderSummary';
const Stack = createNativeStackNavigator();
interface Params {
  params:{productID:string};
}
const App = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <AppProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerTitleStyle:{fontSize:20,fontWeight:'bold',color:'#FA8072'},headerShadowVisible:false}}>
              <Stack.Screen name="Home" component={Home} options={{
                headerTitle:'H-Comm',
                headerTitleAlign:'center',
              }}/>
              <Stack.Screen name="Product" component={Product} options={{
                headerLeft:()=><BackBtn/>,
                headerTitle:'Product',
              }}/>
              <Stack.Screen name="Signin" component={SignIn} options={{
                headerTitle:'Sign In',
                headerTitleAlign:'center',
                headerBackVisible:false
              }}/>
              <Stack.Screen name="Signup" component={SignUp} options={{
                headerTitle:'Sign Up',
                headerTitleAlign:'center',
                headerBackVisible:false
              }}/>
              <Stack.Screen name="AccountSettings" component={AccountSettings} options={{
                headerLeft:()=><BackBtn/>,
                headerTitle:'Account Settings',
              }}/>
              <Stack.Screen name="Orders" component={Orders} options={{
                headerLeft:()=><BackBtn/>,
                headerTitle:'Orders',
              }}/>
              <Stack.Screen name="ResetPassword" component={ForgotPassword} options={{
                headerLeft:()=><BackBtn/>,
                headerTitle:'Reset',
              }}/>
              <Stack.Screen name="Checkout" component={ProductCheckout} options={{
                headerTitle:'Checkout',
                headerTitleAlign:'center',
                headerBackVisible:false
              }}/>
              <Stack.Screen name="CartCheckout" component={CartCheckout} options={{
                headerTitle:'Checkout',
                headerTitleAlign:'center',
                headerBackVisible:false
              }}/>
              <Stack.Screen name="Confirmation" component={Confirmation} options={{
                headerTitle:'Order Confirmation',
                headerTitleAlign:'center',
                headerBackVisible:false
              }}/>
              <Stack.Screen name="OrderSummary" component={OrderSummary} options={{
                headerTitle:'Order Summary',
                headerTitleAlign:'center',
                headerBackVisible:false
              }}/>
            </Stack.Navigator>
          </NavigationContainer>
        </AppProvider>
      </MenuProvider>
    </Provider>
  )
}

export default App