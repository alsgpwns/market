import React, { useCallback, useEffect } from 'react';
import { Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Category, { CategoryHorizontal } from '../components/Category';
import DrawerLayout from '../components/DrawerLayout';
import Header from '../components/Header';
import { HomeHeader } from '../components/Header';
import Product from '../components/Product';
import { dummy } from '../dummy/dummy';
import { getProducts } from '../reducer/user';

const numColumns = 2;

const MainScreens = ({ openDrawer }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.user.products);
  const getItems = useCallback(() => dispatch(getProducts()), [dispatch]);

  useEffect(() => {
    if (products.length === 0) {
      getItems();
    }
  }, [products]);

  const useData = products.length === 0 ? dummy : products;

  return (
    <>
      <Header Component={HomeHeader} openDrawer={openDrawer} />
      <Category Component={CategoryHorizontal} />
      <FlatList
        data={useData}
        renderItem={({ item }) => (
          <Product
            storeName={item.storeName}
            discount={item.discount}
            uri={item.uri}
            len={true}
            quantity={item.quantity}
            price={item.price}
            title={item.title}
            key={item.id}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        ListHeaderComponent={() => (
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            회원님을 위한 추천 상품
          </Text>
        )}
        ListHeaderComponentStyle={{ marginVertical: 20, paddingLeft: 10 }}
        windowSize={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      />
    </>
  );
};

const MainScreen = () => {
  return (
    <>
      <DrawerLayout Component={MainScreens} />
    </>
  );
};

export default React.memo(MainScreen);
