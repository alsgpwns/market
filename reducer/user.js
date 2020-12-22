import produce from 'immer';

const user = {
  account: null,
  products: [],
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  productsLoading: false,
  productsDone: false,
  productsError: null,
};

export const KAKAO_LOGIN_REQUEST = 'USER/KAKAO_LOGIN_REQUEST';
export const KAKAO_LOGIN_SUCCESS = `USER/KAKAO_LOGIN_SUCCESS`;
export const KAKAO_LOGIN_ERROR = `USER/KAKAO_LOGIN_ERROR`;

export const GOOGLE_LOGIN_REQUEST = 'USER/GOOGLE_LOGIN_REQUEST';
export const GOOGLE_LOGIN_SUCCESS = `USER/GOOGLE_LOGIN_SUCCESS`;
export const GOOGLE_LOGIN_ERROR = `USER/GOOGLE_LOGIN_ERROR`;

export const KAKAO_LOGOUT_REQUEST = 'USER/KAKAO_LOGOUT_REQUEST';
export const KAKAO_LOGOUT_SUCCESS = `USER/KAKAO_LOGOUT_SUCCESS`;
export const KAKAO_LOGOUT_ERROR = `USER/KAKAO_LOGOUT_ERROR`;

export const GOOGLE_LOGOUT_REQUEST = 'USER/GOOGLE_LOGOUT_REQUEST';
export const GOOGLE_LOGOUT_SUCCESS = `USER/GOOGLE_LOGOUT_SUCCESS`;
export const GOOGLE_LOGOUT_ERROR = `USER/GOOGLE_LOGOUT_ERROR`;

export const GET_PRODUCTS_REQUEST = `USER/GET_PRODUCTS_REQUEST`;
export const GET_PRODUCTS_SUCCESS = `USER/GET_PRODUCTS_SUCCESS`;
export const GET_PRODUCTS_ERROR = `USER/GET_PRODUCTS_ERROR`;

export const kakaoLoginRequest = () => ({
  type: KAKAO_LOGIN_REQUEST,
});

export const googleLoginRequest = () => ({
  type: GOOGLE_LOGIN_REQUEST,
});

export const kakaoLogoutRequest = () => ({
  type: KAKAO_LOGOUT_REQUEST,
});

export const googleLogoutRequest = () => ({
  type: GOOGLE_LOGOUT_REQUEST,
});

export const getProducts = () => ({
  type: GET_PRODUCTS_REQUEST,
});

const userReducer = (state = user, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // login kakao
      case (KAKAO_LOGIN_REQUEST, GOOGLE_LOGIN_REQUEST):
        draft.loginLoading = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case (KAKAO_LOGIN_SUCCESS, GOOGLE_LOGIN_SUCCESS):
        draft.loginLoading = false;
        draft.loginDone = true;
        draft.account = action.data;
        break;
      case (KAKAO_LOGIN_ERROR, GOOGLE_LOGIN_ERROR):
        draft.loginLoading = false;
        draft.loginError = action.error;
        break;
      // logout kakao
      case (KAKAO_LOGOUT_REQUEST, GOOGLE_LOGOUT_REQUEST):
        draft.logoutLoading = true;
        draft.logoutDone = true;
        break;
      case (KAKAO_LOGOUT_SUCCESS, GOOGLE_LOGOUT_SUCCESS):
        draft.logoutLoading = false;
        draft.logoutDone = true;
        draft.account = null;
        break;
      case (KAKAO_LOGOUT_ERROR, GOOGLE_LOGOUT_ERROR):
        draft.logoutLoading = false;
        draft.logoutDone = false;
        draft.logoutError = action.error;
        break;
      case GET_PRODUCTS_REQUEST:
        draft.productsLoading = true;
        draft.productsDone = false;
        break;
      case GET_PRODUCTS_SUCCESS:
        draft.productsLoading = false;
        draft.productsDone = true;
        draft.products = draft.products.concat(action.data);
        break;
      case GET_PRODUCTS_ERROR:
        draft.productsLoading = false;
        draft.productsDone = false;
        draft.productsError = action.error;
        break;
    }
  });

export default userReducer;
