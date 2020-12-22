import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconIo from 'react-native-vector-icons/Ionicons';
import { priceComma } from '../util/price';
import Swiper from 'react-native-swiper';
import Header from './Header';
import Popup, { CouponPopup, PurchasePopup } from './Popup';
import DrawerLayout from './DrawerLayout';

function ProductInfo1({ route, openDrawer }) {
  const [coupon, setCoupon] = useState(false);
  const [buy, setBuy] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false });
    console.log(navigation);
  }, [navigation]);

  const { info } = route.params;
  // const params = navigation.
  const { uri, discount, price, storeName, title, quantity } = info;
  // const title = '(1+1할인) 오버니삭스';

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Header openDrawer={openDrawer} />
          {/* 헤더가 사진 위로 겹쳐서 보여야함 */}
          <Swiper
            showsButtons
            loop={false}
            showsHorizontalScrollIndicator={false}
            showsPagination={true}
            nextButton={() => <></>}
            prevButton={() => <></>}
            width={Dimensions.get('window').width}
            height={150}>
            <Image source={{ uri }} style={styles.image} />
            <Image source={{ uri }} style={styles.image} />
            <Image source={{ uri }} style={styles.image} />
            <FlatList
              data={uri}
              renderItem={(itemData) => (
                <Image source={{ uri }} style={styles.image} />
              )}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          </Swiper>
        </View>
        <View style={styles.productInfo}>
          {/* <Text>{discount}</Text> */}
          <View>
            <Text>{title}</Text>
            <Text style={styles.priceText}>{priceComma(price)}원</Text>
          </View>
          <Popup
            visible={coupon}
            Component={() => <CouponPopup setVisible={setCoupon} />}
            key={'coupon'}
          />
          <TouchableNativeFeedback onPress={() => setCoupon(true)}>
            <View style={styles.coupon}>
              <Text style={styles.couponText}>
                최대 100,000원 할인 쿠폰받기
              </Text>
              <IconIo name="caret-down" size={14} color={`#2196F3`} />
            </View>
          </TouchableNativeFeedback>
          <Text style={styles.productCodeText}>상품코드 3080-347202</Text>
        </View>
      </ScrollView>
      <View style={styles.paymentBar}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.like}>
            <IconIo name="heart-outline" size={20} color="#ff0000" />
            <Text style={styles.likeText}>1.7만</Text>
          </View>
        </TouchableWithoutFeedback>
        <Popup
          visible={buy}
          Component={() => <PurchasePopup setVisible={setBuy} />}
          key={'purchase'}
        />
        <TouchableNativeFeedback onPress={() => setBuy(true)}>
          <View style={styles.payment}>
            <Text style={styles.paymentText}>구매하기</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </>
  );
}

const ProductInfo = ({ route }) => {
  return (
    <>
      <DrawerLayout Component={() => <ProductInfo1 route={route} />} />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: 150,
  },
  productInfo: {
    flexDirection: 'column',
    flex: 1,
    height: 200,
    justifyContent: 'space-evenly',
    backgroundColor: 'gold',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  productPrice: {},
  priceText: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 40,
  },
  coupon: {
    paddingVertical: 10,
    borderRadius: 4,
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderColor: `#2196F3`,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  couponText: {
    color: `#2196F3`,
    fontWeight: 'bold',
  },
  productCodeText: {
    fontSize: 12,
    color: `rgba(0, 0, 0, 0.5)`,
    // 색으로 바꿀 것
  },
  paymentBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#fafafa',
    justifyContent: 'space-evenly',
    elevation: 2,
  },
  like: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  likeText: {
    fontSize: 12,
  },
  payment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212529',
    borderRadius: 10,
    height: 40,
    marginLeft: 10,
  },
  paymentText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default ProductInfo;
