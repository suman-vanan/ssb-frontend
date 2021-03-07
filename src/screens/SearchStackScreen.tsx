import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Searchbar, List, TouchableRipple} from 'react-native-paper';
// import recipes from '../constants/recipes';
import {RecipePreview} from '../constants/recipes';
import type {RootTabParamList} from '../navigation/RootNavigator';
import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {API_BASE_URL} from '@env';

type SearchScreenProps = MaterialBottomTabScreenProps<
  RootTabParamList,
  'Search'
>;
// TODO: https://reactnavigation.org/docs/typescript#combining-navigation-props
// See: https://reactnavigation.org/docs/typescript/

function RecipeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Recipe!</Text>
    </View>
  );
}

function SearchScreen({navigation}: SearchScreenProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const [recipes, setRecipes] = useState<RecipePreview[] | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${API_BASE_URL}/api/recipes`);

      // fixme: there's no interface for the result from calling Recipes API, as data format is still subject to change
      const formattedResult = result.data.map((item) => {
        const id: number = item._fields[0].properties.recipeId.low;
        const name: String = item._fields[0].properties.name;
        const method: String[] = item._fields[0].properties.method.split(',');
        const recipe: RecipePreview = {name: name, method: method, id: id};
        return recipe;
      });

      setRecipes(formattedResult);
    };

    fetchData();
  }, []);

  const onChangeSearchTerm = (query: string) => setSearchTerm(query);

  return (
    <View style={[styles.container]}>
      <Searchbar
        placeholder="Search for recipe name"
        onChangeText={onChangeSearchTerm}
        value={searchTerm}
        style={styles.searchbar}
      />
      <ScrollView>
        {recipes && (
          <List.Section style={styles.list}>
            {recipes
              .filter((recipe) =>
                recipe.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((recipe: RecipePreview) => (
                <TouchableRipple
                  onPress={() => {
                    navigation.navigate('Recipe');
                    // For navigation to deeply nested screens, see: https://reactnavigation.org/docs/nesting-navigators#passing-params-to-a-screen-in-a-nested-navigator
                  }}
                  key={recipe.id}>
                  <List.Item
                    key={recipe.id}
                    title={recipe.name}
                    description={recipe.method[0]}
                  />
                </TouchableRipple>
              ))}
          </List.Section>
        )}
      </ScrollView>
    </View>
  );
}

type RecipeStackParamList = {
  Search: undefined;
  Recipe: {recipeId: number};
};

const SearchStack = createStackNavigator<RecipeStackParamList>();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="Recipe" component={RecipeScreen} />
    </SearchStack.Navigator>
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

export default SearchStackScreen;
