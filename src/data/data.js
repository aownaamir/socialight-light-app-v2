export const eventsArray = [
  {
    id: '1',
    title: 'Bansko party',
    location: 'Atena',
    date: '20th Oct',
    time: '10:00 PM',
    timeAgo: '',
    status: 'Active',
    image: require('../../assets/images/events/bansko-party.jpg'),
    fullAddress: 'Atena Club, 123 Party Street',
    description: 'Join us for the hottest party in Bansko! Great music, amazing atmosphere and unforgettable memories await you at this exclusive event.',
    organizer: {
      name: 'Atena Club',
      avatar: require('../../assets/images/organizer-avatar.png'),
    },
    coverImage: require('../../assets/images/events/bansko-party.jpg'),
    attendees: [
      { id: 1, name: 'Bert Berisaj', username: '@__berti', status: 'Attended', avatar: require('../../assets/images/attendee1.png') },
      { id: 2, name: 'Ana Kovač', username: '@ana_k', status: 'Accepted', avatar: require('../../assets/images/attendee2.png') },
      { id: 3, name: 'Marko Novak', username: '@m_novak', status: 'Pending', avatar: require('../../assets/images/attendee3.png') },
      { id: 4, name: 'Elena Popović', username: '@elena_p', status: 'Accepted', avatar: require('../../assets/images/attendee4.png') },
    ],
    stats: {
      all: 24,
      approved: 18,
      pending: 6,
      attended: 12,
      unattended: 6
    },
    rules: [
      'No smoking inside',
      'Smart casual dress code',
    ],
    offers: [
      'First drink free',
      'VIP area available',
    ],
    mapCoordinates: {
      latitude: 41.8375,
      longitude: 23.4868,
    }
  },
  {
    id: '2',
    title: 'Fashion collection',
    location: 'Atena',
    date: '20th Oct',
    time: '7:00 PM - 11:00 PM',
    timeAgo: '2h ago',
    status: 'Active',
    image: require('../../assets/images/events/fashion-collection.jpg'),
    fullAddress: 'Atena Fashion Hall, 45 Style Avenue',
    description: 'Discover the latest fashion trends at our exclusive collection showcase. Top designers, stunning models, and the season\'s hottest looks all in one place.',
    organizer: {
      name: 'Atena Fashion',
      avatar: require('../../assets/images/organizer-avatar.png'),
    },
    coverImage: require('../../assets/images/events/fashion-collection.jpg'),
    attendees: [
      { id: 1, name: 'Bert Berisaj', username: '@__berti', status: 'Attended', avatar: require('../../assets/images/attendee1.png') },
      { id: 2, name: 'Ana Kovač', username: '@ana_k', status: 'Accepted', avatar: require('../../assets/images/attendee2.png') },
      { id: 3, name: 'Marko Novak', username: '@m_novak', status: 'Pending', avatar: require('../../assets/images/attendee3.png') },
      { id: 4, name: 'Elena Popović', username: '@elena_p', status: 'Accepted', avatar: require('../../assets/images/attendee4.png') },
    ],
    stats: {
      all: 42,
      approved: 35,
      pending: 7,
      attended: 28,
      unattended: 7
    },
    rules: [
      'Photography allowed',
      'Formal attire required',
    ],
    offers: [
      'Complimentary champagne',
      'Exclusive after-party access',
    ],
    mapCoordinates: {
      latitude: 41.8401,
      longitude: 23.4891,
    }
  },
  {
    id: '3',
    title: 'DJ Atena',
    date: '23rd October at 1PM',
    timeAgo: '2h ago',
    image: require('../../assets/images/events/dj-atena.jpg'),
    time: '1:00 PM - 6:00 PM',
    status: 'Active',
    location: 'Bansko Music Club',
    fullAddress: 'Bansko Music Club, 78 Beat Street',
    description: 'Experience a mind-blowing set from the legendary DJ Atena. Get ready for heart-pounding electronic music and an electric atmosphere that will keep you dancing all day.',
    organizer: {
      name: 'Bansko Music Club',
      avatar: require('../../assets/images/organizer-avatar.png'),
    },
    coverImage: require('../../assets/images/events/dj-atena.jpg'),
    attendees: [
      { id: 1, name: 'Bert Berisaj', username: '@__berti', status: 'Attended', avatar: require('../../assets/images/attendee1.png') },
      { id: 2, name: 'Ana Kovač', username: '@ana_k', status: 'Accepted', avatar: require('../../assets/images/attendee2.png') },
      { id: 3, name: 'Marko Novak', username: '@m_novak', status: 'Pending', avatar: require('../../assets/images/attendee3.png') },
      { id: 4, name: 'Elena Popović', username: '@elena_p', status: 'Accepted', avatar: require('../../assets/images/attendee4.png') },
    ],
    stats: {
      all: 68,
      approved: 52,
      pending: 16,
      attended: 38,
      unattended: 14
    },
    rules: [
      'No outside drinks',
      'ID required for entry',
    ],
    offers: [
      'Happy hour until 3PM',
      'Meet & greet with DJ Atena',
    ],
    mapCoordinates: {
      latitude: 41.8356,
      longitude: 23.4902,
    }
  },
  {
    id: '4',
    title: 'Dance party',
    date: '1st October at 7PM',
    timeAgo: '6h ago',
    image: require('../../assets/images/events/dance-party.jpg'),
    time: '7:00 PM - 2:00 AM',
    status: 'Completed',
    location: 'Rhythm Hall',
    fullAddress: 'Rhythm Hall, 56 Dance Boulevard',
    description: 'Get your groove on at our annual dance party! Multiple dance floors, various styles, and instructors available to help beginners. This is the ultimate dance celebration for everyone.',
    organizer: {
      name: 'Dance Collective',
      avatar: require('../../assets/images/organizer-avatar.png'),
    },
    coverImage: require('../../assets/images/events/dance-party.jpg'),
    attendees: [
      { id: 1, name: 'Bert Berisaj', username: '@__berti', status: 'Attended', avatar: require('../../assets/images/attendee1.png') },
      { id: 2, name: 'Ana Kovač', username: '@ana_k', status: 'Accepted', avatar: require('../../assets/images/attendee2.png') },
      { id: 3, name: 'Marko Novak', username: '@m_novak', status: 'Pending', avatar: require('../../assets/images/attendee3.png') },
      { id: 4, name: 'Elena Popović', username: '@elena_p', status: 'Accepted', avatar: require('../../assets/images/attendee4.png') },
    ],
    stats: {
      all: 86,
      approved: 74,
      pending: 12,
      attended: 65,
      unattended: 9
    },
    rules: [
      'Comfortable shoes recommended',
      'All skill levels welcome',
    ],
    offers: [
      'Free dance class for first-timers',
      'Drink specials all night',
    ],
    mapCoordinates: {
      latitude: 41.8427,
      longitude: 23.4788,
    }
  },
  {
    id: '5',
    title: 'Mask party',
    date: '2nd September at 9PM',
    timeAgo: '12h ago',
    image: require('../../assets/images/events/mask-party.jpg'),
    time: '9:00 PM - 3:00 AM',
    status: 'Completed',
    location: 'Mystery Lounge',
    fullAddress: 'Mystery Lounge, 99 Enigma Road',
    description: 'An evening of intrigue and anonymity awaits at our exclusive mask party. Don your most creative mask and immerse yourself in a night where identities are hidden and possibilities endless.',
    organizer: {
      name: 'Enigma Events',
      avatar: require('../../assets/images/organizer-avatar.png'),
    },
    coverImage: require('../../assets/images/events/mask-party.jpg'),
    attendees: [
      { id: 1, name: 'Bert Berisaj', username: '@__berti', status: 'Attended', avatar: require('../../assets/images/attendee1.png') },
      { id: 2, name: 'Ana Kovač', username: '@ana_k', status: 'Accepted', avatar: require('../../assets/images/attendee2.png') },
      { id: 3, name: 'Marko Novak', username: '@m_novak', status: 'Pending', avatar: require('../../assets/images/attendee3.png') },
      { id: 4, name: 'Elena Popović', username: '@elena_p', status: 'Accepted', avatar: require('../../assets/images/attendee4.png') },
    ],
    stats: {
      all: 120,
      approved: 98,
      pending: 22,
      attended: 85,
      unattended: 13
    },
    rules: [
      'Masks must be worn until midnight',
      'No photos allowed in certain areas',
    ],
    offers: [
      'Mask contest with prizes',
      'Secret performances throughout the night',
    ],
    mapCoordinates: {
      latitude: 41.8312,
      longitude: 23.4754,
    }
  },
]



