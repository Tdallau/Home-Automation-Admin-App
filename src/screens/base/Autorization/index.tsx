import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './Welcome';
import Login from './Login';

const Stack = createStackNavigator();

export type AutorizationStackProps = {
  Welcome: undefined,
  Login: undefined
}

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{
        headerShown: false
      }}/>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}