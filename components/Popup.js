import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Button,
  TouchableNativeFeedback,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import IconIo from 'react-native-vector-icons/Ionicons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { priceComma } from '../util/price';

export function CouponPopup({ setVisible }) {
  const money = [100000, 60000, 20000, 10000, 4000, 3000, 1000, 500];
  return (
    <>
      <View style={styles.modalTitleContainer}>
        <View style={styles.modalClose}>
          <TouchableNativeFeedback onPress={() => setVisible(false)}>
            <IconIo name={`close`} size={20} color="black" />
          </TouchableNativeFeedback>
        </View>
        <View style={styles.modalTitle}>
          <Text style={{ fontSize: 18, fontWeight: `bold` }}>쿠폰</Text>
        </View>
      </View>
      <View style={styles.couponContainer}>
        <FlatList
          data={money}
          renderItem={({ item }) => {
            return (
              <TouchableNativeFeedback onPress={() => {}}>
                <View style={styles.couponItem}>
                  <View>
                    <Text style={{ fontWeight: `bold`, fontSize: 16 }}>
                      {priceComma(item)}원 할인 쿠폰
                    </Text>
                    <Text style={{ fontSize: 12, color: `rgba(0, 0, 0, 0.5)` }}>
                      최소 구매 금액 {priceComma(item * 5)}원
                    </Text>
                  </View>
                  <View>
                    <IconMC name="download" size={20} color="black" />
                  </View>
                </View>
              </TouchableNativeFeedback>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

export function PurchaseOptions({ options, name }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onChoice = useCallback((text) => {
    setChoice(text);
    setOpen(false);
  }, []);

  const optionStyle = StyleSheet.create({
    optionContainer: {
      marginVertical: 10,
      borderRadius: 5,
      borderWidth: 2,
      borderStyle: `solid`,
      borderColor: `rgba(0, 0, 0, 0.5)`,
    },
    optionBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    optionItem: {
      justifyContent: 'center',
      padding: 10,
      borderTopWidth: 2,
      borderStyle: `solid`,
      borderColor: `rgba(0, 0, 0, 0.5)`,
    },
  });

  return (
    <View style={optionStyle.optionContainer}>
      <TouchableNativeFeedback onPress={() => setOpen((prev) => !prev)}>
        <View>
          <View style={optionStyle.optionBox}>
            <Text>{choice}</Text>
            <IconIo
              name={!open ? 'caret-down-outline' : 'caret-up-outline'}
              size={14}
              color="black"
            />
          </View>
        </View>
      </TouchableNativeFeedback>
      {open ? (
        options.map((element, index) => (
          <TouchableNativeFeedback
            onPress={() => onChoice(element)}
            key={index}>
            <View style={optionStyle.optionItem}>
              <Text>{element}</Text>
            </View>
          </TouchableNativeFeedback>
        ))
      ) : (
        <></>
      )}
    </View>
  );
}

export function PurchasePopup({ setVisible, options }) {
  const purcharseStyle = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 20,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    closeContainer: {
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      borderRadius: 5,
      borderWidth: 2,
      borderStyle: `solid`,
      borderColor: `rgba(0, 0, 0, 0.5)`,
    },
    closeText: {},
  });
  const option = [
    ['아이보리', '노랑색'],
    ['빨강', '파랑'],
  ];
  const option1 = [];
  for (let i = 1; i < options + 1; i++) {
    option1.push(i);
  }

  return (
    <>
      <View style={purcharseStyle.container}>
        <FlatList
          data={option}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(itemData) => {
            return (
              <PurchaseOptions
                name={itemData.index + 1}
                options={itemData.item}
                setChoicedOptions={setChoicedOptions}
                choicedOptions={choicedOptions}
                key={itemData.index.toString()}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
        <View>
          <TouchableNativeFeedback onPress={() => setVisible(false)}>
            <View style={purcharseStyle.closeContainer}>
              <Text style={purcharseStyle.closeText}>옵션 선택 닫기</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </>
  );
}

function Popup({ visible, Component }) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onDismiss={Keyboard.dismiss}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {Component ? <Component /> : <></>}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: `rgba(0, 0, 0, 0.5)`,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: Dimensions.get('window').height * 0.65,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingVertical: 5,
  },
  modalTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    left: 10,
  },
  couponContainer: {
    paddingHorizontal: 10,
  },
  couponItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: `rgba(0, 0, 0, .25)`,
  },
});

export default Popup;
