import React, { memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MainScreen from '../screens/MainScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import MyPage from '../screens/MyPage';
import ProductInfo from '../components/ProductInfo';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
// LogBox.ignoreWarnings(['Warning: ...']);
function FavoriteScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
      <Stack.Screen
        name="ProductInfo"
        component={ProductInfo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function MainScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductInfo"
        component={ProductInfo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const router = [
  {
    id: 1,
    name: '홈',
    component: MainScreenStack,
    iconName: 'home-outline',
    focusedName: 'home',
  },
  {
    id: 2,
    name: '찜',
    component: FavoriteScreenStack,
    iconName: 'heart-outline',
    focusedName: 'heart',
  },
  {
    id: 3,
    name: '마이페이지',
    component: MyPage,
    iconName: 'user-o',
    focusedName: 'user',
  },
];

export function BottomTab() {
  return (
    <Tab.Navigator
      activeColor="#ff0000"
      inactiveColor="gray"
      initialRouteName="홈"
      backBehavior="none"
      screenOptions={{ tabBarColor: '#fff' }}
      barStyle={{ backgroundColor: '#fff' }}>
      {router.map((element) => (
        <Tab.Screen
          key={element.id}
          name={element.name}
          component={element.component}
          options={{
            tabBarIcon: ({ focused }) => {
              if (element.id === 3) {
                return (
                  <FontAwesome
                    name={focused ? element.focusedName : element.iconName}
                    size={20}
                    color={focused ? 'red' : 'gray'}
                  />
                );
              }
              return (
                <Icon
                  name={focused ? element.focusedName : element.iconName}
                  size={20}
                  color={focused ? 'red' : 'gray'}
                />
              );
            },
            tabBarLabel: element.name,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export function Navigate() {
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
}

export const Navigator = memo(Navigate);
