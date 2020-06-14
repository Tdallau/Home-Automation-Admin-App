import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyRecipes from './myRecipes';
import MyShoppingList from './myShoppinglist';
import { Text, AsyncStorage } from 'react-native';
import userApi from '../api/user/user';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../reducers';
import SplashScreen from './base/SplashScreen';
import Welcome from './base/Autorization/Welcome';
import { TokenSettings } from '../models/authorization/user';
import { setLoginTokens, setApps } from '../actions/user/userActions';
import CustomDrawerContent from '../components/base/CustomDrawerContent';
import AutorizationNavigator from './base/Autorization';
import { tokenSettingKey } from '../config';
import homeAutomation from './homeAutomation';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  const tokens = useSelector((state: State) => state.userReducer.tokens);
  const apps = useSelector((state: State) => state.userReducer.apps);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  const components: { [id: string]: React.ComponentType<any>; } = {
    'myrecipes': MyRecipes,
    'myshoppinglist': MyShoppingList,
    'homeAutomation': homeAutomation
  }

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    const tokens = await AsyncStorage.getItem(tokenSettingKey);
    if (tokens) {
      const tokenSettings = JSON.parse(tokens) as TokenSettings;
      dispatch(setLoginTokens(tokenSettings))
      getApps();
    } else {
      setLoading(false);
    }
  }

  const getApps = async () => {
    const myApps = await userApi.getMyApps();
    if (myApps) {
      dispatch(setApps(myApps))
    }
    setLoading(false);
  }

  if (loading) {
    return <SplashScreen />
  }

  if (!tokens) {
    return <NavigationContainer>
      <AutorizationNavigator />
    </NavigationContainer>
  }

  return (
    <NavigationContainer>
      {apps.count === 0 ?
        <Text>Loading</Text> :
        <Drawer.Navigator
          initialRouteName={apps.list.find(x => x.default === true)?.area}
          drawerContent={(props) => <CustomDrawerContent  {...props} />}>
          {
            apps.list.filter(x => x.area !== null).map(app => <Drawer.Screen key={app.id} name={app.area} component={components[app.area]} />)
          }
        </Drawer.Navigator>}
    </NavigationContainer>
  )
}
