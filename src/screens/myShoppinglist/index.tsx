import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShopList from './ShopList';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ShopList" component={ShopList} />
    </Stack.Navigator>
  )
}
