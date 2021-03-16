import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Searchbar,
  List,
  TouchableRipple,
  Button,
  Dialog,
  Portal,
  RadioButton,
  Text,
  Chip,
  ActivityIndicator,
} from 'react-native-paper';
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

const RecipeScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Recipe!</Text>
  </View>
);

const SearchScreen = ({navigation}: SearchScreenProps) => {
  const [recipes, setRecipes] = useState<RecipePreview[] | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedTag, setSelectedTag] = useState('');
  const tagIsSelected = selectedTag.length !== 0;

  const searchedRecipes = recipes?.filter(
    (recipe) =>
      recipe.mainIngredients.includes(searchTerm.toLowerCase()) ||
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const availableTags = [
    ...new Set(searchedRecipes?.flatMap((recipe) => recipe.tags)),
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(`${API_BASE_URL}/api/recipePreviews`);

      // fixme: there's no interface for the result from calling Recipes API, as data format is still subject to change
      const formattedResult = result.data.map((item: any) => {
        const id: number = item._fields[1].low;
        const name: string = item._fields[0];
        const mainIngredients: string[] = item._fields[3];
        const tags: string[] = [];
        item._fields[2].map((tagRecord: any) => {
          tags.push(tagRecord.properties.name);
        });

        const recipe: RecipePreview = {
          id: id,
          name: name,
          mainIngredients: mainIngredients,
          tags: tags,
        };
        return recipe;
      });

      setRecipes(formattedResult);
      setIsLoading(false);
    };

    try {
      fetchData();
    } catch (error) {
      setIsError(true);
    }
  }, []);

  const onChangeSearchTerm = (query: string) => {
    setSelectedTag('');
    setSearchTerm(query);
  };

  return (
    <View style={[styles.container]}>
      <Searchbar
        placeholder="Search for recipe name or main ingredient"
        onChangeText={onChangeSearchTerm}
        value={searchTerm}
        style={styles.searchbar}
      />
      {/* <Text>Number of available tags to filter by: {availableTags.length}</Text> */}

      {tagIsSelected && (
        <View
          style={{
            margin: 5,
            flexWrap: 'wrap',
          }}>
          <Chip mode="outlined" icon="tag">
            {selectedTag.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
              letter.toUpperCase(),
            )}
          </Chip>
        </View>
      )}

      {/* Nested Conditional Rendering. 
      - Source: https://www.robinwieruch.de/conditional-rendering-react#nested-conditional-rendering-in-react 
      - Try to avoid this for the sake of readability
      - todo(suman-vanan): split out components, use if statements, or use HOCs
      */}
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        />
      ) : (
        <>
          <SearchResults
            searchedRecipes={searchedRecipes}
            tagIsSelected={tagIsSelected}
            selectedTag={selectedTag}
            navigation={navigation}
          />
          <TagFilter
            tags={availableTags}
            selectedTag={selectedTag}
            onSelect={setSelectedTag}
          />
        </>
      )}
    </View>
  );
};

type SearchResultsProps = {
  searchedRecipes: RecipePreview[] | undefined;
  tagIsSelected: boolean;
  selectedTag: string;
  navigation: any;
};

const SearchResults = ({
  searchedRecipes,
  tagIsSelected,
  selectedTag,
  navigation,
}: SearchResultsProps) => {
  if (tagIsSelected) {
    searchedRecipes = searchedRecipes?.filter((recipe) =>
      recipe.tags.includes(selectedTag),
    );
  }

  return (
    <ScrollView>
      <List.Section style={styles.list}>
        {searchedRecipes?.map((recipe: RecipePreview) => (
          <TouchableRipple
            onPress={() => {
              navigation.navigate('Recipe');
              // For navigation to deeply nested screens, see: https://reactnavigation.org/docs/nesting-navigators#passing-params-to-a-screen-in-a-nested-navigator
            }}
            key={recipe.id}>
            <List.Item
              key={recipe.id}
              title={recipe.name}
              description={recipe.mainIngredients.join(', ')}
            />
          </TouchableRipple>
        ))}
      </List.Section>
    </ScrollView>
  );
};

type TagFilterProps = {
  tags: string[];
  selectedTag: string;
  onSelect: (tag: string) => void;
};

const TagFilter = ({tags, selectedTag, onSelect}: TagFilterProps) => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Button onPress={showDialog} mode="outlined" icon="filter">
        Filter
      </Button>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{maxHeight: '75%'}}>
          <Dialog.Title>Filter by Tags</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView>
              <RadioButton.Group
                onValueChange={(newSelectedValue: string) =>
                  onSelect(newSelectedValue)
                }
                value={selectedTag}>
                {tags.map((tag: string) => (
                  <RadioButton.Item
                    // todo(suman-vanan): Perhaps a tagId would be a better key?
                    key={tag}
                    // for label, use RegEx to capitalise the first letter of each word in the string `tag`
                    // Source: (https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/)
                    label={tag.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                      letter.toUpperCase(),
                    )}
                    value={tag}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

type RecipeStackParamList = {
  Search: undefined;
  Recipe: {recipeId: number};
};

const SearchStack = createStackNavigator<RecipeStackParamList>();

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen name="Search" component={SearchScreen} />
    <SearchStack.Screen name="Recipe" component={RecipeScreen} />
  </SearchStack.Navigator>
);

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
