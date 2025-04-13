import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    SafeAreaView,
    Image,
    Animated,
    Easing
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { colors } from '../theme/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoadingScreenAnimated = ({ navigation }) => {

    const outerRotation = useRef(new Animated.Value(0)).current;
    const innerRotation = useRef(new Animated.Value(0)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {

        Animated.loop(
            Animated.timing(outerRotation, {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start();


        Animated.loop(
            Animated.timing(innerRotation, {
                toValue: 1,
                duration: 15000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start();


        Animated.parallel([
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 1500,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                useNativeDriver: true
            }),
            Animated.timing(logoScale, {
                toValue: 1,
                duration: 1500,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                useNativeDriver: true
            })
        ]).start();


        const timer = setTimeout(() => {
            navigation.navigate("Login");
        }, 4500);

        return () => clearTimeout(timer);

    }, []);


    const outerRotateStr = outerRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    const innerRotateStr = innerRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-360deg']
    });

    return (
        <LinearGradient
            colors={[colors.background, colors.mapOverlay]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <View style={styles.animationContainer}>
                            <Animated.View
                                style={[
                                    styles.logoBorder,
                                    { transform: [{ rotate: outerRotateStr }] }
                                ]}
                            />
                            <Animated.View
                                style={[
                                    styles.innerBorder,
                                    { transform: [{ rotate: innerRotateStr }] }
                                ]}
                            />
                        </View>
                        <Animated.View
                            style={[
                                styles.absoluteLogoContainer,
                                {
                                    opacity: logoOpacity,
                                    transform: [{ scale: logoScale }]
                                }
                            ]}
                        >
                            <Image
                                source={require("../../assets/images/logo-text.png")}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </Animated.View>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.taglineText}>
                            Shining light on social experience
                        </Text>
                    </View>

                    <View style={styles.exploreContainer}>
                        <Pressable
                            style={styles.exploreButton}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <MaterialCommunityIcons name="chevron-double-up" size={17} color="#FFFFFF" />
                            <Text style={styles.exploreText}>Explore</Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 80,
    },
    logoContainer: {
        flex: 1,
        position: 'relative',
        width: 260,
        height: 360,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animationContainer: {
        width: 260,
        height: 360,
        position: 'absolute',
        top: 14,
        left: 0,
    },
    logoBorder: {
        width: 260,
        height: 360,
        borderRadius: 130,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        position: 'absolute',
        top: 14,
        left: 0,


    },
    innerBorder: {
        width: 260,
        height: 360,
        borderRadius: 120,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    absoluteLogoContainer: {
        position: 'absolute',
        width: 150,
        height: 150,


        zIndex: 20,
    },
    logo: {
        width: 150,
        height: 150,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 80,
        paddingHorizontal: 20,
    },
    taglineText: {
        color: colors.textPrimary,
        fontSize: 24,
        fontWeight: '300',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    exploreContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    exploreButton: {
        alignItems: 'center',
    },
    arrowIcon: {
        color: colors.textPrimary,
        fontSize: 24,
        transform: [{ rotate: '180deg' }],
        marginBottom: 5,
    },
    exploreText: {
        color: colors.textPrimary,
        fontSize: 20,
    },
});

export default LoadingScreenAnimated;