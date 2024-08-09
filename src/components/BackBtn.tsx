import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
const BackBtn = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center',marginRight:26 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Svg width={25} height={25} viewBox='0 0 40 40' fill={'none'}>
            <Path fillRule='evenodd' clipRule='evenodd' d='M19.2672 39.1627C18.7984 39.6988 18.1626 40 17.4997 40C16.8368 40 16.201 39.6988 15.7322 39.1627L0.731976 22.0045C0.263292 21.4683 0 20.741 0 19.9827C0 19.2244 0.263292 18.4972 0.731976 17.9609L15.7322 0.802751C16.2037 0.281834 16.8352 -0.00640748 17.4907 0.000108104C18.1462 0.00662369 18.7732 0.307375 19.2368 0.837586C19.7003 1.3678 19.9632 2.08504 19.9689 2.83485C19.9746 3.58465 19.7226 4.30702 19.2672 4.84636L8.53458 17.123H37.5C38.163 17.123 38.7989 17.4243 39.2678 17.9606C39.7366 18.4969 40 19.2243 40 19.9827C40 20.7412 39.7366 21.4685 39.2678 22.0048C38.7989 22.5411 38.163 22.8424 37.5 22.8424H8.53458L19.2672 35.1191C19.7359 35.6554 19.9992 36.3826 19.9992 37.1409C19.9992 37.8992 19.7359 38.6264 19.2672 39.1627Z' fill="#FA8072"/>
        </Svg>
      </TouchableOpacity>
      {/* Add other header elements here */}
    </View>
  );
};
export default BackBtn;