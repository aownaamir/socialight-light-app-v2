// import React, { useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   Animated,
//   StatusBar,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// const { width } = Dimensions.get('window');
// const ITEM_WIDTH = width * 0.7;
// const ITEM_HEIGHT = ITEM_WIDTH * 1.3;
// const SPACING = 0; // We want items to overlap
// const VISIBLE_ITEMS = 3;

// const events = [
//   {
//     id: '1',
//     title: 'Forest Party',
//     location: 'Woodland',
//     image: 'https://via.placeholder.com/300x400/D3D3D3/000000?text=Forest',
//     date: '15 Oct',
//     active: false,
//   },
//   {
//     id: '2',
//     title: 'Bansko party',
//     location: 'Atena',
//     image: 'https://via.placeholder.com/300x400/4169E1/FFFFFF?text=Bansko', 
//     date: '20 Oct',
//     active: true,
//   },
//   {
//     id: '3',
//     title: 'Lantern Festival',
//     location: 'Asian Garden',
//     image: 'https://via.placeholder.com/300x400/FFA500/000000?text=Lanterns',
//     date: '25 Oct',
//     active: false,
//   },
// ];

// const StylishCarousel = () => {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const [currentIndex, setCurrentIndex] = useState(1);
  
//   const renderItem = ({ item, index }) => {
//     // Calculate the middle position
//     const inputRange = [
//       (index - 2) * ITEM_WIDTH,
//       (index - 1) * ITEM_WIDTH,
//       index * ITEM_WIDTH,
//     ];
    
//     // More dramatic rotation for side items
//     const rotate = scrollX.interpolate({
//       inputRange,
//       outputRange: ['25deg', '0deg', '-25deg'],
//       extrapolate: 'clamp',
//     });
    
//     // Scale center item larger
//     const scale = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.75, 1, 0.75],
//       extrapolate: 'clamp',
//     });
    
//     // Translate items on X-axis to create overlap
//     const translateX = scrollX.interpolate({
//       inputRange,
//       outputRange: [-width * 0.1, 0, width * 0.1],
//       extrapolate: 'clamp',
//     });
    
//     // More dramatic opacity changes
//     const opacity = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.6, 1, 0.6],
//       extrapolate: 'clamp',
//     });
    
//     // Z-index effect (bring center item forward)
//     const zIndex = scrollX.interpolate({
//       inputRange,
//       outputRange: [0, 10, 0],
//       extrapolate: 'clamp',
//     });
    
//     return (
//       <Animated.View
//         style={[
//           styles.itemContainer,
//           {
//             transform: [
//               { rotate },
//               { scale },
//               { translateX },
//             ],
//             opacity,
//             zIndex,
//           },
//         ]}
//       >
//         <Image source={{ uri: item.image }} style={styles.image} />
        
//         {/* Gradient Overlay */}
//         <LinearGradient
//           colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
//           style={styles.gradient}
//         />
        
//         {/* Sparkle Effect for center item (Blue card) */}
//         {item.title === 'Bansko party' && (
//           <View style={styles.sparkleContainer}>
//             {[...Array(20)].map((_, i) => (
//               <View 
//                 key={i} 
//                 style={[
//                   styles.sparkle,
//                   {
//                     top: `${Math.random() * 100}%`,
//                     left: `${Math.random() * 100}%`,
//                     width: Math.random() * 4 + 1,
//                     height: Math.random() * 4 + 1,
//                   }
//                 ]} 
//               />
//             ))}
//           </View>
//         )}
        
//         {/* Content Overlay */}
//         <View style={styles.overlayContent}>
//           {/* Date Badge */}
//           <View style={styles.dateContainer}>
//             <Text style={styles.dateText}>{item.date}</Text>
//           </View>
          
//           {/* Active Status */}
//           {item.active && (
//             <View style={styles.activeIndicator}>
//               <View style={styles.activeDot} />
//               <Text style={styles.activeText}>Active</Text>
//             </View>
//           )}
          
//           {/* Bottom Content */}
//           <View style={styles.bottomContent}>
//             <Text style={styles.title}>{item.title}</Text>
//             <View style={styles.locationContainer}>
//               <View style={styles.locationPin} />
//               <Text style={styles.location}>{item.location}</Text>
//             </View>
            
//             {/* Heart Icon */}
//             <TouchableOpacity style={styles.heartContainer}>
//               <View style={styles.heartOutline} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Animated.View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />
      
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerTitle}>Most popular event</Text>
//         <TouchableOpacity>
//           <Text style={styles.viewAllText}>view all</Text>
//         </TouchableOpacity>
//       </View>
      
//       <Animated.FlatList
//         data={events}
//         keyExtractor={(item) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.flatListContent}
//         snapToInterval={ITEM_WIDTH}
//         decelerationRate="fast"
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: true }
//         )}
//         onMomentumScrollEnd={(event) => {
//           const newIndex = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
//           setCurrentIndex(newIndex);
//         }}
//         renderItem={renderItem}
//         initialScrollIndex={1}
//         getItemLayout={(data, index) => ({
//           length: ITEM_WIDTH,
//           offset: ITEM_WIDTH * index,
//           index,
//         })}
//         snapToAlignment="center"
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0F1015',
//     paddingTop: 20,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 10,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   viewAllText: {
//     fontSize: 14,
//     color: '#4CAF50',
//     opacity: 0.6,
//   },
//   flatListContent: {
//     alignItems: 'center',
//     paddingVertical: 30,
//     paddingLeft: (width - ITEM_WIDTH) / 2 - 40, // Adjust for overlap
//     paddingRight: (width - ITEM_WIDTH) / 2 - 40, // Adjust for overlap
//   },
//   itemContainer: {
//     width: ITEM_WIDTH,
//     height: ITEM_HEIGHT,
//     marginHorizontal: SPACING,
//     borderRadius: 20,
//     overflow: 'hidden',
//     // Add shadow for elevation effect
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 15,
//     elevation: 10,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   gradient: {
//     ...StyleSheet.absoluteFillObject,
//     borderRadius: 20,
//   },
//   sparkleContainer: {
//     ...StyleSheet.absoluteFillObject,
//     zIndex: 1,
//   },
//   sparkle: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     opacity: 0.7,
//   },
//   overlayContent: {
//     ...StyleSheet.absoluteFillObject,
//     padding: 16,
//     justifyContent: 'space-between',
//     zIndex: 2,
//   },
//   dateContainer: {
//     position: 'absolute',
//     top: 15,
//     right: 15,
//     backgroundColor: 'rgba(0,150,136,0.9)',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   dateText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   activeIndicator: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'flex-start',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 15,
//     marginTop: 15,
//     marginLeft: 15,
//   },
//   activeDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#4CAF50',
//     marginRight: 6,
//   },
//   activeText: {
//     color: 'white',
//     fontSize: 12,
//   },
//   bottomContent: {
//     marginTop: 'auto',
//     padding: 10,
//   },
//   title: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   locationContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   locationPin: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: 'rgba(255,255,255,0.6)',
//     marginRight: 6,
//   },
//   location: {
//     color: 'rgba(255,255,255,0.8)',
//     fontSize: 14,
//   },
//   heartContainer: {
//     position: 'absolute',
//     right: 10,
//     bottom: 10,
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heartOutline: {
//     width: 24,
//     height: 24,
//     borderWidth: 1.5,
//     borderColor: 'white',
//     borderRadius: 12,
//   },
// });

// export default StylishCarousel;