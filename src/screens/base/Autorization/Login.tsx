import React, { useState } from 'react'
import { View, Text, AsyncStorage, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useDispatch } from 'react-redux';
import authorizationApi from '../../../api/user/authorization';
import { tokenSettingKey } from '../../../config';
import userApi from '../../../api/user/user';
import { setApps, setLoginTokens } from '../../../actions/user/userActions';

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (!email || !password) {
      Alert.alert('email of wachtwoord is niet ingevuld', 'er moet een email en wachtwoord gegeven worden om in te logen');
      return;
    }
    const user = await authorizationApi.login({
      appId: 'cbff74c6-8d2d-4f11-81eb-926a48317d5b',
      email: 'tim@dallau.com',
      password: 'test123'
    })
    if (user) {
      await AsyncStorage.setItem(tokenSettingKey, JSON.stringify(user.tokenSettings));
      const apps = await userApi.getMyApps();
      if (apps) {
        dispatch(setApps(apps));
      }

      dispatch(setLoginTokens(user.tokenSettings));
    }
  }
  return (
    <View>
      <TextInput value={email} placeholder="Email" onChangeText={setEmail} />
      <TextInput value={password} placeholder="Password" onChangeText={setPassword} />
      <TouchableOpacity onPress={login}>
        <Text>login</Text>
      </TouchableOpacity>
    </View>
  )
}
