import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import myRecipeApi from '../../api/myRecipes/myrecipe'
import { List } from '../../models/base/responseList'
import { Recipe } from '../../models/myRecipe/Recipe'
import RecipeEntry from '../../components/myRecipes/RecipeEntry'

export default function RecipeList() {
  const [recipes, setRecipes] = useState<List<Recipe>>({ list: [], count: 0 })
  useEffect(() => {
    getRecipes();
  }, [])

  const getRecipes = async () => {
    const recipes = await myRecipeApi.getRecipes();
    if (recipes) {
      setRecipes(recipes);
    }
  }

  const renderEntry = ({ item }: { item: Recipe }) => (<RecipeEntry recipe={item}/>)

  return (
    <FlatList
      data={recipes.list}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderEntry}
      style={{marginTop: 20}}
      contentContainerStyle={{marginHorizontal: 20}}
      ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
    />
  )
}