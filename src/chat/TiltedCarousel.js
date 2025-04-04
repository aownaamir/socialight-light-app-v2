import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;
const SPACING = 10;
const VISIBLE_ITEMS = 3;

const events = [
  {
    id: '1',
    title: 'Beach Party',
    location: 'Miami',
    image: 'https://via.placeholder.com/300x400/87CEEB/000000?text=Beach+Party',
    date: '15 Oct',
    active: false,
  },
  {
    id: '2',
    title: 'Bansko party',
    location: 'Atena',
    image: 'https://via.placeholder.com/300x400/4169E1/FFFFFF?text=Bansko+Party',
    date: '20 Oct',
    active: true,
  },
  {
    id: '3',
    title: 'Festival Night',
    location: 'Berlin',
    image: 'https://via.placeholder.com/300x400/FFA500/000000?text=Festival+Night',
    date: '25 Oct',
    active: false,
  },
];

const TiltedCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(1);
  
  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 2) * ITEM_WIDTH,
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
    ];
    
    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [30, 0, 30],
      extrapolate: 'clamp',
    });
    
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });
    
    const rotate = scrollX.interpolate({
      inputRange,
      outputRange: ['10deg', '0deg', '-10deg'],
      extrapolate: 'clamp',
    });
    
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
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
              { rotate },
            ],
            opacity,
          },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.overlayContent}>
          {item.active && (
            <View style={styles.activeIndicator}>
              <View style={styles.activeDot} />
              <Text style={styles.activeText}>Active</Text>
            </View>
          )}
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.location}>{item.location}</Text>
            </View>
            <TouchableOpacity style={styles.heartContainer}>
              <Ionicons name="heart-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Most popular event</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>view all</Text>
        </TouchableOpacity>
      </View>
      
      <Animated.FlatList
        data={events}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
          setCurrentIndex(newIndex);
        }}
        renderItem={renderItem}
        initialScrollIndex={1}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  viewAllText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  flatListContent: {
    paddingVertical: 20,
    paddingLeft: (width - ITEM_WIDTH) / 2,
    paddingRight: (width - ITEM_WIDTH) / 2,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: SPACING / 2,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  overlayContent: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  activeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  activeText: {
    color: 'white',
    fontSize: 12,
  },
  dateContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,120,100,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  dateText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  titleContainer: {
    marginTop: 'auto',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginLeft: 5,
  },
  heartContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default TiltedCarousel;