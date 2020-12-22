import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Button,
  TouchableNativeFeedback,
} from 'react-native';
import DrawerLayout from '../components/DrawerLayout';
import Header from '../components/Header';
import Product from '../components/Product';
import { favoritesItem } from '../dummy/dummy';

function FavoriteListHeader() {
  const navigation = useNavigation();
  const moveLoginPage = useCallback(() => navigation.navigate('마이페이지'), [
    navigation,
  ]);
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>찜한 상품</Text>
      </View>
      <View style={styles.headerBox}>
        <View>
          <Text style={styles.headerText}>로그인을 하시면 나만의</Text>
          <Text style={styles.headerText}>서랍을 만드실 수 있어요!</Text>
        </View>
        <TouchableNativeFeedback onPress={moveLoginPage}>
          <View style={styles.login}>
            <Text style={styles.loginText}>로그인</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </>
  );
}

function FavoriteScreens({ openDrawer }) {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <Header title={'찜'} openDrawer={openDrawer} />
      <FavoriteListHeader />
      <View style={styles.container}>
        {favoritesItem.length !== 0 ? (
          <FlatList
            data={favoritesItem}
            renderItem={({ item }) => {
              return (
                <Product
                  storeName={item.storeName}
                  discount={item.discount}
                  uri={item.uri}
                  quantity={item.quantity}
                  price={item.price}
                  title={item.title}
                  len={true}
                />
              );
            }}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            onRefresh={() => setRefresh((prev) => !prev)}
            refreshing={refresh}
            onr
          />
        ) : (
          <Product
            price={0}
            title={'찜한 상품이 없습니다.'}
            quantity={'0'}
            uri={''}
            len={false}
            discount={'0'}
            storeName={'No Data'}
          />
        )}
      </View>
    </>
  );
}

function FavoriteScreen() {
  return (
    <>
      <DrawerLayout Component={FavoriteScreens} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'yellow',
  },
  headerContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 14,
  },
  login: {
    borderRadius: 4,
    borderColor: `#2196F3`,
    borderStyle: 'solid',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  loginText: {
    color: `#2196F3`,
  },
});

export default React.memo(FavoriteScreen);
