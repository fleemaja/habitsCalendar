import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import TodoScreen from '../screens/TodoScreen';
import HabitsScreen from '../screens/HabitsScreen';
import MoodScreen from '../screens/MoodScreen';
import AddHabitFormScreen from '../screens/AddHabitFormScreen';

const TodoStack = createStackNavigator({
  Todo: TodoScreen,
});

TodoStack.navigationOptions = {
  tabBarLabel: 'To Do List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-list' : 'md-list'
      }
    />
  ),
};

const HabitsStack = createStackNavigator({
    Habits: HabitsScreen,
    AddHabitForm: AddHabitFormScreen
  },
  {
    initialRouteName: "Habits"
  }
);

HabitsStack.navigationOptions = {
  tabBarLabel: 'Habits',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
    />
  ),
};

const MoodStack = createStackNavigator({
  Mood: MoodScreen,
});

MoodStack.navigationOptions = {
  tabBarLabel: 'Mood',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
    />
  ),
};

export default createBottomTabNavigator({
  TodoStack,
  HabitsStack,
  MoodStack,
});
