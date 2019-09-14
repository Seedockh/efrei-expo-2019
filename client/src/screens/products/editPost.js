import React from 'react';
import { View, ScrollView } from 'react-native'
import { Provider, Button, ProgressBar } from 'react-native-paper';
import ProductForm from '../../components/productForm';
import * as queries from '../../apollo/queries';
import { useStateValue } from '../../hooks/state';
import * as mutations from '../../apollo/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Style from '../../styles';

const Screen = ({ navigation }) => {
    const [{ productTitle, productCategory, productPrice, productImage, id }, dispatch] = useStateValue();

    const [editPost, { loading, data: mutationData }] = useMutation(mutations.EDIT_POST);

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
          refetchQueries:[{ query: queries.GET_POSTS }]
        });

        setState("onEditProduct", false)
        setState("productTitle", "")
        setState("productCategory", 1)
        setState("productPrice", "1")
        setState("productImage", "")
        setState("productId", null)
        navigation.goBack();
    }

    return (
        <Provider>
          <View style={Style.main.container}>
          {loading &&
            <ProgressBar progress={0.5} color='white' />
          }
          {!loading &&
            <ScrollView style={{width: '100%'}}>
              <ProductForm post={post}/>
              <View style={Style.main.section}>
                <Button style={Style.main.button} icon="account-circle" mode="contained" onPress={editProduct}>Save</Button>
                <Button style={Style.main.button} icon="cancel" mode="contained" onPress={() => navigation.goBack()}>Cancel</Button>
              </View>
            </ScrollView>
          }
          </View>
        </Provider>
    )
}

Screen.navigationOptions = {
    headerLeft: null
}

export default Screen;
