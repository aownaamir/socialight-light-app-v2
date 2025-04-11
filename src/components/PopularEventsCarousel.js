import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Animated,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/index';
import { useAuth } from '../store/context/authContext';
import apiURL from '../apis/apiURL';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7; // Main card width
const ITEM_HEIGHT = 230; // Card height
const SPACING = -14; // Space between cards

const PopularEventsCarousel = ({ events, navigation }) => {
  const user = useAuth().user;
  // Create a duplicated array to enable the infinite scrolling effect
  const duplicatedEvents = [...events, ...events, ...events]; // Triple the array
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  // Calculate the initial scroll position to start in the middle section
  const initialScrollIndex = events.length;
  const initialScrollPosition = initialScrollIndex * (ITEM_WIDTH + SPACING);

  const handleNavigate = (item) => {

    const navigateTo = user.role === "influencer" ? 'HomeDetails' : "HomeCreate"
    navigation.navigate(navigateTo, { id: item._id })
  }

  useEffect(() => {
    // Set initial scroll position to the middle section
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: initialScrollPosition,
        animated: false
      });
    }

    // Add auto-scrolling animation if desired
    // const interval = setInterval(() => {
    //   if (flatListRef.current) {
    //     flatListRef.current.scrollToOffset({
    //       offset: scrollX._value + (ITEM_WIDTH + SPACING),
    //       animated: true
    //     });
    //   }
    // }, 3000);
    // return () => clearInterval(interval);
  }, []);

  // Handle scroll end to create the infinite scrolling effect
  const handleScrollEnd = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const totalWidth = events.length * (ITEM_WIDTH + SPACING);

    // If we've scrolled to the end of the first set or beginning of the third set,
    // jump to the corresponding position in the middle set
    if (scrollPosition < (ITEM_WIDTH + SPACING)) {
      // Scrolled to the beginning of the first set, jump to beginning of second set
      flatListRef.current.scrollToOffset({
        offset: scrollPosition + totalWidth,
        animated: false
      });
    } else if (scrollPosition > initialScrollPosition + totalWidth - (ITEM_WIDTH + SPACING)) {
      // Scrolled to the end of the third set, jump to end of second set
      flatListRef.current.scrollToOffset({
        offset: scrollPosition - totalWidth,
        animated: false
      });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={duplicatedEvents}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: (width - ITEM_WIDTH) / 2 }}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScrollEnd}
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

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
          });

          // Properly handle the image source to avoid type errors
          const imageSource = typeof item.image === 'string'
            ? { uri: item.image }
            : item.image || item.coverImage;

          return (
            <Animated.View
              style={[
                styles.animatedCardContainer,
                {
                  transform: [{ scale }, { rotateY }],
                  opacity,
                },
              ]}
            >
              <Pressable
                style={styles.card}
                onPress={() => handleNavigate(item)}
              >
                <ImageBackground
                  source={{ uri: `${apiURL}/uploads/${item.event_photos[0]}` }}
                  style={styles.horizontalImage}
                  imageStyle={styles.horizontalImageStyle}
                >
                  {item.date && (
                    <View style={styles.dateChip}>
                      <Text style={styles.dateText}>
                        {item.date.includes('at') ? item.date.split(' at')[0] : item.date}
                      </Text>
                    </View>
                  )}

                  {item.status && (
                    <View style={styles.statusChip}>
                      <View style={styles.statusDot} />
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                  )}

                  <View style={styles.horizontalEventInfo}>
                    <Text style={styles.eventName}>{item.title}</Text>
                    {item.location && (
                      <View style={styles.locationContainer}>
                        <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                        <Text style={styles.locationText}>
                          {item.location.address}
                        </Text>
                      </View>
                    )}
                  </View>

                  <Pressable style={styles.favoriteButton}>
                    <Ionicons name="heart-outline" size={18} color={colors.textPrimary} />
                  </Pressable>
                </ImageBackground>
              </Pressable>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  animatedCardContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: SPACING / 2,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  horizontalImage: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  horizontalImageStyle: {
    borderRadius: 15,
  },
  horizontalEventInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 8,
  },
  dateChip: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 160, 133, 0.8)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    position: 'absolute',
    top: 10,
    left: 10,
  },
  dateText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 5,
  },
  statusText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontWeight: '500',
  },
  eventName: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 3,
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    bottom: 42,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PopularEventsCarousel;