// services/spaceXService.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Launch } from '../models/Launch';

const API_BASE_URL = 'https://api.spacexdata.com/v4';

// Cache key for storing launches
const LAUNCHES_CACHE_KEY = 'spacex_launches_cache';
const NEXT_LAUNCH_CACHE_KEY = 'spacex_next_launch_cache';
const LATEST_LAUNCH_CACHE_KEY = 'spacex_latest_launch_cache';

/**
 * Fetches launches from API with fallback to cached data
 */
export const getLaunches = async (): Promise<Launch[]> => {
  try {
    // First try to get fresh data from API
    const response = await axios.get(`${API_BASE_URL}/launches`);
    const launches = response.data;
    
    // Cache the fresh data
    await AsyncStorage.setItem(LAUNCHES_CACHE_KEY, JSON.stringify(launches));
    
    return launches;
  } catch (error) {
    console.error('API request failed, falling back to cache:', error);
    
    // If API fails, try to get cached data
    try {
      const cachedData = await AsyncStorage.getItem(LAUNCHES_CACHE_KEY);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    } catch (cacheError) {
      console.error('Failed to read from cache:', cacheError);
    }
    
    throw new Error('Failed to fetch launches and no cache available');
  }
};

/**
 * Fetches a specific launch by ID
 */
export const getLaunch = async (id: string): Promise<Launch> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/launches/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch launch ${id}:`, error);
    
    // Try to find in cached launches
    try {
      const cachedData = await AsyncStorage.getItem(LAUNCHES_CACHE_KEY);
      if (cachedData) {
        const launches: Launch[] = JSON.parse(cachedData);
        const launch = launches.find(l => l.id === id);
        if (launch) return launch;
      }
    } catch (cacheError) {
      console.error('Failed to read from cache:', cacheError);
    }
    
    throw new Error(`Failed to fetch launch ${id}`);
  }
};

/**
 * Fetches the next upcoming launch
 */
export const getNextLaunch = async (): Promise<Launch> => {
  try {
    // First try to get fresh data from API
    const response = await axios.get(`${API_BASE_URL}/launches/next`);
    const launch = response.data;
    
    // Cache the fresh data
    await AsyncStorage.setItem(NEXT_LAUNCH_CACHE_KEY, JSON.stringify(launch));
    
    return launch;
  } catch (error) {
    console.error('API request for next launch failed, falling back to cache:', error);
    
    // If API fails, try to get cached data
    try {
      const cachedData = await AsyncStorage.getItem(NEXT_LAUNCH_CACHE_KEY);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    } catch (cacheError) {
      console.error('Failed to read next launch from cache:', cacheError);
    }
    
    // Fallback: try to find the next launch from all launches
    try {
      const cachedData = await AsyncStorage.getItem(LAUNCHES_CACHE_KEY);
      if (cachedData) {
        const launches: Launch[] = JSON.parse(cachedData);
        const now = new Date();
        const upcomingLaunches = launches.filter(l => new Date(l.date_utc) > now);
        upcomingLaunches.sort((a, b) => new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime());
        
        if (upcomingLaunches.length > 0) {
          return upcomingLaunches[0];
        }
      }
    } catch (cacheError) {
      console.error('Failed to find next launch from all launches cache:', cacheError);
    }
    
    throw new Error('Failed to fetch next launch and no cache available');
  }
};

/**
 * Fetches the latest completed launch
 */
export const getLatestLaunch = async (): Promise<Launch> => {
  try {
    // First try to get fresh data from API
    const response = await axios.get(`${API_BASE_URL}/launches/latest`);
    const launch = response.data;
    
    // Cache the fresh data
    await AsyncStorage.setItem(LATEST_LAUNCH_CACHE_KEY, JSON.stringify(launch));
    
    return launch;
  } catch (error) {
    console.error('API request for latest launch failed, falling back to cache:', error);
    
    // If API fails, try to get cached data
    try {
      const cachedData = await AsyncStorage.getItem(LATEST_LAUNCH_CACHE_KEY);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    } catch (cacheError) {
      console.error('Failed to read latest launch from cache:', cacheError);
    }
    
    // Fallback: try to find the latest launch from all launches
    try {
      const cachedData = await AsyncStorage.getItem(LAUNCHES_CACHE_KEY);
      if (cachedData) {
        const launches: Launch[] = JSON.parse(cachedData);
        const now = new Date();
        const pastLaunches = launches.filter(l => new Date(l.date_utc) <= now);
        pastLaunches.sort((a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime());
        
        if (pastLaunches.length > 0) {
          return pastLaunches[0];
        }
      }
    } catch (cacheError) {
      console.error('Failed to find latest launch from all launches cache:', cacheError);
    }
    
    throw new Error('Failed to fetch latest launch and no cache available');
  }
};

/**
 * Fetches all data needed for the launch list screen
 */
export const getAllLaunchData = async (): Promise<{
  launches: Launch[];
  nextLaunch: Launch | null;
  latestLaunch: Launch | null;
}> => {
  try {
    const [launches, nextLaunch, latestLaunch] = await Promise.all([
      getLaunches(),
      getNextLaunch().catch(err => {
        console.error('Error fetching next launch:', err);
        return null;
      }),
      getLatestLaunch().catch(err => {
        console.error('Error fetching latest launch:', err);
        return null;
      })
    ]);
    
    return { launches, nextLaunch, latestLaunch };
  } catch (error) {
    console.error('Failed to fetch all launch data:', error);
    throw error;
  }
};