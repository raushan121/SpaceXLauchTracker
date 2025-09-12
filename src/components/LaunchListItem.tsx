// components/LaunchListItem.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Launch } from '../models/Launch';

interface LaunchListItemProps {
  launch: Launch;
  onPress: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
}

const LaunchListItem: React.FC<LaunchListItemProps> = ({
  launch,
  onPress,
  onBookmark,
  isBookmarked,
}) => {
  console.log('Rendering LaunchListItem for:', launch);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {launch.links?.patch?.small ? (
          <Image
            source={{ uri: launch.links.patch.small }}
            style={styles.missionPatch}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.placeholderPatch}>
            <Icon name="image" size={24} color="#999" />
          </View>
        )}
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.missionName} numberOfLines={1}>
          {launch.name}
        </Text>
        <Text style={styles.rocketName}>
          {launch.rocket?.name}
        </Text>
        <Text style={styles.launchDate}>
          {new Date(launch.date_utc).toLocaleDateString()}
        </Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: launch.success ? '#4CAF50' : '#F44336' }
        ]}>
          <Text style={styles.statusText}>
            {launch.success ? 'Success' : 'Failed'}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity onPress={onBookmark} style={styles.bookmarkButton}>
        <Icon
          name={isBookmarked ? 'bookmark' : 'bookmark-border'}
          size={24}
          color={isBookmarked ? '#FFD700' : '#666'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 16,
  },
  missionPatch: {
    width: 50,
    height: 50,
  },
  placeholderPatch: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
  },
  detailsContainer: {
    flex: 1,
  },
  missionName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rocketName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  launchDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bookmarkButton: {
    padding: 8,
  },
});

export default LaunchListItem;