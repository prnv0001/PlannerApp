import {
    ADD_TASK_REQUEST, 
    ADD_TASK_SUCCESS, 
    ADD_TASK_FAIL, 
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    GET_TASK_REQUEST,
    GET_TASK_SUCCESS,
    GET_TASK_FAIL
} from './Home.Constants';
import {Action, State} from '../reducers';
import { Task } from './Home.Model';

const initialState: State = {fetching: false, tasks: [], err: null, msg: ''};

export const getHomeScreen = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ADD_TASK_REQUEST:
      console.log('reducer state------>', action); 
      return {
        ...state,
        fetching: true,
        err: null,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        fetching: false,
        msg: action.payload as string,
        err: null,
      };
    case ADD_TASK_FAIL:
      return {
        ...state,
        fetching: false,
        err: action.payload.err,
      };
    case UPDATE_TASK_REQUEST:
       return {
        ...state,
        fetching: true,
        err: null,
    };
    case UPDATE_TASK_SUCCESS:
       return {
        ...state,
        fetching: false,
        msg: action.payload as string,
        err: null,
    };
    case UPDATE_TASK_FAIL:
       return {
        ...state,
        fetching: false,
        err: action.payload.err,
    };  

    case DELETE_TASK_REQUEST:
        return {
          ...state,
          fetching: true,
          err: null,
        };
    case DELETE_TASK_SUCCESS:
        return {
          ...state,
          fetching: false,
          msg: action.payload.data as string,
          err: null,
        };
    case DELETE_TASK_FAIL:
        return {
          ...state,
          fetching: false,
          err: action.payload.err,
        };
    case GET_TASK_REQUEST:
        return {
          ...state,  
          fetching: true,
          err: null,
        };
    case GET_TASK_SUCCESS:
        return {
          ...state,  
          fetching: false,
          tasks: action.payload.data as Task[],
          err: null,
        };
    case GET_TASK_FAIL:
        return {
          ...state,  
          fetching: false,
          err: action.payload.err,
        };

    default:
      return state;
  }
};
