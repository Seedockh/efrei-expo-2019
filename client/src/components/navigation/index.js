import React from 'react';
import viewProfile from '../../screens/profile/viewProfile';
import editProfile from '../../screens/profile/editProfile';
import createProfile from '../../screens/profile/createProfile';
import sellerProfile from '../../screens/profile/sellerProfile';
import productsList from '../../screens/products/productsList';
import viewProduct from '../../screens/products/viewProduct';
import createPost from '../../screens/products/createPost';
import editPost from '../../screens/products/editPost';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

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
    sellerProfile: {
        screen: sellerProfile
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
    }
}, {
    initialRouteName: 'productsList',
});

const TabNavigator = createBottomTabNavigator({
    Profile: {
        screen: ProfileStack
    },
    Products: {
        screen: ProductsStack
    }
}, {
    initialRouteName: 'Profile',
});

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;