import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Searchbar, List, TouchableRipple} from 'react-native-paper';
import recipes from '../constants/recipes';
import type {RootTabParamList} from '../navigation/RootNavigator';
import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';

type QuickSearchScreenProps = MaterialBottomTabScreenProps<
  RootTabParamList,
  'QuickSearch'
>;
// See: https://reactnavigation.org/docs/typescript/

function RecipeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Recipe!</Text>
    </View>
  );
}

function QuickSearchScreen({navigation}: QuickSearchScreenProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const onChangeSearchTerm = (query: string) => setSearchTerm(query);

  const searchedRecipes = recipes.filter((recipe) => {
    recipe.mainIngredient.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <View style={[styles.container]}>
      <Searchbar
        placeholder="Search for Main Ingredient"
        onChangeText={onChangeSearchTerm}
        value={searchTerm}
        style={styles.searchbar}
      />
      <List.Section style={styles.list}>
        {recipes
          .filter((recipe) =>
            recipe.mainIngredient
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
          )
          .map((recipe) => (
            <TouchableRipple
              onPress={() => {
                navigation.navigate('Recipe');
              }}>
              <List.Item
                id={recipe.id}
                title={recipe.name}
                description={recipe.description}
              />
            </TouchableRipple>
          ))}
      </List.Section>
    </View>
  );
}

type RecipeStackParamList = {
  QuickSearch: undefined;
  Recipe: undefined;
};

const QuickSearchStack = createStackNavigator<RecipeStackParamList>();

function QuickSearchStackScreen() {
  return (
    <QuickSearchStack.Navigator>
      <QuickSearchStack.Screen
        name="QuickSearch"
        component={QuickSearchScreen}
      />
      <QuickSearchStack.Screen name="Recipe" component={RecipeScreen} />
    </QuickSearchStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    margin: 4,
  },
  list: {
    marginTop: 12,
  },
});

export default QuickSearchStackScreen;
