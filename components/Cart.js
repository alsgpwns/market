import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { useSelector } from 'react-redux';
import Popup from './Popup';

function CartContent() {
  return (
    <View>
      <Text>Cart</Text>
    </View>
  );
}

function Cart({ setVisible }) {
  const user = useSelector((state) => state.user);
  const navi = useNavigation();
  // if (!user.account)
  //   Alert.alert(`오류`, `로그인이 필요합니다`, [
  //     { style: `destructive`, text: `OK` },
  //   ]);

  return (
    <View>
      <Text>Cart</Text>
      <Button
        title="마이페이지 이동"
        onPress={() => navi.navigate('마이페이지')}
      />
      <Text>d</Text>
      <Button title={`닫기`} onPress={() => setVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Cart;
