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

// Actions for adding task
export const addTaskRequest = (data: object) => {   
  console.log('Add task request------>', data);
  return {type: ADD_TASK_REQUEST, payload: data};
};
export const addTaskSuccess = (msg: string) => {
  return {type: ADD_TASK_SUCCESS, payload: {msg}};
};
export const addTaskFail = (err: object) => {
  return {type: ADD_TASK_FAIL, payload: {err}};
};

// Actions for updating task
export const updateTaskRequest = (data: object) => {
   return {type: UPDATE_TASK_REQUEST, payload: data};
};
export const updateTaskSuccess = (msg: string) => {
   return {type: UPDATE_TASK_SUCCESS, payload: {msg}};
};
export const updateTaskFail = (err: object) => {
    return {type: UPDATE_TASK_FAIL, payload: {err}};
};

// Actions for deleting task
export const deleteTaskRequest = (taskId: string) => {
    return {type: DELETE_TASK_REQUEST, payload: {taskId}};
};
export const deleteTaskSuccess = (msg: string) => {
   return {type: DELETE_TASK_SUCCESS, payload: {msg}};
};
export const deleteTaskFail = (err: object) => {
    return {type: DELETE_TASK_FAIL, payload: {err}};
};

// Actions for getting task
export const getTaskRequest = () => {
    return {type: GET_TASK_REQUEST};
};
export const getTaskSuccess = (data: object) => {
   return {type: GET_TASK_SUCCESS, payload: {data}};
};
export const getTaskFail = (err: object) => {
    return {type: GET_TASK_FAIL, payload: {err}};
};