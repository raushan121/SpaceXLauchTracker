// services/spacexService.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Launch } from '../models/Launch';

const API_BASE_URL = 'https://api.spacexdata.com/v4';

// Cache key for storing launches
const LAUNCHES_CACHE_KEY = 'spacex_launches_cache';

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