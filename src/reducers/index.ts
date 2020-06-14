import { combineReducers } from 'redux';
import userReducer, { UserReducerState } from './user/userReducer';

export type State = {
  userReducer: UserReducerState;
}

export default combineReducers({
  userReducer
})