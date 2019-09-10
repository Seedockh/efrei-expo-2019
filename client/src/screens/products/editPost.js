import React from 'react';
import { Provider, Button } from 'react-native-paper';
import ProductForm from '../../components/productForm';
import * as queries from '../../apollo/queries';
import { useStateValue } from '../../hooks/state';
import * as mutations from '../../apollo/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';

const Screen = ({ navigation }) => {
    const [{ productTitle, productCategory, productPrice, productImage, id }, dispatch] = useStateValue();

    const [editPost, {
		data: mutationData
    }] = useMutation(mutations.EDIT_POST);

    const post = navigation.getParam('post');

    const setState = (state, value) => {
        return dispatch({
            type: 'setState',
            state,
            value
        })
    }

    const editProduct = async () => {
        await editPost({
			variables: {
                id: post.id,
				data: {
					title: productTitle,
                    price: parseFloat(productPrice),
                    image: productImage,
                    CategoryId: productCategory,
                    UserId: id
				}
            },
            refetchQueries:[{
                query: queries.GET_POSTS
            }]
        })
        await setState("onEditProduct", false)
        await setState("productTitle", "")
        await setState("productCategory", 1)
        await setState("productPrice", "1")
        await setState("productImage", "")
        await setState("productId", null)
        navigation.goBack();
    }

    return (
        <Provider>
            <ProductForm post={post}/>
            <Button icon="account-circle" mode="contained" onPress={editProduct}>Save</Button>   
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'Edit Post / Product'
}

export default Screen;