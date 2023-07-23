import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './rootReducer'; // The type of RootState will depend on your root reducer setup
import {makeApiRequest} from './api';

const ExampleComponent: React.FC = () => {
  const dispatch = useDispatch();
  const apiState = useSelector((state: RootState) => state.api);

  useEffect(() => {
    // Fetch data on component mount
    dispatch(makeApiRequest<YourResponseType>('/your-endpoint', 'GET'));
  }, []);

  return (
    <View>
      {apiState.loading ? <Text>Loading...</Text> : null}
      {apiState.error ? <Text>Error: {apiState.error}</Text> : null}
      {/* Display your fetched data here */}
    </View>
  );
};

export default ExampleComponent;
