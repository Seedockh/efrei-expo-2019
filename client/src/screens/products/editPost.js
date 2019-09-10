import React from 'react';
import { Provider, Button } from 'react-native-paper';
import { useStateValue } from '../../hooks/state';
import ProductForm from '../../components/productForm';

const Screen = ({ navigation }) => {
    const [{}, dispatch] = useStateValue();

    return (
        <Provider>
            <ProductForm/>
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'Edit Post / Product'
}

export default Screen;