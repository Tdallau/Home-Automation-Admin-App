import ResponseList, { List } from "../../models/base/responseList";
import App from "../../models/user/app";
import http from "../base/http";
import { Alert } from "react-native";

class User {
  public async getMyApps(): Promise<List<App> | null> {
    const response = await http.get<ResponseList<App>>({
      endpoint: 'user'
    })

    if(response) {
      if(response.success) {
        return response.data;
      }
      Alert.alert('Er is iets mis gegaan bij het inlogen', response.error ? response.error : response.data as unknown as string)
    }

    return new Promise((resolve, _) => {
      return resolve(null);
    });
  }
}

const userApi = new User();

export default userApi;