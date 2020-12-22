import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function PlatformError() {
  return (
    <View style={styles.container}>
      <Text>안드로이드 이외의 플랫폼과</Text>
      <Text>안드로이드 10 미만의 버전에서는</Text>
      <Text>서비스하고 있지 않습니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
