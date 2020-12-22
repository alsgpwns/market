/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { memo } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import rootSaga from './saga';
import { Provider } from 'react-redux';

import { PlatformError } from './components/Error';
import { Navigator } from './navigation/navigation';
import Temp from './screens/Temp';

enableScreens();
const saga = createSagaMiddleware();
const middlewares = [saga];
// const enhancer =
//   process.env.NODE_ENV === 'production'
//     ? compose(applyMiddleware(...middlewares))
//     : composeWithDevTools(applyMiddleware(...middlewares));
const enhancer = composeWithDevTools(applyMiddleware(saga));
const store = createStore(rootReducer, enhancer);
saga.run(rootSaga);

const App = () => {
  if (Platform.OS !== 'android' || Platform.Version < 29)
    return <PlatformError />;
  return (
    <Provider store={store}>
      <StatusBar barStyle="default" />
      <Navigator />
    </Provider>
    // <Temp />
  );
};

export default memo(App);
