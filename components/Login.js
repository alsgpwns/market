import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableHighlight,
  Image,
  Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  kakaoLoginRequest,
  kakaoLogoutRequest,
  googleLoginRequest,
} from '../reducer/user';

function Login() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const googleLogin = useCallback(() => dispatch(googleLoginRequest()));
  const kakaoLogin = useCallback(() => dispatch(kakaoLoginRequest()));
  const kakaoLogout = useCallback(() => dispatch(kakaoLogoutRequest()));
  console.log(user);

  return (
    <>
      {user.account === null ? (
        <>
          <View style={styles.container}>
            <View>
              <Text>회원이라면 누구나 무료배송!</Text>
              <Text>별도의 회원가입 없이 소셜 로그인으로 혜택!</Text>
            </View>
          </View>
          <View style={styles.social}>
            <View style={styles.socialContainer}>
              <TouchableHighlight
                onPress={googleLogin}
                style={styles.socialContainer}>
                <Image
                  style={styles.socialImage}
                  source={require(`../assets/google.png`)}
                />
              </TouchableHighlight>
              <TouchableHighlight
                onPress={kakaoLogin}
                style={styles.socialContainer}>
                <Image
                  style={styles.socialImage}
                  source={require(`../assets/kakao.png`)}
                />
              </TouchableHighlight>
              <Button onPress={kakaoLogout} title="카카오 로그아웃" />
            </View>
          </View>
        </>
      ) : (
        <View>
          <Text>로그인 되어있습니다.{user.account}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  button: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    borderStyle: 'solid',
    paddingHorizontal: 5,
    paddingVertical: 4,
    height: 40,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(0, 0, 0, 0.25)',
  },
  social: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  socialImage: {
    width: Dimensions.get('window').width * 0.5,
    height: (Dimensions.get('window').width * 0.5 * 91) / 493,
  },
  socialContainer: {
    marginVertical: 5,
  },
});

export default Login;
