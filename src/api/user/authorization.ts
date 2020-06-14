import Credentials from "../../models/authorization/credentials";
import User, { TokenSettings } from "../../models/authorization/user";
import http from "../base/http";
import BaseResponse from "../../models/base/response";
import { Alert } from "react-native";
import Tokens from "../../models/authorization/tokens";

class Authorization {
  public async login(credentials: Credentials): Promise<User | null> {
    const response = await http.post<BaseResponse<User>>({
      endpoint: 'authorization/login',
      body: credentials
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

  public async loginWithRefreshToken(tokens: Tokens) : Promise<TokenSettings | null> {
    const response = await http.post<BaseResponse<TokenSettings>>({
      endpoint: 'authorization/refresh',
      body: tokens
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

const authorizationApi = new Authorization();

export default authorizationApi;