import React from 'react';
import { View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const SwipeWrapper = ({ children }) => {
    const navigation = useNavigation();

    // Get the parent navigator (BottomTab)
    const tabNavigation = navigation.getParent();

    if (!tabNavigation) return <View style={{ flex: 1 }}>{children}</View>;

    const tabState = tabNavigation.getState();
    const tabIndex = tabState.index;

    const handleGesture = ({ nativeEvent }) => {
        const { translationX } = nativeEvent;

        if (translationX < -50 && tabIndex < tabState.routes.length - 1) {
            tabNavigation.navigate(tabState.routes[tabIndex + 1].name);
        } else if (translationX > 50 && tabIndex > 0) {
            tabNavigation.navigate(tabState.routes[tabIndex - 1].name);
        }
    };

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <View style={{ flex: 1 }}>
                {children}
            </View>
        </PanGestureHandler>
    );
};

export default SwipeWrapper;
