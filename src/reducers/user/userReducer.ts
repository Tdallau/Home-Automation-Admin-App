import { TokenSettings } from "../../models/authorization/user";

import { LOGIN_TOKEN, USER_APPS } from '../../actions/user/types';
import App from "../../models/user/app";
import { List } from "../../models/base/responseList";

export type UserReducerState = {tokens: TokenSettings | undefined, apps: List<App>};
type Action = { type: typeof LOGIN_TOKEN, payload: UserReducerState  }

const INITIAL_STATE: UserReducerState = {
  tokens: undefined,
  apps: {
    count: 0,
    list: []
  }
};

const userReducer = (state = INITIAL_STATE, action: Action): UserReducerState => {
  switch (action.type) {
    case LOGIN_TOKEN:
      return {...state, tokens: action.payload.tokens }
    case USER_APPS:
      return { ...state, apps: action.payload.apps }
    default:
      return state;
  }
}

export default userReducer;