import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps, DrawerContentOptions } from "@react-navigation/drawer";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { useDispatch } from 'react-redux';
import { setLoginTokens, setApps } from '../../actions/user/userActions';
import { tokenSettingKey } from '../../config';

export default function CustomDrawerContent(props: DrawerContentComponentProps<DrawerContentOptions>) {
  const dispatch = useDispatch();

  const logout = async () => {
    await AsyncStorage.removeItem(tokenSettingKey);
    dispatch(setLoginTokens(undefined))
    dispatch(setApps({count: 0, list: []}))
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.drawerBottomSection}>
        <DrawerItem
          label="Logout"
          onPress={logout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerBottomSection: {
    marginBottom: 20,
    marginLeft: 10
  }
})