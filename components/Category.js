import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { categories, womans } from '../dummy/dummy';

export const CategoryDrawer = ({ male }) => {
  const draw = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'skyblue',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
      marginVertical: 10,
      width: 70,
      height: 70,
    },
  });

  return (
    <>
      <View style={draw.container}>
        {male ? (
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <TouchableNativeFeedback key={Object.keys(item)}>
                <View style={draw.buttonContainer}>
                  <Icon name={'heart-outline'} size={20} color={'black'} />
                  <Text>{Object.values(item)}</Text>
                </View>
              </TouchableNativeFeedback>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
        ) : (
          <FlatList
            data={categories.concat(womans)}
            renderItem={({ item }) => (
              <TouchableNativeFeedback key={Object.keys(item)}>
                <View style={draw.buttonContainer}>
                  <Icon name={'heart-outline'} size={20} color={'black'} />
                  <Text>{Object.values(item)}</Text>
                </View>
              </TouchableNativeFeedback>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
        )}
      </View>
    </>
  );
};

export function CategoryHorizontal({ male }) {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.content}>
        <CategoryItems male={male} />
      </View>
    </ScrollView>
  );
}

function Category({ Component }) {
  const [male, setMale] = useState(true);
  const onChangeMale = useCallback(() => {
    setMale((prev) => !prev);
  }, []);

  return (
    <>
      <View style={styles.choiceSexBox}>
        <TouchableNativeFeedback onPress={onChangeMale}>
          <View
            style={[
              styles.choiceSex,
              { backgroundColor: male ? '#339af0' : '#fff' },
            ]}>
            <Text>남자</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={onChangeMale}>
          <View
            style={[
              styles.choiceSex,
              { backgroundColor: male ? '#fff' : '#fcc2d7' },
            ]}>
            <Text>여자</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      {Component ? <Component male={male} /> : <></>}
    </>
  );
}

function CategoryItems({ male }) {
  return (
    <>
      {male
        ? categories.map((element) => (
            <CategoryItem
              key={Object.keys(element)}
              name={Object.values(element)}
            />
          ))
        : categories
            .concat(womans)
            .map((element) => (
              <CategoryItem
                key={Object.keys(element)}
                icon={Object.keys(element)}
                name={Object.values(element)}
              />
            ))}
    </>
  );
}

function CategoryItem({ name }) {
  return (
    <TouchableNativeFeedback onPress={() => {}}>
      <View style={styles.Item}>
        <Icon name="shirt" size={30} color="black" />
        <Text style={{ textAlign: 'center' }}>{name}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 10,
    marginBottom: 10,
  },
  choiceSex: {
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  choiceSexBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Item: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: 80,
    height: 80,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Category;
