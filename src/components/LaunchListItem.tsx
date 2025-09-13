// components/LaunchListItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Launch } from '../models/Launch';
import { format } from 'date-fns';
import CountdownTimer from './CountdownTimer';

interface LaunchListItemProps {
  launch: Launch;
  onPress: () => void;
  showCountdown?: boolean;
  compact?: boolean;
}

const LaunchListItem: React.FC<LaunchListItemProps> = ({
  launch,
  onPress,
  showCountdown = false,
  compact = false,
}) => {
  // Format launchpad name to match SpaceX style
  const formatLaunchpad = (launchpad: string) => {
    if (launchpad.includes('SLC-4E')) return 'SLC-4E, CALIFORNIA';
    if (launchpad.includes('SLC-40')) return 'SLC-40, FLORIDA';
    if (launchpad.includes('LC-39A')) return 'LC-39A, FLORIDA';
    return launchpad;
  };

  // Determine landing type
  const getLandingType = () => {
    // This would be based on actual mission data
    const types = ['DRONESHIP', 'LANDING ZONE'];
    return types[Math.floor(Math.random() * types.length)];
  };

  if (compact) {
    return (
      <TouchableOpacity style={styles.compactContainer} onPress={onPress}>
        <View style={styles.compactDetails}>
          <Text style={styles.compactName}>{launch.name}</Text>
          
          {showCountdown && launch.date_utc && (
            <View style={styles.countdown}>
              <CountdownTimer targetDate={new Date(launch.date_utc)} />
            </View>
          )}
          
          {!showCountdown && (
            <Text style={styles.compactDate}>
              {format(new Date(launch.date_utc), 'MMMM d, yyyy').toUpperCase()}
            </Text>
          )}
          
          <View style={styles.compactInfo}>
            <Text style={styles.compactRocket}>FALCON 9</Text>
            <Text style={styles.compactLocation}>{formatLaunchpad(launch.launchpad)}</Text>
            <Text style={styles.compactOutcome}>{getLandingType()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image 
        source={{ uri: launch.links.patch.small || 'https://images2.imgbox.com/94/f2/NN6Ph45r_o.png' }} 
        style={styles.image}
        resizeMode="contain"
      />
      
      <View style={styles.details}>
        <Text style={styles.name}>{launch.name}</Text>
        
        {showCountdown && launch.date_utc && (
          <View style={styles.countdown}>
            <CountdownTimer targetDate={new Date(launch.date_utc)} />
          </View>
        )}
        
        {!showCountdown && (
          <Text style={styles.date}>
            {format(new Date(launch.date_utc), 'MMMM d, yyyy').toUpperCase()}
          </Text>
        )}
        
        <View style={styles.info}>
          <Text style={styles.rocket}>FALCON 9</Text>
          <Text style={styles.location}>{formatLaunchpad(launch.launchpad)}</Text>
          <Text style={styles.outcome}>{getLandingType()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#111',
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  compactContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#111',
    marginBottom: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  compactDetails: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  compactName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  date: {
    color: '#888',
    fontSize: 12,
    marginBottom: 8,
  },
  compactDate: {
    color: '#888',
    fontSize: 11,
    marginBottom: 6,
  },
  countdown: {
    marginBottom: 8,
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  compactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rocket: {
    color: '#666',
    fontSize: 12,
    marginRight: 10,
  },
  compactRocket: {
    color: '#666',
    fontSize: 10,
    marginRight: 8,
  },
  location: {
    color: '#666',
    fontSize: 12,
    marginRight: 10,
  },
  compactLocation: {
    color: '#666',
    fontSize: 10,
    marginRight: 8,
  },
  outcome: {
    color: '#666',
    fontSize: 12,
  },
  compactOutcome: {
    color: '#666',
    fontSize: 10,
  },
  bookmark: {
    padding: 5,
  },
  compactBookmark: {
    padding: 3,
  },
});

export default LaunchListItem;