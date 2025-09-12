// services/mockSpacexService.js
import mockData from '../utils/dummyData/spacex_mock_data.json';

export const getLaunches = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockData.launches;
};

export const getLaunch = async (id) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockData.launches.find(launch => launch.id === id);
};