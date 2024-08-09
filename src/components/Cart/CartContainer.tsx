import React, { useEffect, useState, useRef } from 'react';
import { useMenu } from '../../helpers/MenuContext';
import { TouchableOpacity, Animated } from 'react-native';
import Cart from '../Cart/Cart';

const CartContainer = () => {
    const { menu, toggleCart } = useMenu();
    const [overlayColor, setOverlayColor] = useState('rgba(255, 255, 255, 0)'); // Initial color is transparent white

    const slideAnim = useRef(new Animated.Value(500)).current; // Animation value for slide
    const colorAnim = useRef(new Animated.Value(0)).current; // Animation value for color

    useEffect(() => {
        if (menu.cart) {
            // Start slide and color animations when sidebar opens
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
            Animated.timing(colorAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }).start();

            const timer = setTimeout(() => {
                setOverlayColor('rgba(0, 0, 0, 0.5)'); // Change color to semi-transparent black
            }, 100);

            return () => clearTimeout(timer);
        } else {
            // Reset the overlay color and slide animation when sidebar is closed
            Animated.timing(slideAnim, {
                toValue: 500,
                duration: 500,
                useNativeDriver: true,
            }).start();
            Animated.timing(colorAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => setOverlayColor('rgba(255, 255, 255, 0)'));
        }
    }, [menu.cart]);

    // Interpolating color animation
    const backgroundColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.5)']
    });

    return (
        <>
            <TouchableOpacity onPress={toggleCart} style={{ backgroundColor: overlayColor }} className={`${menu.cart ? 'absolute' : 'hidden'} top-0 left-0 h-full w-full z-50`}>
                <Animated.View style={{ backgroundColor, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
            </TouchableOpacity>
            <Animated.View
                style={{
                    transform: [{ translateX: slideAnim }],
                }}
                className={`py-4 items-center absolute w-[85%] bg-white h-screen right-0 z-50 overflow-y-auto transform transition-transform duration-500 ease-in-out`}
            >
                <Cart/>
            </Animated.View>
        </>
    );
}

export default CartContainer;
