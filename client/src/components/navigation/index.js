import React from 'react';
import login from '../../screens/auth/login';
import register from '../../screens/auth/register';

import viewHome from '../../screens/home/viewHome';
import viewProfile from '../../screens/profile/viewProfile';
import editProfile from '../../screens/profile/editProfile';
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
      screen: viewHome,
      navigationOptions: {
        title: 'Home',
      },
    },
  },
  {
    defaultNavigationOptions: Style.navigation.header,
  }
);

const ProfileStack = createStackNavigator(
  {
    viewProfile: {
        screen: viewProfile,
        navigationOptions: {
          title: 'Profile',
        },
    },
    editProfile: {
        screen: editProfile,
        navigationOptions: {
          title: 'Edit profile',
        },
    },
    Disconnected: {
        screen: Disconnected
    }
  },
  {
      initialRouteName: 'viewProfile',
      defaultNavigationOptions: Style.navigation.header,
  }
);

const ProductsStack = createStackNavigator({
    productsList: {
        screen: productsList,
        navigationOptions: {
          title: 'Products',
        },
    },
    viewProduct: {
        screen: viewProduct,
        navigationOptions: {
          title: 'View product',
        },
    },
    createPost: {
        screen: createPost,
        navigationOptions: {
          title: 'Post a product',
        },
    },
    editPost: {
        screen: editPost,
        navigationOptions: {
          title: 'Edit a post',
        },
    },
    sellerProfile: {
        screen: sellerProfile,
        navigationOptions: {
          title: 'Seller profile',
        },
    },
    Disconnected: {
        screen: Disconnected
    }
}, {
    initialRouteName: 'productsList',
    defaultNavigationOptions: Style.navigation.header,
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
        screen: HomeStack,
    },
    Products: {
        screen: ProductsStack
    },
    Profile: {
        screen: ProfileStack
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: Style.navigation.tabBar,
  }
);

const NavigationStack = createStackNavigator(
  {
    login: {
      screen: login,
      navigationOptions: {
        header: null,
        tabBarVisible: false,
      },
    },
    register: {
      screen: register,
      navigationOptions: {
        tabBarVisible: false,
        header: null,
      },
    },
    tabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        tabBarVisible: false,
        header: null,
      },
    }
  },
  {
    initialRouteName: 'login',
    tabBarOptions: Style.navigation.tabBar,
  }
);

const AppContainer = createAppContainer(NavigationStack);

export default AppContainer;
