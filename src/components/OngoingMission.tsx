import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';

const OngoingMissions = () => {
  const [crsMissionTime, setCrsMissionTime] = useState({
    days: 20,
    hours: 0,
    minutes: 31,
    seconds: 28
  });

  const [crewMissionTime, setCrewMissionTime] = useState({
    days: 42,
    hours: 15,
    minutes: 33,
    seconds: 28
  });

  // Mission image URLs (using SpaceX-related images)
  const missionImages = {
    crs33: 'https://images2.imgbox.com/5c/12/kVmu3Xq1_o.png', // SpaceX CRS mission patch
    crew11: 'https://images2.imgbox.com/8f/35/7vXqGkK1_o.png' // Generic crew mission patch
  };

  // Countup timer effect for CRS-33 mission
  useEffect(() => {
    const interval = setInterval(() => {
      setCrsMissionTime(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        seconds += 1;
        if (seconds >= 60) {
          seconds = 0;
          minutes += 1;
          if (minutes >= 60) {
            minutes = 0;
            hours += 1;
            if (hours >= 24) {
              hours = 0;
              days += 1;
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Countup timer effect for CREW-11 mission
  useEffect(() => {
    const interval = setInterval(() => {
      setCrewMissionTime(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        seconds += 1;
        if (seconds >= 60) {
          seconds = 0;
          minutes += 1;
          if (minutes >= 60) {
            minutes = 0;
            hours += 1;
            if (hours >= 24) {
              hours = 0;
              days += 1;
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    return `T+${time.days}D ${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>ONGOING MISSIONS</Text>
      
      {/* CRS-33 MISSION */}
      <View style={styles.missionItem}>
        <Image 
          source={{ uri: missionImages.crs33 }} 
          style={styles.missionImage}
          resizeMode="contain"
        />
        <View style={styles.missionInfo}>
          <Text style={styles.missionName}>CRS-33 MISSION</Text>
          <Text style={styles.missionTime}>{formatTime(crsMissionTime)}</Text>
          <Text style={styles.missionDate}>DECEMBER 2025</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      {/* CREW-11 MISSION */}
      <View style={styles.missionItem}>
        <Image 
          source={{ uri: missionImages.crew11 }} 
          style={styles.missionImage}
          resizeMode="contain"
        />
        <View style={styles.missionInfo}>
          <Text style={styles.missionName}>CREW-11 MISSION</Text>
          <Text style={styles.missionTime}>{formatTime(crewMissionTime)}</Text>
          <Text style={styles.missionDate}>FEBRUARY 2026</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 20,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    borderRadius: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 20,
    letterSpacing: 1.2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  missionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  missionImage: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  missionInfo: {
    flex: 1,
  },
  missionName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  missionTime: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: 4,
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
  missionDate: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 12,
  },
});

export default OngoingMissions;