// map functions in earlier create events screen
// const getCurrentLocation = async () => {
//   try {
//     const location = await Location.getCurrentPositionAsync({
//       accuracy: Location.Accuracy.High
//     });

//     const { latitude, longitude } = location.coords;


//     setMapRegion({
//       latitude,
//       longitude,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     });


//     const addressResponse = await Location.reverseGeocodeAsync({
//       latitude,
//       longitude
//     });

//     if (addressResponse && addressResponse.length > 0) {
//       const address = addressResponse[0];
//       const formattedAddress = `${address.name || ''} ${address.street || ''}, ${address.city || ''}, ${address.region || ''}, ${address.country || ''}`.trim();


//       setLocationData({
//         coordinates: [longitude, latitude],
//         address: formattedAddress
//       });


//       setLocation(formattedAddress);
//     }
//   } catch (error) {
//     console.error('Error getting location:', error);
//     Alert.alert('Error', 'Failed to get your current location.');
//   }
// };

// const requestLocationPermission = async () => {
//   const { status } = await Location.requestForegroundPermissionsAsync();
//   setLocationPermission(status);

//   if (status === 'granted') {
//     getCurrentLocation();
//   } else {
//     Alert.alert('Permission denied', 'Location permission is required to select a venue location.');
//   }
// };

