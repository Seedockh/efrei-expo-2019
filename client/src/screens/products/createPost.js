import React from 'react';
import { Provider, Button } from 'react-native-paper';
import { useStateValue } from '../../hooks/state';
import ProductForm from '../../components/productForm';
import * as mutations from '../../apollo/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';

const Screen = ({ navigation }) => {
    const [{ productTitle, productCategory, productPrice, productImage, id }, dispatch] = useStateValue();

    const [createPost, {
		data: mutationData
    }] = useMutation(mutations.CREATE_POST);

    const createProduct = async () => {
        const result = await createPost({
			variables: {
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
        navigation.goBack();
    }

    return (
        <Provider>
            <ProductForm/>
            <Button icon="send" mode="contained" onPress={createProduct}>Create</Button>
        </Provider>
    )
}

export default Screen;
