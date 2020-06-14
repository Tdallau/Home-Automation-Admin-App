import ResponseList, { List } from "../../models/base/responseList";
import App from "../../models/user/app";
import http from "../base/http";
import { Alert } from "react-native";
import { Recipe } from "../../models/myRecipe/Recipe";

class MyRecipe {
  public async getRecipes(): Promise<List<Recipe> | null> {
    const response = await http.get<ResponseList<Recipe>>({
      endpoint: 'myrecipes/recipe'
    })

    if(response) {
      if(response.success) {
        return response.data;
      }
      Alert.alert('Er is iets mis gegaan bij het ophalen van de recepten', response.error ? response.error : response.data as unknown as string)
    }

    return new Promise((resolve, _) => {
      return resolve(null);
    });
  }
}

const myRecipeApi = new MyRecipe();

export default myRecipeApi;