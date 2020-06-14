import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import RouterScreen from '../screens/RouterScreen';
import LinksScreen from '../screens/LinksScreen';

import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Router';



export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <AntDesign name="home" size={24} color="black" />,
        }}
      />

      <BottomTab.Screen
        name="Router"
        component={RouterScreen}
        options={{
          title: 'Rota',
          tabBarIcon: ({ focused }) => <FontAwesome5 name="route" size={24} color="black" />,
        }}
      />
      <BottomTab.Screen
        name="Classification"
        component={LinksScreen}
        options={{
          title: 'Classificação',
          tabBarIcon: ({ focused }) => <Entypo name="star-outlined" size={24} color="black" />,
        }}
      />
      
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
  }
}
