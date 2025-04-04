import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING = 12;

const storyData = [
  {
    id: '1',
    title: 'Beach day',
    location: 'Miami',
    image: 'https://source.unsplash.com/random/300x500/?beach',
    active: false,
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
    active: false,
    date: '22nd Oct',
  },
  {
    id: '4',
    title: 'Dinner event',
    location: 'Paris',
    image: 'https://source.unsplash.com/random/300x500/?dinner',
    active: false,
    date: '25th Oct',
  },
];

const StoryCard = ({ item, index }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Date chip at top */}
      <View style={styles.dateChip}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      
      {/* Background Image */}
      <Image 
        source={{ uri: item.image }} 
        style={styles.cardImage} 
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
      
      {/* Bottom content */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color="#FFFFFF" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <TouchableOpacity style={styles.heartContainer}>
          <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HorizontalScrollCarousel = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <FlatList
        ref={flatListRef}
        data={storyData}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item, index }) => <StoryCard item={item} index={index} />}
      />
      
      {/* Optional: Add indicator dots */}
      <View style={styles.indicatorContainer}>
        {storyData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index ? styles.activeIndicatorDot : styles.inactiveIndicatorDot,
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
    paddingVertical: 20,
  },
  flatListContent: {
    paddingHorizontal: SPACING,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: 500,
    marginHorizontal: SPACING / 2,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  cardContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  cardTitle: {
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
  activeIndicatorDot: {
    backgroundColor: '#FFFFFF',
  },
  inactiveIndicatorDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
});

export default HorizontalScrollCarousel;