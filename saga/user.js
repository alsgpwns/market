import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import {
  GET_ITEMS_ERROR,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GOOGLE_LOGIN_ERROR,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGOUT_ERROR,
  GOOGLE_LOGOUT_REQUEST,
  GOOGLE_LOGOUT_SUCCESS,
  KAKAO_LOGIN_ERROR,
  KAKAO_LOGIN_REQUEST,
  KAKAO_LOGIN_SUCCESS,
  KAKAO_LOGOUT_ERROR,
  KAKAO_LOGOUT_REQUEST,
  KAKAO_LOGOUT_SUCCESS,
} from '../reducer/user';

async function kakaoLoginAPI() {
  return await KakaoLogins.login([KAKAO_AUTH_TYPES.Account]);
}

function* kakaoLogin() {
  try {
    const result = yield call(kakaoLoginAPI);

    console.log(`login?`);
    yield put({
      type: KAKAO_LOGIN_SUCCESS,
      token: { a: result, r: result },
      data: { platform: `kakao` },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: KAKAO_LOGIN_ERROR,
      error,
    });
  }
}

async function kakaoLogoutAPI() {
  return await KakaoLogins.logout();
}

function* kakaoLogout() {
  try {
    const result = yield call(kakaoLogoutAPI);

    console.log(`logout?`);
    yield put({
      type: KAKAO_LOGOUT_SUCCESS,
      token: { a: result, r: result },
      data: { platform: `kakao` },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: KAKAO_LOGOUT_ERROR,
      error,
    });
  }
}

// google
function* googleLogin() {
  try {
    GoogleSignin.configure();
    const signIn = async () => {
      try {
        // await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        if (userInfo) return userInfo;
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    };

    const result = signIn();
    console.log(`result`, result);
    yield put({
      type: GOOGLE_LOGIN_SUCCESS,
      token: result,
      data: { platform: `google`, result: result },
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: GOOGLE_LOGIN_ERROR,
      error,
    });
  }
}

// get items
function getItemsAPI() {
  return axios.get(``);
}

function* getItems() {
  try {
    const result = yield call(getItemsAPI);
    yield put({
      type: GET_ITEMS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: GET_ITEMS_ERROR,
      error: error.response.data,
    });
  }
}

// ------------------ watches ----------------------

function* watchKakaoLogin() {
  yield takeLatest(KAKAO_LOGIN_REQUEST, kakaoLogin);
}

function* watchKakaoLogout() {
  yield takeLatest(KAKAO_LOGOUT_REQUEST, kakaoLogout);
}

function* watchGoogleLogin() {
  yield takeLatest(GOOGLE_LOGIN_REQUEST, googleLogin);
}

function* watchGetItems() {
  yield takeLatest(GET_ITEMS_REQUEST, getItems);
}

export default function* userSaga() {
  yield all([
    fork(watchKakaoLogin),
    fork(watchGoogleLogin),
    fork(watchKakaoLogout),
    fork(watchGetItems),
  ]);
}
