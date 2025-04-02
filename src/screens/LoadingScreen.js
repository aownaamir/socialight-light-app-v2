import React, { use, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"; 
import { colors } from "../theme";


const LoadingScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("UserType");
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  },[])
  return (
    <LinearGradient colors={["#001716", "#013231","#016461"]} style={styles.gradient}>
        <View  style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/images/logo-circle.png")} style={styles.logo} />
      </View>
        <Text numberOfLines={2} style={styles.title}>Become a SOCIALIGHT</Text>        
        <View style={styles.exploreContainer}>
        <MaterialCommunityIcons name="chevron-double-up" size={17} color="#FFFFFF" />
        <Text  style={styles.explore}>Explore</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    paddingTop: 80,
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 45, 
  },
  logo: {
    width: 350, 
    height: 350, 
    resizeMode: "contain",
  },
  title: {
    paddingHorizontal: 30,
    fontSize: 35, 
    textAlign: "center",
    color: colors.textPrimary,
    fontFamily: "Poppins-Regular",
    marginBottom: 30,
  },
  highlight: {
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    fontSize: 36, 
  },
  exploreContainer:{
    marginTop: 90,
    // marginBottom:-100,
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    marginBottom: 3, 
  },
  
  explore: {
    fontSize: 17,
    // color: "#A3DAD6",
    color: colors.textPrimary,
    fontFamily: "Poppins-Light",
  },
});

export default LoadingScreen;
