import React from 'react'
import { View } from 'react-native';
import { Provider, Button } from 'react-native-paper';
import { useStateValue } from '../../hooks/state';
import ProductForm from '../../components/productForm';
import * as mutations from '../../apollo/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as queries from '../../apollo/queries';
import Style from '../../styles'

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
        dispatch({
            type: 'setState',
            state: 'productTitle',
            value: ''
        });
        dispatch({
            type: 'setState',
            state: 'productCategory',
            value: null
        });
        dispatch({
            type: 'setState',
            state: 'productTitle',
            value: ''
        })
        navigation.goBack();
    }

    return (
        <Provider>
          <View style={Style.main.container}>
            <ProductForm/>
            <Button icon="send" style={Style.main.button} mode="contained" onPress={createProduct}>Create</Button>
          </View>
        </Provider>
    )
}

export default Screen;
