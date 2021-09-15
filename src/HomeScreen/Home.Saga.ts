import {call, put, takeLatest} from 'redux-saga/effects';
import { ADD_TASK_REQUEST, UPDATE_TASK_REQUEST, DELETE_TASK_REQUEST, GET_TASK_REQUEST} from './Home.Constants';
import {addTaskSuccess, addTaskFail, updateTaskSuccess, updateTaskFail, deleteTaskSuccess, deleteTaskFail, getTaskSuccess, getTaskFail, getTaskRequest } from './Home.Action';
import {addTask, updateTask, getTask, deleteTask} from '../api';
import {sendNetworkFail} from '../actions';
import {Action} from '../reducers';
import {Alert} from 'react-native';


export function* watchTask() {
  yield takeLatest(ADD_TASK_REQUEST, addTaskSaga);
  yield takeLatest(UPDATE_TASK_REQUEST, updateTaskSaga);
  yield takeLatest(DELETE_TASK_REQUEST, deleteTaskSaga);
  yield takeLatest(GET_TASK_REQUEST, getTaskSaga);

}

// Saga method to add task.
function* addTaskSaga(action: Action) {
    console.log('action in saga------>', action);
  const response = yield call(addTask, action.payload);
  if (response.status === 200) {
    console.log('response of add api---->', response);
    yield put(addTaskSuccess(response.data.msg));
    Alert.alert('Task ' + response.data.msg);
  } else {
    if (response.problem !== 'NETWORK_ERROR' && response.problem !== 'TIMEOUT_ERROR' && response.problem !== 'CONNECTION_ERROR') {
      yield put(addTaskFail(response.problem));
    } else {
      yield put(sendNetworkFail(response.problem));
      yield put(addTaskFail(response.problem));
    }
  }
}

// Saga method to get task.
function* getTaskSaga() {
    console.log('Get Tasks Saga');
    const response = yield call(getTask);
    console.log('Response of get Tasks------>', response);
    if (response.status === 200) {
      yield put(getTaskSuccess(response.data.data));
      
    } else {
      if (response.problem !== 'NETWORK_ERROR' && response.problem !== 'TIMEOUT_ERROR' && response.problem !== 'CONNECTION_ERROR') {
        yield put(getTaskFail(response.problem));
      } else {
        yield put(sendNetworkFail(response.problem));
        yield put(getTaskFail(response.problem));
      }
    }
}

// Saga method to update task.
function* updateTaskSaga(action: Action) {
    const response = yield call(updateTask, action.payload);
    if (response.status === 200) {
    console.log('Update task----->', response);
      yield put(updateTaskSuccess(response.data.msg));
      Alert.alert('Task ' + response.data.msg);
    } else {
      if (response.problem !== 'NETWORK_ERROR' && response.problem !== 'TIMEOUT_ERROR' && response.problem !== 'CONNECTION_ERROR') {
        yield put(updateTaskFail(response.problem));
      } else {
        yield put(sendNetworkFail(response.problem));
        yield put(updateTaskFail(response.problem));
      }
    }
}

// Saga method to delete task.
function* deleteTaskSaga(action: Action) {
    const response = yield call(deleteTask, action.payload);
    if (response.status === 200) {
     console.log('Response of delete ssaga', response);
      yield put(deleteTaskSuccess(response.data));
      Alert.alert('Task ' + response.data.msg);
    } else {
      if (response.problem !== 'NETWORK_ERROR' && response.problem !== 'TIMEOUT_ERROR' && response.problem !== 'CONNECTION_ERROR') {
        yield put(deleteTaskFail(response.problem));
      } else {
        yield put(sendNetworkFail(response.problem));
        yield put(deleteTaskFail(response.problem));
      }
    }
}


