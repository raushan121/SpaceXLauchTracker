// components/CountdownTimer.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { differenceInSeconds } from 'date-fns';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = differenceInSeconds(targetDate, now);
      
      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }

      return {
        days: Math.floor(difference / (60 * 60 * 24)),
        hours: Math.floor((difference % (60 * 60 * 24)) / (60 * 60)),
        minutes: Math.floor((difference % (60 * 60)) / 60),
        seconds: Math.floor(difference % 60)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <View style={styles.container}>
      <View style={styles.timeBlock}>
        <Text style={styles.timeValue}>{timeLeft.days.toString().padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>DAYS</Text>
      </View>
      <Text style={styles.colon}>:</Text>
      <View style={styles.timeBlock}>
        <Text style={styles.timeValue}>{timeLeft.hours.toString().padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>HOURS</Text>
      </View>
      <Text style={styles.colon}>:</Text>
      <View style={styles.timeBlock}>
        <Text style={styles.timeValue}>{timeLeft.minutes.toString().padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>MINUTES</Text>
      </View>
      <Text style={styles.colon}>:</Text>
      <View style={styles.timeBlock}>
        <Text style={styles.timeValue}>{timeLeft.seconds.toString().padStart(2, '0')}</Text>
        <Text style={styles.timeLabel}>SECONDS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBlock: {
    alignItems: 'center',
    minWidth: 50,
  },
  timeValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  timeLabel: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  colon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
});

export default CountdownTimer;