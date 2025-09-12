// // screens/LaunchListScreen.tsx
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   RefreshControl,
//   StyleSheet,
//   ActivityIndicator,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import LaunchListItem from '../components/LaunchListItem';
// import { Launch } from '../models/Launch';
// import { getBookmarks,toggleBookmark } from '../services/storageService';
// import { getLaunch, getLaunches } from '../services/spaceXService';

// const LaunchListScreen: React.FC = () => {
//   const [launches, setLaunches] = useState<Launch[]>([]);
//   const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
//   const [loading, setLoading] = useState<boolean>(true);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
  
//   const navigation = useNavigation();

//   const loadData = useCallback(async (isRefreshing = false) => {
//     try {
//       if (!isRefreshing) setLoading(true);
//       setError(null);
      
//       // Load bookmarks first
//       const savedBookmarks = await getBookmarks();
//       setBookmarks(new Set(savedBookmarks));
      
//       // Load launches
//       const launchesData = await getLaunches();
//       setLaunches(launchesData);
//     } catch (err) {
//       setError('Failed to load launches. Please try again.');
//       console.error('Error loading data:', err);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const handleRefresh = useCallback(() => {
//     setRefreshing(true);
//     loadData(true);
//   }, [loadData]);

//   const handleBookmarkPress = useCallback(async (launchId: string) => {
//     try {
//       const newBookmarks = await toggleBookmark(launchId);
//       setBookmarks(new Set(newBookmarks));
//     } catch (err) {
//       console.error('Error toggling bookmark:', err);
//     }
//   }, []);

//   const handleLaunchPress = useCallback((launch: Launch) => {
//     navigation.navigate('LaunchDetails', { launch });
//   }, [navigation]);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={launches}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <LaunchListItem
//             launch={item}
//             onPress={() => handleLaunchPress(item)}
//             onBookmark={() => handleBookmarkPress(item.id)}
//             isBookmarked={bookmarks.has(item.id)}
//           />
//         )}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     textAlign: 'center',
//     marginHorizontal: 20,
//   },
// });

// export default LaunchListScreen;



import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Animated,
  Dimensions
} from 'react-native';


const { width, height } = Dimensions.get('window');

const LaunchListScreen = ({ navigation }:any) => {
  const [launches, setLaunches] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));

  // Mock data - in a real app, you'd fetch from API
  useEffect(() => {
    loadLaunches();
  }, []);

  const loadLaunches = () => {
    // Simulate API call
    setTimeout(() => {
      const mockLaunches = [
        {
          id: '1',
          name: 'NUSANTARA SATU SAT RIA',
          date: 'FEBRUARY 2, 2024',
          rocket: 'FALCON 9',
          launchSite: 'SPACE LAUNCH COMPLEX 40, CAPE CANAVERAL, FLORIDA',
          success: true,
          image: 'https://www.spacex.com/static/images/share.jpg',
          video: 'https://www.youtube.com/embed/',
          details: 'SpaceX is targeting Friday, February 2 for a Falcon 9 launch of the Nusantara Lima mission to low-Earth orbit from Space Launch Complex 40 (SLC-40) at Cape Canaveral Space Force Station in Florida. The instantaneous launch window is at 4:34 p.m. ET (21:34 UTC).'
        },
        {
          id: '2',
          name: 'STARLINK MISSION',
          date: 'JANUARY 29, 2024',
          rocket: 'FALCON 9',
          launchSite: 'SPACE LAUNCH COMPLEX 40, CAPE CANAVERAL, FLORIDA',
          success: true,
          image: 'https://www.spacex.com/static/images/share.jpg',
          video: 'https://www.youtube.com/embed/',
          details: 'SpaceX is targeting Monday, January 29 for a Falcon 9 launch of 22 Starlink satellites to low-Earth orbit from Space Launch Complex 40 (SLC-40) at Cape Canaveral Space Force Station in Florida.'
        },
        {
          id: '3',
          name: 'CREW-8 MISSION',
          date: 'COMING SOON',
          rocket: 'FALCON 9',
          launchSite: 'LAUNCH COMPLEX 39A, KENNEDY SPACE CENTER, FLORIDA',
          success: null,
          image: 'https://www.spacex.com/static/images/share.jpg',
          video: '',
          details: 'SpaceX will launch Crew-8, its eighth crew rotation mission to the International Space Station, for NASA. Crew-8 will carry NASA astronauts and international partners to the orbital laboratory.'
        }
      ];
      setLaunches(mockLaunches);
      setRefreshing(false);
    }, 1000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadLaunches();
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 70],
    extrapolate: 'clamp'
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.launchItem}
      onPress={() => navigation.navigate('LaunchDetails', { launch: item })}
    >
      <Image source={{ uri: item.image }} style={styles.launchImage} />
      {/* <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      /> */}
      <View style={styles.launchContent}>
        <Text style={styles.launchDate}>{item.date}</Text>
        <Text style={styles.launchName}>{item.name}</Text>
        <Text style={styles.launchRocket}>{item.rocket}</Text>
        <Text style={styles.launchSite}>{item.launchSite}</Text>
        {item.success !== null && (
          <View style={[
            styles.statusBadge, 
            item.success ? styles.successBadge : styles.failureBadge
          ]}>
            <Text style={styles.statusText}>
              {item.success ? 'SUCCESS' : 'FAILURE'}
            </Text>
          </View>
        )}
        {item.success === null && (
          <View style={styles.upcomingBadge}>
            <Text style={styles.statusText}>UPCOMING</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Image 
          source={{ uri: 'https://www.spacex.com/static/images/logo.png' }} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>LAUNCHES</Text>
      </Animated.View>

      <FlatList
        data={launches}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  logo: {
    width: 150,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  listContent: {
    padding: 10,
  },
  launchItem: {
    height: 300,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  launchImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  launchContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  launchDate: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 5,
    fontWeight: '500',
    letterSpacing: 1,
  },
  launchName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  launchRocket: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 3,
  },
  launchSite: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 10,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  successBadge: {
    backgroundColor: '#00c853',
  },
  failureBadge: {
    backgroundColor: '#ff3d00',
  },
  upcomingBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#2979ff',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default LaunchListScreen;