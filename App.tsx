// YourComponent.tsx

import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {api} from './api';
import {ApiResponse} from './api/types';

const App: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.fetchData();
      setData(response);
    } catch (error) {
      // Handle error here, e.g., show an error message to the user
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View>
      {data ? (
        <Text>{JSON.stringify(data)}</Text> // Display the fetched data
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default App;
