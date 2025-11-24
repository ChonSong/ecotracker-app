import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DashboardScreen } from '../screens/DashboardScreen';
import { LogScreen } from '../screens/LogScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { RootTabParamList } from '../types';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator<RootTabParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: string = 'circle';

            if (route.name === 'Dashboard') {
              iconName = 'view-dashboard';
            } else if (route.name === 'Log') {
              iconName = 'plus-circle';
            } else if (route.name === 'History') {
              iconName = 'history';
            }

            return <Icon name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2e7d32',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Log" component={LogScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
