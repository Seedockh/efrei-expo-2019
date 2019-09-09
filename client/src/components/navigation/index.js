import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../hooks/state';
import { BottomNavigation } from 'react-native-paper';
import productsList from '../../screens/products/productsList';
import viewProfile from '../../screens/profile/viewProfile';

// Routes
const productsRoute = isLogged => isLogged ? productsList : productsList;
const profileRoute = isLogged => isLogged ? viewProfile : viewProfile;

export default function Navigation() {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'products', title: 'Products', icon: 'search' },
		{ key: 'profile', title: 'Profile', icon: 'account-circle' }
    ]);
	const [{ token, isLogged }, dispatch] = useStateValue();

    const _handleIndexChange = index => setIndex(index);

    const _renderScene = BottomNavigation.SceneMap({ products: productsRoute(isLogged), profile: profileRoute(isLogged) })

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={_handleIndexChange}
            renderScene={_renderScene}
            barStyle={{backgroundColor: 'black'}}
            activeColor={'lightgreen'}
            inactiveColor={'white'}
        />     
    );
}