// const handleMapPress = async (event) => {
//   const { coordinate } = event.nativeEvent;
//   const { latitude, longitude } = coordinate;


//   // setMapRegion({
//   //   ...mapRegion,
//   //   latitude,
//   //   longitude
//   // });
//   setMapRegion({
//     ...mapRegion,
//     latitude,
//     longitude
//   });


//   const addressResponse = await Location.reverseGeocodeAsync({
//     latitude,
//     longitude
//   });

//   if (addressResponse && addressResponse.length > 0) {
//     const address = addressResponse[0];
//     const formattedAddress = `${address.name || ''} ${address.street || ''}, ${address.city || ''}, ${address.region || ''}, ${address.country || ''}`.trim();


//     setLocationData({
//       coordinates: [longitude, latitude],
//       address: formattedAddress
//     });


//     setLocation(formattedAddress);
//   }
// };

// const searchLocation = async () => {
//   if (searchQuery.trim() === '') return;

//   try {
//     const searchResults = await Location.geocodeAsync(searchQuery);

//     if (searchResults && searchResults.length > 0) {
//       const { latitude, longitude } = searchResults[0];

//       // Update map region
//       const newRegion = {
//         latitude,
//         longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       };

//       setMapRegion(newRegion);

//       // Animate map to the new location
//       mapRef.current?.animateToRegion(newRegion, 1000);

//       // Get address for the selected location
//       const addressResponse = await Location.reverseGeocodeAsync({
//         latitude,
//         longitude
//       });

//       if (addressResponse && addressResponse.length > 0) {
//         const address = addressResponse[0];
//         const formattedAddress = `${address.name || ''} ${address.street || ''}, ${address.city || ''}, ${address.region || ''}, ${address.country || ''}`.trim();

