import { TokenSettings } from "../../models/authorization/user";
import { LOGIN_TOKEN, USER_APPS } from "./types";
import App from "../../models/user/app";
import { List } from "../../models/base/responseList";

export const setLoginTokens = (tokens: TokenSettings | undefined) => ({
  type: LOGIN_TOKEN,
  payload: { tokens }
});

export const setApps = (apps: List<App>) => ({
  type: USER_APPS,
  payload: { apps }
})