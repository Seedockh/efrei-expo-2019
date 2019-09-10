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

    const editProduct = async () => {
        await editPost({
			variables: {
                id: post.id,
				data: {
					title: productTitle || post.title,
                    price: parseFloat(productPrice) || post.price,
                    image: productImage || post.image,
                    CategoryId: productCategory || post.category.id,
                    UserId: post.user.id
				}
            },
            refetchQueries:[{
                query: queries.GET_POSTS
            }]
        })
        navigation.goBack();
    }

    return (
        <Provider>
            <ProductForm/>
            <Button icon="account-circle" mode="contained" onPress={editProduct}>Save</Button>   
        </Provider>
    )
}

Screen.navigationOptions = {
    title: 'Edit Post / Product'
}

export default Screen;