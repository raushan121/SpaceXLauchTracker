import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Launch } from '../models/Launch';
// import LinearGradient from 'react-native-linear-gradient';

type RootStackParamList = {
  LaunchDetails: { launch: Launch };
};

type LaunchDetailScreenRouteProp = RouteProp<RootStackParamList, 'LaunchDetails'>;
type LaunchDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LaunchDetails'>;

interface Props {
  route: LaunchDetailScreenRouteProp;
  navigation: LaunchDetailScreenNavigationProp;
}

const LaunchDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { launch } = route.params;

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#0a0a0a',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
      },
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      
      {/* Header Section with Gradient Background */}
      <View
   
        style={styles.header}
      >
        {launch.links?.patch?.large ? (
          <Image
            source={{ uri: launch.links.patch.large }}
            style={styles.missionPatch}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.placeholderPatch}>
            <Icon name="rocket" size={64} color="#4cc9f0" />
          </View>
        )}
        
        <Text style={styles.missionName}>{launch.name}</Text>
        
        <View style={[
          styles.statusBadge,
          { backgroundColor: launch.success ? '#4CAF50' : '#F44336' }
        ]}>
          <Icon 
            name={launch.success ? "check-circle" : "error"} 
            size={16} 
            color="white" 
            style={styles.statusIcon}
          />
          <Text style={styles.statusText}>
            {launch.success ? 'SUCCESSFUL LAUNCH' : 'LAUNCH FAILED'}
          </Text>
        </View>

        {launch.date_utc && (
          <Text style={styles.launchDate}>
            {formatDate(launch.date_utc)}
          </Text>
        )}
      </View>

      {/* Launch Details Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="info" size={20} color="#4cc9f0" />
          <Text style={styles.sectionTitle}>MISSION DETAILS</Text>
        </View>
        
        {launch.details ? (
          <Text style={styles.detailText}>{launch.details}</Text>
        ) : (
          <Text style={styles.noDetailsText}>No mission details available</Text>
        )}

        <View style={styles.detailRow}>
          <Icon name="place" size={18} color="#4cc9f0" style={styles.detailIcon} />
          <View>
            <Text style={styles.detailLabel}>LAUNCH SITE</Text>
            <Text style={styles.detailValue}>
              {launch.launchpad?.name || 'Unknown launch site'}
            </Text>
          </View>
        </View>

        {launch.flight_number && (
          <View style={styles.detailRow}>
            <Icon name="list" size={18} color="#4cc9f0" style={styles.detailIcon} />
            <View>
              <Text style={styles.detailLabel}>FLIGHT NUMBER</Text>
              <Text style={styles.detailValue}>#{launch.flight_number}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Rocket Information Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="rocket" size={20} color="#4cc9f0" />
          <Text style={styles.sectionTitle}>ROCKET INFORMATION</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="precision-manufacturing" size={18} color="#4cc9f0" style={styles.detailIcon} />
          <View>
            <Text style={styles.detailLabel}>ROCKET NAME</Text>
            <Text style={styles.detailValue}>
              {launch.rocket?.name || 'Unknown rocket'}
            </Text>
          </View>
        </View>

        {launch.rocket?.type && (
          <View style={styles.detailRow}>
            <Icon name="category" size={18} color="#4cc9f0" style={styles.detailIcon} />
            <View>
              <Text style={styles.detailLabel}>ROCKET TYPE</Text>
              <Text style={styles.detailValue}>{launch.rocket.type}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Related Links Section */}
      {launch.links && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="link" size={20} color="#4cc9f0" />
            <Text style={styles.sectionTitle}>RELATED LINKS</Text>
          </View>

          {launch.links.article && (
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => handleLinkPress(launch.links.article!)}
            >
              <Icon name="article" size={22} color="#4cc9f0" />
              <Text style={styles.linkText}>Read Article</Text>
              <Icon name="chevron-right" size={22} color="#666" />
            </TouchableOpacity>
          )}

          {launch.links.webcast && (
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => handleLinkPress(launch.links.webcast!)}
            >
              <Icon name="videocam" size={22} color="#4cc9f0" />
              <Text style={styles.linkText}>Watch Webcast</Text>
              <Icon name="chevron-right" size={22} color="#666" />
            </TouchableOpacity>
          )}

          {launch.links.wikipedia && (
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => handleLinkPress(launch.links.wikipedia!)}
            >
              <Icon name="public" size={22} color="#4cc9f0" />
              <Text style={styles.linkText}>Wikipedia Article</Text>
              <Icon name="chevron-right" size={22} color="#666" />
            </TouchableOpacity>
          )}

          {launch.links.flickr?.original && launch.links.flickr.original.length > 0 && (
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => handleLinkPress(launch.links.flickr.original[0])}
            >
              <Icon name="photo-library" size={22} color="#4cc9f0" />
              <Text style={styles.linkText}>View Photos</Text>
              <Icon name="chevron-right" size={22} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Footer Spacer */}
      <View style={styles.footerSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    alignItems: 'center',
    padding: 30,
    paddingTop: 40,
  },
  missionPatch: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  placeholderPatch: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 201, 240, 0.1)',
    borderRadius: 70,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(76, 201, 240, 0.3)',
  },
  missionName: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
    letterSpacing: 0.5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  statusIcon: {
    marginRight: 6,
  },
  statusText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  launchDate: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
    color: '#fff',
    letterSpacing: 0.5,
  },
  detailText: {
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
  },
  noDetailsText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.5)',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIcon: {
    marginRight: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
    fontWeight: '500',
  },
  footerSpacer: {
    height: 30,
  },
});

export default LaunchDetailScreen;