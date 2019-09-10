import React from 'react';
import { Provider, Button } from 'react-native-paper';
import { Text, Image } from 'react-native';
import * as queries from '../../apollo/queries';
import { useStateValue } from '../../hooks/state';
import * as mutations from '../../apollo/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';

const Screen = ({ navigation }) => {
    const [{ id }, dispatch] = useStateValue();

    const { data } = useQuery(queries.GET_POST, {
		variables: {
			id: navigation.getParam('productId')
		}
	});

    const [deletePost, {
		data: mutationData
    }] = useMutation(mutations.DELETE_POST);

    const deleteProduct = async () => {
        await deletePost({
			variables: {
                id: data.post.id,
			},
            refetchQueries:[{
                query: queries.GET_POSTS
            }]
		});
        navigation.goBack();
    }

    return (
        <Provider>
            {data != undefined && (
                <>
                    <Text>Title: {data.post.title}</Text>
                    <Text>Price: ${data.post.price}</Text>
                    <Text>Category: {data.post.category.name}</Text>
                    <Image
                        style={{height: 200}}
                        source={{ uri: data.post.image }}
                    />
                    <Text>Product ID: {data.post.id}</Text>
                    <Text>Sold by: {data.post.user.firstname} {data.post.user.lastname}</Text>
                    <Text>Location: {data.post.user.city}</Text>
                    <Button icon="account-circle" mode="contained" onPress={() => navigation.navigate('sellerProfile', { sellerId: data.post.user.id })}>Seller Profile</Button>  
                    {data.post.user.id == id && (
                        <>
                            <Text>You own this product, you can edit or delete it if you sold it</Text>
                            <Button icon="account-circle" mode="contained" onPress={() => navigation.navigate('editPost', { post: data.post})}>Edit</Button>
                            <Button icon="account-circle" mode="contained" onPress={deleteProduct}>Delete</Button>   
                        </>
                    )}  
                </>
            )}    
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'View Product'
}

export default Screen;