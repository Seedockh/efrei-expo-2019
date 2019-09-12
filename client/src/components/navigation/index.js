import React from 'react';
import viewHome from '../../screens/home/viewHome';
import viewProfile from '../../screens/profile/viewProfile';
import editProfile from '../../screens/profile/editProfile';
import createProfile from '../../screens/profile/createProfile';
import sellerProfile from '../../screens/profile/sellerProfile';
import productsList from '../../screens/products/productsList';
import viewProduct from '../../screens/products/viewProduct';
import createPost from '../../screens/products/createPost';
import editPost from '../../screens/products/editPost';
import Disconnected from '../../components/disconnected';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Style from '../../styles'

const HomeStack = createStackNavigator(
  {
    viewHome: {
      screen: viewHome
    },
  },
  {
    defaultNavigationOptions: Style.navigation.header,
    tabBarOptions: Style.navigation.tabBar
  }
);

const ProfileStack = createStackNavigator({
    viewProfile: {
        screen: viewProfile
    },
    editProfile: {
        screen: editProfile
    },
    createProfile: {
        screen: createProfile
    },
    Disconnected: {
        screen: Disconnected
    }
}, {
    initialRouteName: 'viewProfile'
});

const ProductsStack = createStackNavigator({
    productsList: {
        screen: productsList
    },
    viewProduct: {
        screen: viewProduct
    },
    createPost: {
        screen: createPost
    },
    editPost: {
        screen: editPost
    },
    sellerProfile: {
        screen: sellerProfile
    },
    Disconnected: {
        screen: Disconnected
    }
}, {
    initialRouteName: 'productsList',
});

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack
    },
    Profile: {
        screen: ProfileStack
    },
    Products: {
        screen: ProductsStack
    }
}, {
    initialRouteName: 'Home',
});

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;
