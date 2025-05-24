import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CalendarScreen from '../screen/CalendarScreen';
import LibraryScreen from '../screen/LibraryScreen';
import MyPageScreen from '../screen/MyPageScreen';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#8e8e93',
      }}>
      <Tab.Screen
        name="캘린더"
        component={CalendarScreen}
        options={{
          tabBarLabel: '캘린더',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="calendar-month-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="통계"
        component={LibraryScreen}
        options={{
          tabBarLabel: '통계',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="chart-bar"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="더보기"
        component={MyPageScreen}
        options={{
          tabBarLabel: '더보기',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="more" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;
