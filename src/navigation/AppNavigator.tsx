// navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LaunchListScreen from '../screens/LaunchListScreen';
import LaunchDetailScreen from '../screens/LauchDetailsScreen';

export type RootStackParamList = {
  LaunchList: undefined;
  LaunchDetails: { launch: any }; // Using any to simplify, but should use proper type
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator 
      initialRouteName="LaunchList"
      screenOptions={{
        headerShown: false // This will hide the header for all screens
      }}
    >
      <Stack.Screen
        name="LaunchList"
        component={LaunchListScreen}
      />
      <Stack.Screen
        name="LaunchDetails"
        component={LaunchDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;