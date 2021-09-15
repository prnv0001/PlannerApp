import {combineReducers} from 'redux';
import { Task } from "./HomeScreen/Home.Model";

import {getHomeScreen} from './HomeScreen/Home.Reducer';
import {CLEAR_NETWORK_FAIL, SEND_NETWORK_FAIL} from './actions';

export interface State {
  fetching: boolean;
  tasks: Task[];
  err: any;
  msg: string;
}

export interface Action {
  type: string;
  payload: any;
}

const initialState : State = {fetching: false, tasks: [], err: null, msg: ''};

const sendNetworkFail = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SEND_NETWORK_FAIL:
      return {
        err: action.payload.err,
      };
    case CLEAR_NETWORK_FAIL:
      return {
        err: null,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({sendNetworkFail, getHomeScreen});
export default rootReducer;
