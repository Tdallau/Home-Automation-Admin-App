import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Recipe } from '../../models/myRecipe/Recipe'

export default function RecipeEntry({ recipe }: { recipe: Recipe }) {
  return (
    <View style={styles.container}>
      <View style={styles.holder}>
        <Text style={styles.text}>{recipe.name}</Text>
        <Text>{recipe.description}</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold'
  },
  holder: {}
})