import React from 'react';
import {View} from 'react-native';
import {Headline, Subheading} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import lightTheme from '../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// if buld error on iOS involves MaterialCommunityIcons, see this: https://github.com/oblador/react-native-vector-icons/issues/965
import SearchStackScreen from '../screens/SearchStackScreen';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Discover: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Headline>Welcome!</Headline>
      <Subheading>This app is under construction</Subheading>
      <Headline>👷🏽‍♂️🚧👷🏻‍♀️</Headline>
    </View>
  );
}

function DiscoverScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Headline>Discover</Headline>
      <Subheading>This feature is under construction</Subheading>
      <Headline>👷🏽‍♂️🚧👷🏻‍♀️</Headline>
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
          name="Discover"
          component={DiscoverScreen}
          options={{
            tabBarLabel: 'Discover',
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
