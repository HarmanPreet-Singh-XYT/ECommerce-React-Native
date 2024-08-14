import {
	Pressable,
	View,
	Animated,
	SafeAreaView,
	StyleSheet,
} from 'react-native';
import { useEffect, useState } from 'react';
const defaultStyles = {
	bgColor:'#FFFFFF'
};

const activeStyles = {
    bgColor:'#FFBCB5',
};
const Switch = (props:{value:boolean,toggleSwitch:()=>void}) => {
    const { value,toggleSwitch } = props;
	const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));

	useEffect(() => {
		// Update the animated value when the value prop changes
		Animated.timing(animatedValue, {
			toValue: value ? 1 : 0,
			duration: 300, // Adjust the animation duration
			useNativeDriver: false,
		}).start();
	}, [value]);

	const translateX = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [4, 28], // Adjust the distance of the switch head
	});

    const currentStyles = value ? activeStyles : defaultStyles;
  return (
    <Pressable onPress={toggleSwitch} style={styles.pressable}>
      <View
      style={[{backgroundColor:currentStyles.bgColor},styles.backgroundGradient]}
        >
        <View style={styles.innerContainer}>
          <Animated.View
            style={{
              transform: [{ translateX }],
            }}>
            <View
              style={[styles.headGradient,{backgroundColor:'#FA8072'}]}
            />
          </Animated.View>
        </View>
      </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
    pressable: {
      width: 60,
      height: 18,
      borderRadius: 16,
      borderWidth:1,
      borderColor:'white'
    },
    backgroundGradient: {
      borderRadius: 16,
      flex: 1,
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      position: 'relative',
    },
    headGradient: {
      width: 26,
      height: 26,
      borderRadius: 100,
      borderWidth:1,
      borderColor:'white'

    },
});
export default Switch