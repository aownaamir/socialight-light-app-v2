import React, { useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.6; // Main card width
const ITEM_HEIGHT = 250; // Card height
const SPACING = 10; // Space between cards
const VISIBLE_ITEMS = 3; // Number of visible items

const events = [
  {
    id: '1',
    title: 'Bansko Party',
    date: '20th Oct',
    location: 'Atena',
    image: 'https://source.unsplash.com/random/300x300?party',
  },
  {
    id: '2',
    title: 'Nightlife Experience',
    date: '15th Oct',
    location: 'Ibiza',
    image: 'https://source.unsplash.com/random/300x300?nightlife',
  },
  {
    id: '3',
    title: 'Music Festival',
    date: '10th Nov',
    location: 'Berlin',
    image: 'https://source.unsplash.com/random/300x300?festival',
  },
  {
    id: '4',
    title: 'Beach Party',
    date: '5th Dec',
    location: 'Miami',
    image: 'https://source.unsplash.com/random/300x300?beach',
  },
];

const EventCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={events}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: (width - ITEM_WIDTH) / 2 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (ITEM_WIDTH + SPACING),
            index * (ITEM_WIDTH + SPACING),
            (index + 1) * (ITEM_WIDTH + SPACING),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8], // Middle card is bigger
            extrapolate: 'clamp',
          });

          const rotateY = scrollX.interpolate({
            inputRange,
            outputRange: ['30deg', '0deg', '-30deg'], // Tilt effect
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [{ scale }, { rotateY }],
                },
              ]}
            >
              <ImageBackground source={{ uri: item.image }} style={styles.image} imageStyle={{ borderRadius: 20 }}>
                <View style={styles.overlay}>
                  <View style={styles.dateBadge}>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.location}>📍 {item.location}</Text>
                </View>
              </ImageBackground>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  card: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: SPACING / 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000',
  },
  overlay: {
    padding: 15,
    backgroundColor: 'rgba(142, 127, 30, 0.5)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  location: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 5,
  },
  dateBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'teal',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  dateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EventCarousel;
