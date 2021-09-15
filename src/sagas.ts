import {all} from 'redux-saga/effects';
import {watchTask} from './HomeScreen/Home.Saga';

export default function* rootSaga() {
  yield all([watchTask()]);
}
