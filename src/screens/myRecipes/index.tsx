import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RecipeList from './RecipeList';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mijn Recepten" component={RecipeList} />
    </Stack.Navigator>
  )
}
