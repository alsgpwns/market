// import React, { useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   DrawerLayoutAndroid,
//   Dimensions,
//   Animated,
//   Image,
//   FlatList,
//   ScrollView,
//   AppRegistry,
//   Platform,
// } from 'react-native';
// import { Swipeable } from 'react-native-gesture-handler';
// import Swiper from 'react-native-swiper';
// import KakaoLogins, {
//   KAKAO_AUTH_TYPES,
//   login,
// } from '@react-native-seoul/kakao-login';
// import NativeButton from 'apsl-react-native-button';

// const { width, height } = Dimensions.get('window');

// if (!KakaoLogins) {
//   console.error('Module is Not Linked');
// }

// const logCallback = (log, callback) => {
//   console.log(log);
//   callback;
// };

// const TOKEN_EMPTY = 'token has not fetched';
// const PROFILE_EMPTY = {
//   id: 'profile has not fetched',
//   email: 'profile has not fetched',
//   profile_image_url: '',
// };

// function Temp() {
//   const [loginLoading, setLoginLoading] = useState(false);
//   const [logoutLoading, setLogoutLoading] = useState(false);
//   const [profileLoading, setProfileLoading] = useState(false);
//   const [unlinkLoading, setUnlinkLoading] = useState(false);

//   const [token, setToken] = useState(TOKEN_EMPTY);
//   const [profile, setProfile] = useState(PROFILE_EMPTY);

//   const kakaoLogin = () => {
//     logCallback('Login Start', setLoginLoading(true));

//     KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
//       .then((result) => {
//         setToken(result.accessToken);
//         logCallback(
//           `Login Finished:${JSON.stringify(result)}`,
//           setLoginLoading(false),
//         );
//       })
//       .catch((err) => {
//         if (err.code === 'E_CANCELLED_OPERATION') {
//           logCallback(`Login Cancelled:${err.message}`, setLoginLoading(false));
//         } else {
//           logCallback(
//             `Login Failed:${err.code} ${err.message}`,
//             setLoginLoading(false),
//           );
//         }
//       });
//   };

//   const kakaoLogout = () => {
//     logCallback('Logout Start', setLogoutLoading(true));

//     KakaoLogins.logout()
//       .then((result) => {
//         setToken(TOKEN_EMPTY);
//         setProfile(PROFILE_EMPTY);
//         logCallback(`Logout Finished:${result}`, setLogoutLoading(false));
//       })
//       .catch((err) => {
//         logCallback(
//           `Logout Failed:${err.code} ${err.message}`,
//           setLogoutLoading(false),
//         );
//       });
//   };

//   const getProfile = () => {
//     logCallback('Get Profile Start', setProfileLoading(true));

//     KakaoLogins.getProfile()
//       .then((result) => {
//         setProfile(result);
//         logCallback(
//           `Get Profile Finished:${JSON.stringify(result)}`,
//           setProfileLoading(false),
//         );
//       })
//       .catch((err) => {
//         logCallback(
//           `Get Profile Failed:${err.code} ${err.message}`,
//           setProfileLoading(false),
//         );
//       });
//   };

//   const unlinkKakao = () => {
//     logCallback('Unlink Start', setUnlinkLoading(true));

//     KakaoLogins.unlink()
//       .then((result) => {
//         setToken(TOKEN_EMPTY);
//         setProfile(PROFILE_EMPTY);
//         logCallback(`Unlink Finished:${result}`, setUnlinkLoading(false));
//       })
//       .catch((err) => {
//         logCallback(
//           `Unlink Failed:${err.code} ${err.message}`,
//           setUnlinkLoading(false),
//         );
//       });
//   };

//   const { id, email, profile_image_url: photo } = profile;
//   return (
//     <View style={styles.container}>
//       <View style={styles.profile}>
//         <Image style={styles.profilePhoto} source={{ uri: photo }} />
//         <Text>{`id : ${id}`}</Text>
//         <Text>{`email : ${email}`}</Text>
//       </View>
//       <View style={styles.content}>
//         <Text style={styles.token}>{token}</Text>
//         <NativeButton
//           isLoading={loginLoading}
//           onPress={kakaoLogin}
//           activeOpacity={0.5}
//           style={styles.btnKakaoLogin}
//           textStyle={styles.txtKakaoLogin}>
//           LOGIN
//         </NativeButton>
//         <NativeButton
//           isLoading={logoutLoading}
//           onPress={kakaoLogout}
//           activeOpacity={0.5}
//           style={styles.btnKakaoLogin}
//           textStyle={styles.txtKakaoLogin}>
//           Logout
//         </NativeButton>
//         <NativeButton
//           isLoading={profileLoading}
//           onPress={getProfile}
//           activeOpacity={0.5}
//           style={styles.btnKakaoLogin}
//           textStyle={styles.txtKakaoLogin}>
//           getProfile
//         </NativeButton>
//         <NativeButton
//           isLoading={unlinkLoading}
//           onPress={unlinkKakao}
//           activeOpacity={0.5}
//           style={styles.btnKakaoLogin}
//           textStyle={styles.txtKakaoLogin}>
//           unlink
//         </NativeButton>
//         <NativeButton></NativeButton>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: Dimensions.get('window').width,
//     height: 40,
//   },
//   image: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   pictures: {
//     width: width,
//     flexDirection: 'row',
//     height: height,
//   },
// });

// export default React.memo(Temp);
