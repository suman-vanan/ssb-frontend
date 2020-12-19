import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import lightTheme from '../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// if buld error on iOS involves MaterialCommunityIcons, see this: https://github.com/oblador/react-native-vector-icons/issues/965

const Tab = createMaterialBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function RecipeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Recipe!</Text>
    </View>
  );
}

function QuickSearchScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Quick Search screen</Text>
      <Button
        title="Go to Recipe"
        onPress={() => navigation.navigate('Recipe')}
      />
    </View>
  );
}

const QuickSearchStack = createStackNavigator();

function QuickSearchStackScreen() {
  return (
    <QuickSearchStack.Navigator>
      <QuickSearchStack.Screen
        name="Quick Search"
        component={QuickSearchScreen}
      />
      <QuickSearchStack.Screen name="Recipe" component={RecipeScreen} />
    </QuickSearchStack.Navigator>
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
      <Tab.Navigator>
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
          name="Quick Search"
          component={QuickSearchStackScreen}
          options={{
            tabBarLabel: 'Quick Search',
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
