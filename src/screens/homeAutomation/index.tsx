import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeAutomationList from './HomeAutomationList'

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home automation" component={HomeAutomationList} />
    </Stack.Navigator>
  )
}
