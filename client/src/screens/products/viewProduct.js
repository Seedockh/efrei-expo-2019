import React from 'react';
import { Provider, Button } from 'react-native-paper';
import { Text, Image } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';

const Screen = ({ navigation }) => {

    const { data } = useQuery(queries.GET_POST, {
		variables: {
			id: navigation.getParam('productId')
		}
	});

    return (
        <Provider>
            {data != undefined && (
                <>
                    <Text>Title: {data.post.title}</Text>
                    <Text>Price: ${data.post.price}</Text>
                    <Text>Category: {data.post.CategoryId}</Text>
                    <Image
                        style={{height: 200}}
                        source={{ uri: data.post.image }}
                    />
                    <Text>Product ID: {data.post.id}</Text>
                    <Text>Seller ID: {data.post.UserId}</Text>
                    <Button icon="account-circle" mode="contained" onPress={() => navigation.navigate('sellerProfile')}>Seller Profile</Button>      
                </>
            )}    
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'View Product'
}

export default Screen;