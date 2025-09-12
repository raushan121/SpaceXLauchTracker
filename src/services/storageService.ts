// services/storageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'spacex_bookmarks';

/**
 * Get all bookmarked launch IDs
 */
export const getBookmarks = async (): Promise<string[]> => {
  try {
    const bookmarksJson = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return bookmarksJson ? JSON.parse(bookmarksJson) : [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
};

/**
 * Toggle bookmark status for a launch
 */
export const toggleBookmark = async (launchId: string): Promise<string[]> => {
  try {
    const currentBookmarks = await getBookmarks();
    const newBookmarks = currentBookmarks.includes(launchId)
      ? currentBookmarks.filter(id => id !== launchId)
      : [...currentBookmarks, launchId];
    
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(newBookmarks));
    return newBookmarks;
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    throw error;
  }
};

/**
 * Check if a launch is bookmarked
 */
export const isBookmarked = async (launchId: string): Promise<boolean> => {
  const bookmarks = await getBookmarks();
  return bookmarks.includes(launchId);
};