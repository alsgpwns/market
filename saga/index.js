import axios from 'axios';
import { all, fork } from 'redux-saga/effects';
import { baseURL } from '../config/config';
import userSaga from './user';

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga)]);
}
