import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons';
/**
 * createSwitchNavigator - Only Show ONE SCREEN/STACK at one time
 *  1. Loading Screen
 *  2. Authentication StackNavigator
 *    - Auth Welcome Screen
 *    - SignIn Screen
 *    - Sign Up Screen
 *  3. AppDrawerNavigator
 *    - App StackNavigator (to give a common header to the tabs)
 *       - App TabNavigator
 *         - Home Tab
 *         - Settings Tab
 */


import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'
import WelcomeScreen from './src/screens/WelcomeScreen'
import SignInScreen from './src/screens/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import HomeScreen from './src/screens/HomeScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import MapScreen from './src/screens/MapScreen'

const AuthStackNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen
},{
  headerMode: 'none'
})

const AppTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'HOME',
      tabBarIcon: () => (
        <Icon name="home" size={24} />
      )
    }
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      title: 'Map',
      tabBarLabel: 'Map',
      tabBarIcon: ({tintColor}) => (
      <View style={{
          height: 80,
          width: 80,
          borderRadius: 100,
          backgroundColor: '#FE6D64',
          alignItems: 'center',
          justifyContent: 'center'
          paddingTop: 15}}>
        <Icon name="globe" type="font-awesome" size={45} color={tintColor}/>
      </View>
    )
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: () => (
        <Icon name="user" size={24} />
      )
    }

  }
})

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Your App',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" size={24} />
          </View>
        </TouchableOpacity>
      )
    })
  }
})

/*
AppTabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  let headerTitle = routeName;

  return {
    headerTitle,
  };
};
*/

const AppDrawerNavigator = createDrawerNavigator({
  Home: AppStackNavigator
})

export default createSwitchNavigator({
  AuthLoading: { screen: AuthLoadingScreen },
  Auth: { screen: AuthStackNavigator },
  App: { screen: AppDrawerNavigator }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
