// // screens/LaunchDetailScreen.tsx
// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Linking,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { RouteProp } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { Launch } from '../models/Launch';

// type RootStackParamList = {
//   LaunchDetails: { launch: Launch };
// };

// type LaunchDetailScreenRouteProp = RouteProp<RootStackParamList, 'LaunchDetails'>;
// type LaunchDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LaunchDetails'>;

// interface Props {
//   route: LaunchDetailScreenRouteProp;
//   navigation: LaunchDetailScreenNavigationProp;
// }

// const LaunchDetailScreen: React.FC<Props> = ({ route }) => {
//   const { launch } = route.params;

//   const handleLinkPress = (url: string) => {
//     Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         {launch.links?.patch?.large ? (
//           <Image
//             source={{ uri: launch.links.patch.large }}
//             style={styles.missionPatch}
//             resizeMode="contain"
//           />
//         ) : (
//           <View style={styles.placeholderPatch}>
//             <Icon name="image" size={64} color="#999" />
//           </View>
//         )}
//         <Text style={styles.missionName}>{launch.name}</Text>
//         <View style={[
//           styles.statusBadge,
//           { backgroundColor: launch.success ? '#4CAF50' : '#F44336' }
//         ]}>
//           <Text style={styles.statusText}>
//             {launch.success ? 'Successful Launch' : 'Failed Launch'}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Launch Details</Text>
//         <Text style={styles.detailText}>
//           Date: {new Date(launch.date_utc).toLocaleString()}
//         </Text>
//         {launch.details && (
//           <Text style={styles.detailText}>{launch.details}</Text>
//         )}
//         <Text style={styles.detailText}>
//           Launch Site: {launch.launchpad?.name || 'Unknown'}
//         </Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Rocket Information</Text>
//         <Text style={styles.detailText}>
//           Name: {launch.rocket?.name}
//         </Text>
//         <Text style={styles.detailText}>
//           Type: {launch.rocket?.type || 'N/A'}
//         </Text>
//       </View>

//       {launch.links && (
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Related Links</Text>
//           {launch.links.article && (
//             <TouchableOpacity 
//               style={styles.linkButton}
//               onPress={() => handleLinkPress(launch.links.article!)}
//             >
//               <Icon name="article" size={20} color="#1976D2" />
//               <Text style={styles.linkText}>Read Article</Text>
//             </TouchableOpacity>
//           )}
//           {launch.links.webcast && (
//             <TouchableOpacity 
//               style={styles.linkButton}
//               onPress={() => handleLinkPress(launch.links.webcast!)}
//             >
//               <Icon name="videocam" size={20} color="#1976D2" />
//               <Text style={styles.linkText}>Watch Webcast</Text>
//             </TouchableOpacity>
//           )}
//           {launch.links.wikipedia && (
//             <TouchableOpacity 
//               style={styles.linkButton}
//               onPress={() => handleLinkPress(launch.links.wikipedia!)}
//             >
//               <Icon name="public" size={20} color="#1976D2" />
//               <Text style={styles.linkText}>Wikipedia Article</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   missionPatch: {
//     width: 150,
//     height: 150,
//     marginBottom: 16,
//   },
//   placeholderPatch: {
//     width: 150,
//     height: 150,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 75,
//     marginBottom: 16,
//   },
//   missionName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   statusBadge: {
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 16,
//   },
//   statusText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   section: {
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#333',
//   },
//   detailText: {
//     fontSize: 16,
//     marginBottom: 8,
//     lineHeight: 22,
//   },
//   linkButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   linkText: {
//     fontSize: 16,
//     color: '#1976D2',
//     marginLeft: 10,
//   },
// });

// export default LaunchDetailScreen;





import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
  SafeAreaView,
  Animated
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const LaunchDetailsScreen = ({ route, navigation }) => {
  const { launch } = route.params;
  const [scrollY] = useState(new Animated.Value(0));

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const openVideo = () => {
    if (launch.video) {
      Linking.openURL(launch.video);
    }
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{launch.name}</Text>
      </Animated.View>

      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.heroSection}>
          <Image source={{ uri: launch.image }} style={styles.heroImage} />
          {/* <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.heroGradient}
          /> */}
          <View style={styles.heroContent}>
            <Text style={styles.heroDate}>{launch.date}</Text>
            <Text style={styles.heroName}>{launch.name}</Text>
            <Text style={styles.heroRocket}>{launch.rocket}</Text>
          </View>
        </View>

        <View style={styles.contentSection}>
          <View style={styles.detailsCard}>
            <Text style={styles.sectionTitle}>MISSION DETAILS</Text>
            <Text style={styles.detailsText}>{launch.details}</Text>
            
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>LAUNCH SITE</Text>
                <Text style={styles.infoValue}>{launch.launchSite}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>ROCKET</Text>
                <Text style={styles.infoValue}>{launch.rocket}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>STATUS</Text>
                <View style={[
                  styles.statusBadge, 
                  launch.success ? styles.successBadge : launch.success === null ? styles.upcomingBadge : styles.failureBadge
                ]}>
                  <Text style={styles.statusText}>
                    {launch.success ? 'SUCCESS' : launch.success === null ? 'UPCOMING' : 'FAILURE'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {launch.video && (
            <TouchableOpacity style={styles.watchButton} onPress={openVideo}>
              <Icon name="play-circle" size={24} color="#fff" />
              <Text style={styles.watchButtonText}>WATCH REPLAY</Text>
            </TouchableOpacity>
          )}

          <View style={styles.linksSection}>
            <Text style={styles.sectionTitle}>RELATED LINKS</Text>
            <View style={styles.linksGrid}>
              <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.spacex.com')}>
                <Text style={styles.linkText}>SPACEX.COM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.spacex.com/vehicles/falcon-9/')}>
                <Text style={styles.linkText}>FALCON 9</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.linkButton} onPress={() => openLink('https://www.spacex.com/vehicles/dragon/')}>
                <Text style={styles.linkText}>DRAGON</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  heroSection: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 30,
  },
  heroDate: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '500',
    letterSpacing: 1,
  },
  heroName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  heroRocket: {
    color: '#fff',
    fontSize: 18,
  },
  contentSection: {
    padding: 20,
  },
  detailsCard: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    letterSpacing: 1,
  },
  detailsText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 15,
  },
  infoLabel: {
    color: '#888',
    fontSize: 12,
    marginBottom: 5,
    fontWeight: '500',
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
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
    backgroundColor: '#2979ff',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9204f',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  watchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  linksSection: {
    marginBottom: 40,
  },
  linksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  linkButton: {
    width: '48%',
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LaunchDetailsScreen;