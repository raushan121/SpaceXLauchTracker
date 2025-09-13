import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  Linking
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

const { width, height } = Dimensions.get('window');

// Countdown Timer Component
const CountdownTimer = ({ hours, minutes, seconds }) => {
  return (
    <View style={styles.countdownMain}>
      <Text style={styles.countdownPrefix}>T-</Text>
      <Text style={styles.timeNumber}>{hours.toString().padStart(2, '0')}</Text>
      <Text style={styles.timeSeparator}>:</Text>
      <Text style={styles.timeNumber}>{minutes.toString().padStart(2, '0')}</Text>
      <Text style={styles.timeSeparator}>:</Text>
      <Text style={styles.timeNumber}>{seconds.toString().padStart(2, '0')}</Text>
    </View>
  );
};

// Stat Box Component
const StatBox = ({ value, label, isWide = false, isMultiValue = false, values = [] }) => {
  if (isMultiValue) {
    return (
      <View style={[styles.statBox, isWide && styles.wideStatBox]}>
        <View style={styles.rowContainer}>
          {values.map((val, index) => (
            <Text key={index} style={styles.statNumber}>{val}</Text>
          ))}
        </View>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.statBox, isWide && styles.wideStatBox]}>
      <Text style={styles.statNumber}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

// Main Component
const SpaceXLaunchUI = () => {
  const [countdown, setCountdown] = useState({
    hours: 10,
    minutes: 17,
    seconds: 5
  });

  // Mock data for the next launch
  const nextLaunch = {
    name: 'STARLINK MISSION',
    date_utc: new Date(Date.now() + 10 * 60 * 60 * 1000 + 17 * 60 * 1000 + 5 * 1000),
    links: {
      patch: {
        large: 'https://images2.imgbox.com/94/f2/NN6Ph45r_o.png'
      }
    }
  };

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

 const handleWatchLive = () => {
  const youtubeDeepLink = 'vnd.youtube://channel/UCtI0Hodo5o5dUb67FeUjDeA';
  const youtubeWebURL = 'https://www.youtube.com/c/SpaceX';
  
  // Try to open YouTube app first, fallback to browser
  Linking.canOpenURL(youtubeDeepLink).then(supported => {
    if (supported) {
      Linking.openURL(youtubeDeepLink);
    } else {
      Linking.openURL(youtubeWebURL);
    }
  });
};

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header Section with Background Image */}
      <View style={styles.headerContainer}>
        <ImageBackground
          source={{ uri: nextLaunch.links.patch.large }}
          style={styles.headerImage}
          resizeMode="contain"
          blurRadius={Platform.OS === 'ios' ? 0 : 5} // Android blur
        >
          {/* iOS Blur Effect */}
          {Platform.OS === 'ios' && (
            <BlurView
              style={styles.absolute}
              blurType="dark"
              blurAmount={10}
            />
          )}
          
          {/* Content Overlay */}
          <View style={styles.overlay}>
            
            {/* Countdown Timer */}
            <CountdownTimer 
              hours={countdown.hours} 
              minutes={countdown.minutes} 
              seconds={countdown.seconds} 
            />
            
            {/* Mission Name */}
            <Text numberOfLines={2} style={styles.missionNameMain}>
              {nextLaunch.name}
            </Text>
            
            {/* Watch Button */}
            <TouchableOpacity
              style={styles.watchButtonMain}
              onPress={handleWatchLive}
            >
              <Text style={styles.watchButtonTextMain}>WATCH →</Text>
            </TouchableOpacity>
            
            {/* Statistics Section */}
            <View style={styles.statsContainer}>
              
              {/* First Row: Completed Missions and Total Landings */}
              <View style={styles.statsRow}>
                <StatBox
                
                  isMultiValue={true}
                  values={['5', '4', '2']}
                  label="COMPLETED MISSIONS"
                />
                
                <StatBox
                  isMultiValue={true}
               values={['5', '0', '3']}
                  label="TOTAL LANDINGS"
                />
              </View>
              
              {/* Second Row: Total Reflights */}
              <View style={styles.statsRow}>
                <StatBox
                    isMultiValue={true}
                   values={['6', '7', '9']}
                  label="TOTAL REFLIGHTS"
                  isWide={true}
                />
              </View>
              
        
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    width: '100%',
    height: height,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Platform.OS === 'android' ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
  },
  countdownMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.1,
  },
  countdownPrefix: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginRight: 4,
  },
  timeNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginHorizontal: 4,
    minWidth: 40,
    textAlign: 'center',
  },
  timeSeparator: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 4,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  missionNameMain: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  watchButtonMain: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginBottom: 30,
  },
  watchButtonTextMain: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  statsContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 16,
    borderRadius: 10,
    width: width * 0.40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  wideStatBox: {
    width: '50%',
    marginHorizontal:'25%'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 8,

  },
  statNumber: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
       marginRight:2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 36,
    textAlign: 'center',
  },
  statLabel: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default SpaceXLaunchUI;