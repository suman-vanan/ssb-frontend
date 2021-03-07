import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import lightTheme from '../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// if buld error on iOS involves MaterialCommunityIcons, see this: https://github.com/oblador/react-native-vector-icons/issues/965
import SearchStackScreen from '../screens/SearchStackScreen';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  About: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function AboutScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>About!</Text>
    </View>
  );
}

const RootNavigator = () => {
  return (
    <NavigationContainer theme={lightTheme}>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStackScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="text-search"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            tabBarLabel: 'About',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="baby-face-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
