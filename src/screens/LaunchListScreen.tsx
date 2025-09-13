// screens/LaunchListScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LaunchListItem from '../components/LaunchListItem';
import { Launch } from '../models/Launch';
import { getBookmarks } from '../services/storageService';
import { getLaunches, getNextLaunch } from '../services/spaceXService';
import CountdownTimer from '../components/CountdownTimer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderComponent from '../components/HeaderComponent';
import SpaceXLaunchUI from '../components/LandingPage';
import OngoingMissions from '../components/OngoingMission';

const { width } = Dimensions.get('window');

const LaunchListScreen: React.FC = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  console.log("launchesMission????",launches)
  const [nextLaunch, setNextLaunch] = useState<Launch | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const navigation = useNavigation();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load bookmarks first
      const savedBookmarks = await getBookmarks();
      setBookmarks(new Set(savedBookmarks));
      
      // Load launches
      const [launchesData, nextLaunchData] = await Promise.all([
        getLaunches(),
        getNextLaunch().catch(err => {
          console.error('Error fetching next launch:', err);
          return null;
        })
      ]);
      
      setLaunches(launchesData);
      setNextLaunch(nextLaunchData);
      
    } catch (err) {
      setError('Failed to load launches. Please try again.');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleBookmarkPress = useCallback(async (launchId: string) => {
    try {
      // This would be implemented in your storage service
      console.log('Bookmark pressed for:', launchId);
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  }, []);

  const handleLaunchPress = useCallback((launch: Launch) => {
    navigation.navigate('LaunchDetails', { launch });
  }, [navigation]);

  const handleWatchLive = useCallback(() => {
    if (nextLaunch && nextLaunch.links && nextLaunch.links.webcast) {
      Linking.openURL(nextLaunch.links.webcast);
    }
  }, [nextLaunch]);

  const filteredCompletedMissions = useCallback(() => {
    const now = new Date();
    const completed = launches.filter(launch => new Date(launch.date_utc) < now);
    
    if (!searchQuery) return completed;
    
    return completed.filter(mission => 
      mission.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [launches, searchQuery]);



  const renderUpcomingLaunches = useCallback(() => {
    const now = new Date();
    const upcoming = launches.filter(launch => new Date(launch.date_utc) > now);
    
    if (upcoming.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>UPCOMING LAUNCHES</Text>
        {upcoming.slice(0, 4).map((mission) => (
          <LaunchListItem
            key={mission.id}
            launch={mission}
            onPress={() => handleLaunchPress(mission)}
            onBookmark={() => handleBookmarkPress(mission.id)}
            isBookmarked={bookmarks.has(mission.id)}
            showCountdown={true}
            compact={true}
          />
        ))}
      </View>
    );
  }, [launches, handleLaunchPress, handleBookmarkPress, bookmarks]);

  const renderCompletedMissions = useCallback(() => {
    const filteredMissions = filteredCompletedMissions();
    
    if (filteredMissions.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>COMPLETED MISSIONS</Text>
        
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Mission Name"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>
        
        {filteredMissions.slice(0, 6).map((mission) => (
          <LaunchListItem
            key={mission.id}
            launch={mission}
            onPress={() => handleLaunchPress(mission)}
            onBookmark={() => handleBookmarkPress(mission.id)}
            isBookmarked={bookmarks.has(mission.id)}
            showCountdown={false}
            compact={true}
          />
        ))}
      </View>
    );
  }, [filteredCompletedMissions, searchQuery, handleLaunchPress, handleBookmarkPress, bookmarks]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#005288" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <HeaderComponent/>
      <SpaceXLaunchUI/>
      <OngoingMissions/>
      {renderUpcomingLaunches()}
      {renderCompletedMissions()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  headerContainer: {
    height: 300,
    backgroundColor: '#000',
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  countdownMain: {
    alignItems: 'center',
  },
  missionNameMain: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  watchButtonMain: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  watchButtonTextMain: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statsContainer: {
    paddingVertical: 20,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    letterSpacing: 2,
  },
  statLabel: {
    color: '#666',
    fontSize: 10,
    textAlign: 'center',
  },
  section: {
    padding: 15,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    letterSpacing: 1,
  },
  missionItem: {
    marginBottom: 20,
  },
  missionName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  missionTime: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 3,
  },
  missionDate: {
    color: '#666',
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    marginBottom: 15,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    height: 40,
  },
});

export default LaunchListScreen;