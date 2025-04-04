// import React from "react";
// import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
// import Carousel from "react-native-snap-carousel";

// const { width } = Dimensions.get("window");
// const ITEM_WIDTH = width * 0.7;
// const ITEM_HEIGHT = 250;

// const DATA = [
//   { id: "1", title: "Bansko party", image: "https://source.unsplash.com/800x600/?party" },
//   { id: "2", title: "Beach Party", image: "https://source.unsplash.com/800x600/?beach,party" },
//   { id: "3", title: "Music Night", image: "https://source.unsplash.com/800x600/?music,party" },
// ];

// const Card = ({ item }) => (
//   <View style={styles.card}>
//     <Image source={{ uri: item.image }} style={styles.image} />
//     <Text style={styles.title}>{item.title}</Text>
//   </View>
// );

// const Carousel2 = () => {
//   return (
//     <View style={styles.container}>
//       <Carousel
//         data={DATA}
//         renderItem={({ item }) => <Card item={item} />}
//         sliderWidth={width}
//         itemWidth={ITEM_WIDTH}
//         inactiveSlideScale={0.9}  // Scale effect for side items
//         inactiveSlideOpacity={0.7} // Dim effect for side items
//         loop
//         enableSnap
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0D0D0D",
//     justifyContent: "center",
//   },
//   card: {
//     width: ITEM_WIDTH,
//     height: ITEM_HEIGHT,
//     borderRadius: 20,
//     overflow: "hidden",
//     backgroundColor: "#1C1C1C",
//     alignItems: "center",
//   },
//   image: {
//     width: "100%",
//     height: "80%",
//     borderRadius: 20,
//   },
//   title: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 8,
//   },
// });

// export default Carousel2;
