import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    Platform,
    Dimensions
} from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { createSubscribtionApi } from '../apis/subscription';
import { useAuth } from '../store/context/authContext';
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/index';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

const SubscriptionScreen = ({ navigation }) => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const subscribe = async () => {
        try {
            setLoading(true);

            const response = await createSubscribtionApi(token);
            console.log("createSubscribtionApi call success")
            const { clientSecret, subscriptionId } = response.result;

            const { error: initError } = await initPaymentSheet({
                paymentIntentClientSecret: clientSecret,
                merchantDisplayName: 'Socialight',
                customerId: response.customer_id,
                setupIntentClientSecret: clientSecret,
                style: 'alwaysDark',
            });

            if (initError) {
                Alert.alert('Error', initError.message);
                setLoading(false);
                return;
            }

            const { error: paymentError } = await presentPaymentSheet();

            if (paymentError) {
                Alert.alert(
                    'Payment failed',
                    paymentError.message || 'There was an issue with your payment'
                );
            } else {
                Alert.alert(
                    'Success',
                    'Your subscription has been activated!',
                    [{ text: 'OK', onPress: () => navigation.goBack() }]
                );
            }
        } catch (error) {
            console.error('Subscription error:', error);
            Alert.alert('Error', error.response?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={[colors.background, colors.mapOverlay]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Premium Subscription</Text>
                        <View style={{ width: 24 }} />
                    </View> */}

                    {/* Premium Badge */}
                    <View style={styles.premiumBadgeContainer}>
                        <LinearGradient
                            colors={['#FFD700', '#FFA500']}
                            style={styles.premiumBadge}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Ionicons name="star" size={30} color="#000" />
                        </LinearGradient>
                    </View>

                    <Text style={styles.title}>Upgrade to Premium</Text>
                    <Text style={styles.description}>
                        Unlock exclusive features for your venue:
                    </Text>

                    {/* Feature Cards */}
                    <View style={styles.featuresContainer}>
                        <LinearGradient
                            colors={['rgba(5, 101, 98, 0.4)', 'rgba(5, 101, 98, 0.1)']}
                            style={styles.featureCard}
                        >
                            <View style={styles.featureIconContainer}>
                                <Ionicons name="trending-up" size={22} color={colors.textPrimary} />
                            </View>
                            <Text style={styles.featureTitle}>Featured Placement</Text>
                            <Text style={styles.featureDescription}>
                                Priority listing in search results and recommendations
                            </Text>
                        </LinearGradient>

                        <LinearGradient
                            colors={['rgba(5, 101, 98, 0.4)', 'rgba(5, 101, 98, 0.1)']}
                            style={styles.featureCard}
                        >
                            <View style={styles.featureIconContainer}>
                                <Ionicons name="analytics" size={22} color={colors.textPrimary} />
                            </View>
                            <Text style={styles.featureTitle}>Advanced Analytics</Text>
                            <Text style={styles.featureDescription}>
                                Detailed insights about your audience and event performance
                            </Text>
                        </LinearGradient>

                        <LinearGradient
                            colors={['rgba(5, 101, 98, 0.4)', 'rgba(5, 101, 98, 0.1)']}
                            style={styles.featureCard}
                        >
                            <View style={styles.featureIconContainer}>
                                <Ionicons name="headset" size={22} color={colors.textPrimary} />
                            </View>
                            <Text style={styles.featureTitle}>Priority Support</Text>
                            <Text style={styles.featureDescription}>
                                Fast response times from our dedicated support team
                            </Text>
                        </LinearGradient>

                        <LinearGradient
                            colors={['rgba(5, 101, 98, 0.4)', 'rgba(5, 101, 98, 0.1)']}
                            style={styles.featureCard}
                        >
                            <View style={styles.featureIconContainer}>
                                <Ionicons name="calendar" size={22} color={colors.textPrimary} />
                            </View>
                            <Text style={styles.featureTitle}>Unlimited Events</Text>
                            <Text style={styles.featureDescription}>
                                Create and promote as many events as you want
                            </Text>
                        </LinearGradient>
                    </View>

                    {/* Subscription Price */}
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Monthly subscription</Text>
                        <Text style={styles.price}>$30.00</Text>
                        <Text style={styles.billingInfo}>Billed monthly, cancel anytime</Text>
                    </View>

                    {/* Subscribe Button */}
                    <TouchableOpacity
                        style={[styles.subscribeButton, loading && styles.disabledButton]}
                        onPress={subscribe}
                        disabled={loading}
                    >
                        <LinearGradient
                            colors={[colors.accent, '#034946']}
                            style={styles.buttonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color={colors.textPrimary} />
                            ) : (
                                <>
                                    <Ionicons name="star" size={18} color={colors.textPrimary} />
                                    <Text style={styles.buttonText}>Subscribe Now</Text>
                                </>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Terms and Support */}
                    <Text style={styles.termsText}>
                        By subscribing, you agree to our Terms of Service and Privacy Policy
                    </Text>
                    <TouchableOpacity onPress={() => console.log('Support pressed')}>
                        <Text style={styles.supportText}>Need help? Contact support</Text>
                    </TouchableOpacity>
                </ScrollView>
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
        paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: Platform.OS === 'ios' ? 10 : 0,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        color: colors.textPrimary,
        fontSize: 18,
        fontWeight: '600',
    },
    premiumBadgeContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    premiumBadge: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    title: {
        color: colors.textPrimary,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: 25,
        paddingHorizontal: 20,
    },
    featuresContainer: {
        paddingHorizontal: 20,
    },
    featureCard: {
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    featureIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(5, 101, 98, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    featureTitle: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    featureDescription: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 20,
    },
    priceContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    priceLabel: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    price: {
        color: colors.textPrimary,
        fontSize: 32,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    billingInfo: {
        color: colors.textTertiary,
        fontSize: 12,
    },
    subscribeButton: {
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 30,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 30,
    },
    buttonText: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    disabledButton: {
        opacity: 0.7,
    },
    termsText: {
        color: colors.textTertiary,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 15,
        marginHorizontal: 20,
    },
    supportText: {
        color: colors.textSecondary,
        fontSize: 13,
        textAlign: 'center',
        marginTop: 15,
        textDecorationLine: 'underline',
    }
});

export default SubscriptionScreen;