//         setLocationData({
//           coordinates: [longitude, latitude],
//           address: formattedAddress
//         });

//         setLocation(formattedAddress);
//       }
//     } else {
//       Alert.alert('Location not found', 'Please try a different search term.');
//     }
//   } catch (error) {
//     console.error('Error searching location:', error);
//     Alert.alert('Error', 'Failed to search for the location.');
//   }
// };

// const openLocationPicker = async () => {
//   // If permission not granted yet, request it
//   if (locationPermission !== 'granted') {
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     setLocationPermission(status);

//     if (status !== 'granted') {
//       Alert.alert('Permission denied', 'Location permission is required to select a venue location.');
//       return;
//     }
//   }

//   // Set search query to current location text
//   if (location) {
//     setSearchQuery(location);
//   }

//   // Check if we already have coordinates for the current location
//   if (locationData.coordinates[0] !== 0 && locationData.coordinates[1] !== 0) {
//     // Use existing coordinates to set map region
//     setMapRegion({
//       latitude: locationData.coordinates[1],  // Note: locationData is [lng, lat]
//       longitude: locationData.coordinates[0], // So we swap them here
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     });
//   } else if (location && location.trim() !== '') {
//     // Try to geocode the current text input value
//     try {
//       const results = await Location.geocodeAsync(location);

//       if (results && results.length > 0) {
//         const { latitude, longitude } = results[0];

//         // Update map region to this location
//         setMapRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         });

//         // Also update locationData with these coordinates
//         setLocationData({
//           coordinates: [longitude, latitude],
//           address: location
//         });
//       } else {
//         // If geocoding fails, fall back to current location
//         getCurrentLocation();
//       }
//     } catch (error) {
//       console.error('Error geocoding address for map:', error);
//       // Fall back to current location
//       getCurrentLocation();
//     }
//   } else {
//     // No location set yet, use current location
//     getCurrentLocation();
//   }

//   // Show modal
//   setMapModalVisible(true);
// };

// const confirmLocation = async () => {
//   try {
//     const { latitude, longitude } = mapRegion;

//     // Get address for the selected location
//     const addressResponse = await Location.reverseGeocodeAsync({
//       latitude,
//       longitude
//     });

//     if (addressResponse && addressResponse.length > 0) {
//       const address = addressResponse[0];
//       const formattedAddress = `${address.name || ''} ${address.street || ''}, ${address.city || ''}, ${address.region || ''}, ${address.country || ''}`.trim();

//       setLocationData({
//         coordinates: [longitude, latitude],
//         address: formattedAddress
//       });

//       setLocation(formattedAddress);
//     }

//     // Close the modal
//     setMapModalVisible(false);
//   } catch (error) {
//     console.error('Error confirming location:', error);
//     Alert.alert('Error', 'Failed to get address for the selected location.');
//   }
// };

// const handleLocationInputChange = (text) => {
//   setLocation(text);
// };

// const handleLocationInputSubmit = async () => {
//   if (!location.trim()) return;

//   try {
//     const results = await Location.geocodeAsync(location);

//     if (results && results.length > 0) {
//       const { latitude, longitude } = results[0];

//       // Update locationData with coordinates
//       setLocationData({
//         coordinates: [longitude, latitude],
//         address: location
//       });

//       // Update map region (useful if the map is opened later)
//       setMapRegion({
//         latitude,
//         longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       });
//     } else {
//       // Keep the text but ask if they want to pick on map
//       Alert.alert(
//         'Address Not Found',
//         'Could not find this address on the map. Would you like to pick the location manually?',
//         [
//           { text: 'No, keep as is' },
//           {
//             text: 'Pick on Map',
//             // onPress: openLocationPicker
//           }
//         ]
//       );
//     }
//   } catch (error) {
//     console.error('Error geocoding manual address:', error);
//   }
// };