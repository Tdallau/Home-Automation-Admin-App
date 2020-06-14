import React from 'react'
import { Text, SafeAreaView, TouchableOpacity, AsyncStorage, StatusBar } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { AutorizationStackProps } from '.';

export default function Welcome({ navigation }: StackScreenProps<AutorizationStackProps, 'Welcome'>) {
  const navigateToLogin = async () => {
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Text>Hallo</Text>
      <TouchableOpacity onPress={navigateToLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
