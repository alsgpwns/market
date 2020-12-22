import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import DrawerLayout from '../components/DrawerLayout';
import Header from '../components/Header';
import Information from '../components/Information';
import Login from '../components/Login';

const MyPageScreens = ({ openDrawer }) => {
  return (
    <>
      <Header title={'마이페이지'} openDrawer={openDrawer} />
      <View style={styles.container}>
        <Login />
        <Information />
      </View>
    </>
  );
};

function MyPage() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <>
      <DrawerLayout Component={MyPageScreens} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

export default React.memo(MyPage);
