import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.75;
const ITEM_HEIGHT = ITEM_WIDTH * 1.3;
const SPACING = 10;
const VISIBLE_ITEMS = 3;

const storyData = [
  {
    id: '1',
    title: 'Beach day',
    location: 'Miami',
    image: 'https://source.unsplash.com/random/300x500/?beach',
    date: '18th Oct',
  },
  {
    id: '2',
    title: 'Bansko party',
    location: 'Atena',
    image: 'https://source.unsplash.com/random/300x500/?party',
    active: true,
    date: '20th Oct',
  },
  {
    id: '3',
    title: 'Festival night',
    location: 'Berlin',
    image: 'https://source.unsplash.com/random/300x500/?festival',
    date: '22nd Oct',
  },
  {
    id: '4',
    title: 'Dinner event',
    location: 'Paris',
    image: 'https://source.unsplash.com/random/300x500/?dinner',
    date: '25th Oct',
  },
];

const CurvedCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  // Calculate the output range for perspective transform based on data length
  const calculatePerspective = (index) => {
    const outputRange = [...Array(storyData.length).keys()].map(i => {
      return i === index ? 0 : (i < index ? -30 : 30);
    });
    return outputRange;
  };

  const renderItem = ({ item, index }) => {
    // Calculate the input range based on card positions
    const inputRange = [
      (index - 2) * ITEM_WIDTH,
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
      (index + 2) * ITEM_WIDTH,
    ];

    // Calculate transforms for the semi-circular effect
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [50, 25, 0, 25, 50],
      extrapolate: 'clamp',
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 0.9, 1, 0.9, 0.8],
      extrapolate: 'clamp',
    });

    // This creates the tilting effect
    const rotateY = scrollX.interpolate({
      inputRange,
      outputRange: ['25deg', '15deg', '0deg', '-15deg', '-25deg'],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 0.8, 1, 0.8, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          {
            transform: [
              { translateY },
              { scale },
              { rotateY },
              { perspective: 1000 } // This helps with the 3D effect
            ],
            opacity,
          },
        ]}
      >
        {/* Date chip */}
        <View style={styles.dateChip}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        {/* Background Image */}
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Active indicator */}
        {item.active && (
          <View style={styles.activeIndicator}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Active</Text>
          </View>
        )}

        {/* Semi-transparent overlay */}
        <View style={styles.overlay} />

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color="#FFFFFF" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <TouchableOpacity style={styles.heartContainer}>
            <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={storyData}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.flatListContent}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={renderItem}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / ITEM_WIDTH
          );
          setCurrentIndex(index);
        }}
      />
      
      {/* Indicator dots */}
      <View style={styles.indicatorContainer}>
        {storyData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index ? styles.activeIndicator : styles.inactiveIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingTop: 50,
  },
  flatListContent: {
    alignItems: 'center',
    paddingHorizontal: width / 2 - ITEM_WIDTH / 2,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: SPACING / 2,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(97, 36, 36, 0.3)',
    borderRadius: 20,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 4,
  },
  heartContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  dateChip: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0, 128, 128, 0.8)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 2,
  },
  dateText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    top: 15,
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    zIndex: 2,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF00',
    marginRight: 6,
  },
  activeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
  },
  inactiveIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default CurvedCarousel;