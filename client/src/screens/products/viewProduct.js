import React from 'react';
import { Provider, Button } from 'react-native-paper';
import { Text, Image, View, ScrollView } from 'react-native';
import * as queries from '../../apollo/queries';
import { useStateValue } from '../../hooks/state';
import * as mutations from '../../apollo/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Style from '../../styles';

const Screen = ({ navigation }) => {
    const [{ id }, dispatch] = useStateValue();

    const { data } = useQuery(queries.GET_POST, {
  		variables: {
  			id: navigation.getParam('productId')
  		}
	  });

    const [deletePost, {data: mutationData}] = useMutation(mutations.DELETE_POST);

    const deleteProduct = async () => {
      await deletePost({
  			variables: {id: data.post.id},
        refetchQueries:[{query: queries.GET_POSTS}]
		  });
      navigation.goBack();
    }

    const setState = (state, value) => {
        return dispatch({
            type: 'setState',
            state,
            value
        })
    }

    const editPost = () => {
        setState("onEditProduct", true)
        navigation.navigate('editPost', { post: data.post})
    }

    return (
        <Provider>
            {data != undefined && (
              <View style={Style.main.detailContainer}>
                <ScrollView>
                  <View style={Style.main.rowSection}>
                    <Text style={Style.main.midTitle}>{data.post.title}</Text>
                    <Text style={Style.main.textSkin}>{data.post.category.name}</Text>
                    <Text style={Style.main.textRed}>${data.post.price}</Text>
                  </View>
                  <Image
                      style={{height: 200}}
                      source={{ uri: data.post.image }}
                  />
                  <View style={Style.main.rowSection}>
                    <Text style={Style.main.textSkin}>{data.post.user.firstname} {data.post.user.lastname}</Text>
                    <Text style={Style.main.textRed}>{data.post.user.city}</Text>
                  </View>
                  <View style={Style.main.section}>
                    <Button style={Style.main.button} icon="account-circle" mode="contained" onPress={() => navigation.navigate('sellerProfile', { sellerId: data.post.user.id })}>Seller Profile</Button>
                  </View>
                  {data.post.user.id === id && (
                    <View style={Style.main.section}>
                      <Button style={Style.main.button} icon="account-circle" mode="contained" onPress={editPost}>Edit</Button>
                      <Button style={Style.main.button} icon="account-circle" mode="contained" onPress={deleteProduct}>Delete</Button>
                    </View>
                  )}
              </ScrollView>
            </View>
            )}
        </Provider>
    )
}

export default Screen;
