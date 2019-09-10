import React from 'react';
import { Provider, Button } from 'react-native-paper';
import { useStateValue } from '../../hooks/state';
import ProductForm from '../../components/productForm';

const Screen = ({ navigation }) => {
    const [{ isLogged }, dispatch] = useStateValue();

    const createProduct = () => {
        // If product data are ok :
        // Create and goBack
        navigation.goBack();
    }

    return (
        <Provider>
            <ProductForm/>
            <Button icon="send" mode="contained" onPress={createProduct}>Create</Button>
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'Create Post / Add Product'
}

export default Screen;