import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SearchScreen from './src/screens/SearchScreen';
import HomeScreen from './src/screens/HomeScreen';

const navigator=createStackNavigator({
  Search:SearchScreen,
  Home:HomeScreen
},{
  initialRouteName:'Home',
  defaultNavigationOptions:{
    title:'Weather'
  }
})

export default createAppContainer(navigator);